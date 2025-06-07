import { JsAppComponent, JsAppComponentProps } from '../component';
import { InitConditionCb } from '../component/initComponents.ts';
export interface RegistryRecord<Props = JsAppComponentProps> {
    component: JsAppComponent<Props>;
    props: Props;
    selector: string;
    initCondition?: InitConditionCb;
    name: string;
}
export type Registry = Map<string, RegistryRecord>;
