import type { Plugin } from 'vite'

export interface FederationConfig {
  name: string
  dir?: string
  extendExposes?: Record<string, string>
  remotes?: Record<string, string>
}

export function reloadEndpoint(): Plugin
export function reloadShell(): Plugin
export function remoteFederation(config: FederationConfig): Plugin
