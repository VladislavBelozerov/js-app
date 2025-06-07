import { App } from '../App.ts'

export function useBeforeUpdate(cb: () => void) {
  const { unsubscribe } = App.beforeUpdate$.subscribe(() => {
    cb()
  })

  return unsubscribe
}
