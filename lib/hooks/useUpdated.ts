import { App } from '../App.ts'

export function useUpdated(cb: () => void) {
  const { unsubscribe } = App.updated$.subscribe(() => {
    cb()
  })

  return unsubscribe
}
