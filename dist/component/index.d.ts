export type JsAppComponentRef = any;
export type JsAppComponentProps = any;
export type JsAppComponent<Props = JsAppComponentProps, Interface = JsAppComponentRef, El extends HTMLElement = HTMLElement> = (element: El, props: Props) => Interface;
export interface ComponentItem {
    id: string;
    selector: string;
    name: string;
    ref: JsAppComponentRef;
}
export type Components = Map<string, ComponentItem>;
