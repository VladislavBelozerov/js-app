import { JsAppComponent, JsAppComponentProps } from '../component';
import { RegistryRecord } from './index.ts';
type PropsOf<C> = C extends (element: HTMLElement, props: infer P) => any ? unknown extends P ? JsAppComponentProps : P : JsAppComponentProps;
export declare function registerComponent<C extends JsAppComponent>(name: string, selector: string, component: C, props?: PropsOf<C>): RegistryRecord<PropsOf<C>>;
export {};
