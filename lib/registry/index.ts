import type { JsAppComponent, JsAppComponentProps } from '../component'
import type { InitConditionCb } from '../component/initComponents.ts'

export type RegistryRecord<Props = JsAppComponentProps> = {
  props: Props
  selector: string
  initCondition?: InitConditionCb
  name: string
} & (
  | { component: JsAppComponent<Props> }
  | { asyncComponent: () => Promise<JsAppComponent<Props>> }
)

export type Registry = Map<string, RegistryRecord>
