import type { JsAppComponent, JsAppComponentProps } from '../component'
import type { RegistryRecord } from './index.ts'

type PropsOf<C> = C extends (element: HTMLElement, props: infer P) => any
  ? unknown extends P
    ? JsAppComponentProps
    : P
  : JsAppComponentProps

export function registerComponent<C extends JsAppComponent>(
  name: string,
  selector: string,
  component: C,
  props?: PropsOf<C>,
): RegistryRecord<PropsOf<C>> {
  return {
    component: component as unknown as JsAppComponent<PropsOf<C>>,
    props: (props ?? {}) as PropsOf<C>,
    selector,
    name,
  }
}
