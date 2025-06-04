import type { Registry } from './registry'
import type { Components } from './component'
import { useEmitter } from './hooks/useEmitter.ts'
import { initComponents } from './component/initComponents.ts'

function createApp() {
  const registry: Registry = new Map()
  const components: Components = new Map()
  const emitter = useEmitter<{ ready: undefined }>()
  const isReady = false

  return {
    ...emitter,
    registry,
    components,
    isReady,
  }
}

export const App = createApp()

export async function initApp(root: HTMLElement) {
  if (App.isReady) {
    console.warn('App is already initialized.')
    return
  }

  await initComponents(root)

  await App.emit('ready')
  App.isReady = true
}
