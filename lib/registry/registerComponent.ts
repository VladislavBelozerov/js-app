import type { JsAppComponent, JsAppComponentProps } from '../component'
import type { RegistryRecord } from './index.ts'

export function registerComponent<Props = JsAppComponentProps>(
  name: string,
  selector: string,
  component: JsAppComponent<Props>,
  props?: Props,
): RegistryRecord<Props> {
  return {
    component,
    props: (props ?? {}) as Props,
    selector,
    name,
  }
}
