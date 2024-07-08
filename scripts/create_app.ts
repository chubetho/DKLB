import process from 'node:process'
import { cancel, confirm, group, intro, outro, spinner, text } from '@clack/prompts'
import { $, Glob, file, write } from 'bun'

const { default: mfeConfig } = await import('../tools/mfe-config/index.js')

type MfeConfig = typeof mfeConfig[keyof typeof mfeConfig]

const { dirs, ports, prefixes } = Object.values(mfeConfig).reduce((acc, cur) => {
  acc.dirs.push(cur.dir)
  acc.ports.push(cur.port)
  if (cur.prefix)
    acc.prefixes.push(cur.prefix)
  return acc
}, { dirs: [] as string[], ports: [] as string[], prefixes: [] as string[] })

const nextPort = `${Number.parseInt(ports.at(-1) ?? '8000') + 1}`

intro(`Create a new micro-frontend app.`)

const s = spinner()

const { dir, prefix } = await group({
  dir: () => text({
    message: 'Enter folder name:',
    placeholder: 'home',
    validate(value) {
      if (value.length === 0)
        return `Value is required!`

      if (dirs.includes(value))
        return `Folder already exists!`
    },
  }),

  prefix: () => text({
    message: 'Enter prefix:',
    placeholder: '/',
    validate(value) {
      if (value.length === 0)
        return `Value is required!`

      if (prefixes.includes(value))
        return `Prefix already exists!`
    },
  }),
}, {
  onCancel() {
    cancel('Operation cancelled.')
    process.exit(0)
  },
})

s.start()

/**
 * Write to mfe-config
 */
;(mfeConfig as Record<string, MfeConfig>)[dir] = {
  dir,
  name: `${dir}_app`,
  port: nextPort,
  prefix,
}

await write(
  'tools/mfe-config/index.js',
   `// @ts-check

/**
 * @typedef {import('./index').MfeConfig} MfeConfig
 * @type {MfeConfig}
 */
export default ${JSON.stringify(mfeConfig, null, 2)}`,
)
await $`bunx eslint --fix tools/mfe-config/index.js`
await $`bun run prepare:docker`

/**
 * Scalfold app
 */
const glob = new Glob('**/*')
const cwd = '.template/app/'
const arr: { path: string, content: string }[] = []

for (const path of glob.scanSync({ cwd, dot: true })) {
  const text = await file(`${cwd}${path}`).text()
  const content = text.replace(/\$dir\$/g, dir)

  arr.push({
    path: `apps/${dir}/${path}`,
    content,
  })
}

for (const { path, content } of arr)
  await write(path, content)

/**
 * Workflow
 */
const workflow = await file('.template/workflow/ci.yml').text()
const workflowContent = workflow.replace(/\$dir\$/g, dir)
await write(`.github/workflows/${dir}.yml`, workflowContent)

s.stop()

/**
 * Others
 */
const { shouldBuild, shouldInstall } = await group({
  shouldInstall: () => confirm({ message: 'Install dependencies?', initialValue: true }),
  shouldBuild: () => confirm({ message: 'Build?', initialValue: true }),
}, {
  onCancel() {
    cancel('Operation cancelled.')
    process.exit(0)
  },
})

if (shouldInstall) {
  s.start('Installing dependencies...')
  await $`bun install`
  s.stop()
}

if (shouldBuild) {
  s.start('Building...')
  await $`cd apps/${dir} && bun run build`
  s.stop()
}

outro('Done.')
