export type MfeConfig = Record<string, {
  dir: string
  port: string
  name?: string
  prefix?: string
}>

declare const config: MfeConfig

export default config
