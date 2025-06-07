import { App } from '../App.ts'

export function useBeforeDestroy(cb: () => void) {
  const { unsubscribe } = App.beforeDestroy$.subscribe(() => {
    cb()
  })

  return unsubscribe
}
