// @ts-check

/**
 * @typedef {import('./index').MfeConfig} MfeConfig
 * @type {MfeConfig}
 */
export default {
  shell: {
    dir: 'shell',
    port: '8000',
  },
  home: {
    dir: 'home',
    port: '8001',
    name: 'home_app',
    prefix: '/',
  },
  lotto: {
    dir: 'lotto',
    port: '8002',
    name: 'lotto_app',
    prefix: '/lotto6aus49',
  },
}
