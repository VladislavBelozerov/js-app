import type { JsAppComponent } from './index.ts'
import { ReplaySubject } from 'rxjs'

export function SuspenseLogic(
  $element: HTMLElement,
  props: any,
  asyncComponent: () => Promise<JsAppComponent<any, any, any>>,
) {
  const ready$ = new ReplaySubject<any>(1)
  const controller = new AbortController()

  const destroy = () => {
    controller.abort()
    ready$.complete()
  }

  Promise.resolve()
    .then(() => {
      if (!controller.signal.aborted) {
        return asyncComponent()
      }
    })
    .then((Logic) => {
      if (!controller.signal.aborted && Logic) {
        const ref = Logic($element, props) ?? {}
        ready$.next(ref)
        destroy()
      }
    })
    .catch((error: unknown) => {
      if (!controller.signal.aborted) {
        ready$.error(error)
        destroy()
      }
    })

  return {
    __suspense: true,
    ready$,
    destroy,
  }
}
