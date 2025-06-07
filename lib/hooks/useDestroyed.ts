import { App } from '../App.ts'

export function useDestroyed(cb: () => void) {
  const { unsubscribe } = App.destroyed$.subscribe(() => {
    cb()
  })

  return unsubscribe
}
