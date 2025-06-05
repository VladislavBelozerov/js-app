export type JsAppComponentRef = Record<string, any>;
export type JsAppComponentProps = Record<string, any>;
export type JsAppComponent<Props = JsAppComponentProps, Interface = JsAppComponentRef> = (element: HTMLElement, props: Props) => Interface;
export interface ComponentItem {
    id: string;
    selector: string;
    name: string;
    ref: JsAppComponentRef;
}
export type Components = Map<string, ComponentItem>;
