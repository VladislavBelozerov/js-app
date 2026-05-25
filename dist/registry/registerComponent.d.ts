import { JsAppComponent, JsAppComponentProps } from '../component';
import { RegistryRecord } from './index.ts';
type PropsOf<C> = C extends (element: infer _El, props: infer P) => any ? unknown extends P ? JsAppComponentProps : P : JsAppComponentProps;
export declare function registerComponent<C extends JsAppComponent<any, any, any>>(name: string, selector: string, component: C, props?: PropsOf<C>): RegistryRecord<PropsOf<C>>;
export {};
