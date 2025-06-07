import type { JsAppComponentRef } from '../component'
import { App } from '../App.ts'
import { useReady } from './useReady.ts'
import { kebabCase } from 'lodash-es'
import { BehaviorSubject } from 'rxjs'

export function useRef<Ref = JsAppComponentRef>(
  element: HTMLElement,
  name: string,
) {
  const ref$ = new BehaviorSubject<Ref | null>(null)

  useReady(() => {
    setTimeout(() => {
      const id = element.getAttribute(`data-component-${kebabCase(name)}-id`)
      if (id) {
        ref$.next(App.components.get(id)?.ref as Ref)
      }
    })
  })

  return ref$
}
