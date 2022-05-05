import { NodeBuiltinModules, mapArrToVal } from '../utils'
import type { Preset } from '../types'

const nodeless: Preset = {
  alias: {
    // Generic mock for built-ins
    ...mapArrToVal('unenv/runtime/mock/proxy-cjs', NodeBuiltinModules),

    // Built-ins implemented by unenv
    ...Object.fromEntries([
      'buffer',
      'events',
      'http',
      'net',
      'path',
      'process',
      'stream',
      'url',
      'util'
    ].map(m => [m, `unenv/runtime/node/${m}/index`])),

    // npm
    etag: 'unenv/runtime/mock/noop',
    'mime-db': 'unenv/runtime/npm/mime-db',
    mime: 'unenv/runtime/npm/mime',
    'mime/lite': 'unenv/runtime/npm/mime',
    _mime: 'mime/lite.js',
    fsevents: 'unenv/runtime/npm/fsevents',
    'node-fetch': 'unenv/runtime/npm/node-fetch',
    'cross-fetch': 'unenv/runtime/npm/cross-fetch',
    'cross-fetch/polyfill': 'unenv/runtime/mock/empty',
    'isomorphic-fetch': 'unenv/runtime/mock/empty',
    inherits: 'unenv/runtime/npm/inherits'
  },

  inject: {
    process: 'unenv/runtime/polyfill/process',
    Buffer: ['buffer', 'Buffer']
  },

  polyfill: [
    'unenv/runtime/polyfill/process'
  ]
}

// Add node: aliases
for (const m of NodeBuiltinModules) {
  nodeless.alias![`node:${m}`] = nodeless.alias![m]
}

export default nodeless
