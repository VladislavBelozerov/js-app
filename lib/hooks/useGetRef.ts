import type { JsAppComponentRef } from '../component'
import { App } from '../App.ts'
import { useReady } from './useReady.ts'

export type RefCurrent<R> = { current: R | null }

export function useGetRef<Ref = JsAppComponentRef>(
  element: HTMLElement,
  name: string,
): RefCurrent<Ref> {
  const res: RefCurrent<Ref> = { current: null }

  useReady(() => {
    const hasRef = element.dataset.componentName === name
    if (!hasRef) return null

    const id = element.dataset.componentId as string

    res.current = (App.components.get(id)?.ref as Ref) ?? null
  })

  return res
}
