import { App } from '../App.ts'
import { useReady } from './useReady.ts'
import { kebabCase } from 'lodash-es'
import { BehaviorSubject } from 'rxjs'
import type {JsAppComponent} from "../component";

export function useRef<R extends JsAppComponent>(
  element: HTMLElement,
  name: string,
) {
  const ref$ = new BehaviorSubject<ReturnType<R> | null>(null)

  useReady(() => {
    setTimeout(() => {
      const id = element.getAttribute(`data-component-${kebabCase(name)}-id`)
      if (id) {
        ref$.next(App.components.get(id)?.ref as ReturnType<R>)
      }
    })
  })

  return ref$
}
