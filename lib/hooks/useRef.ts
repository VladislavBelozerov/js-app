import { App } from '../App.ts'
import { useReady } from './useReady.ts'
import { kebabCase } from 'lodash-es'
import { BehaviorSubject, take } from 'rxjs'
import type { JsAppComponent } from '../component'

export function useRef<R extends JsAppComponent<any, any, any>>(
  element: HTMLElement,
  name: string,
) {
  const ref$ = new BehaviorSubject<ReturnType<R> | null>(null)

  useReady(() => {
    setTimeout(() => {
      const id = element.getAttribute(`data-component-${kebabCase(name)}-id`)
      if (id) {
        const ref = App.components.get(id)?.ref

        if (ref?.__suspense) {
          ref.ready$.pipe(take(1)).subscribe({
            next: (resolvedRef: ReturnType<R>) => {
              ref$.next(resolvedRef)
            },
            error: (error: unknown) => {
              ref$.error(error)
            },
          })
        } else {
          ref$.next(ref as ReturnType<R>)
        }
      }
    })
  })

  return ref$
}
