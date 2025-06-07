import { App } from '../App.ts'
import { first } from 'rxjs/operators'

export function useReady(cb: () => void) {
  if (App.isReady$.getValue()) {
    cb()
    return
  }
  App.isReady$.pipe(first((isReady) => isReady)).subscribe(() => {
    cb()
  })
}
