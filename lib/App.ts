import type { Registry } from './registry'
import type { Components } from './component'
import { initComponents } from './component/initComponents.ts'
import { BehaviorSubject, Subject } from 'rxjs'
import { destroyComponents } from './component/destroyComponents.ts'

function createApp() {
  const registry: Registry = new Map()
  const components: Components = new Map()

  const isReady$ = new BehaviorSubject<boolean>(false)
  const root$ = new BehaviorSubject<HTMLElement | null>(null)

  const updated$ = new Subject<void>()
  const beforeUpdate$ = new Subject<void>()
  const beforeDestroy$ = new Subject<void>()
  const destroyed$ = new Subject<void>()

  return {
    registry,
    components,
    isReady$,
    root$,
    updated$,
    beforeUpdate$,
    beforeDestroy$,
    destroyed$,
  }
}

export const App = createApp()

export function initApp(root: HTMLElement) {
  App.root$.next(root)

  if (App.isReady$.getValue()) {
    console.warn('App is already initialized.')
    return
  }

  initComponents(root)

  App.isReady$.next(true)
}

export function destroyApp() {
  if (!App.isReady$.getValue() || !App.root$.getValue()) {
    console.warn('App is not loaded yet.')
    return
  }

  App.beforeDestroy$.next()

  destroyComponents(App.root$.getValue() as HTMLElement)

  App.components.clear()
  App.registry.clear()

  App.isReady$.next(false)
  App.root$.next(null)
  App.destroyed$.next()
}

export function updateApp() {
  if (!App.isReady$.getValue() || !App.root$.getValue()) {
    console.warn('App is not loaded yet.')
    return
  }

  App.beforeUpdate$.next()
  initComponents(App.root$.getValue() as HTMLElement)
  App.updated$.next()
}
