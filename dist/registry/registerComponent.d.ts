import { JsAppComponent, JsAppComponentProps } from '../component';
import { RegistryRecord } from './index.ts';
export declare function registerComponent<Props = JsAppComponentProps>(name: string, selector: string, component: JsAppComponent<Props>, props?: Props): RegistryRecord<Props>;
export declare function registerAsyncComponent<Props = JsAppComponentProps>(name: string, selector: string, asyncComponent: () => Promise<JsAppComponent<Props>>, props?: Props): RegistryRecord<Props>;
