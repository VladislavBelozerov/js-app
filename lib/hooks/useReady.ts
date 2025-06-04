import { App } from '../App.ts'

export function useReady(cb: () => void) {
  if (App.isReady) {
    cb()
    return
  }
  App.once('ready').then(() => {
    cb()
  })
}
