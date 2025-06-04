import type { JsAppComponent, JsAppComponentProps } from '../component'

export interface RegistryRecord<Props = JsAppComponentProps> {
  component?: JsAppComponent<Props>
  props: Props
  selector: string
  asyncComponent?: () => Promise<JsAppComponent<Props>>
  name: string
}

export type Registry = Map<string, RegistryRecord>
