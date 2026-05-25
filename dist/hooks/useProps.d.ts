import { JsAppComponentProps } from '../component';
export declare function useProps<Props = JsAppComponentProps, El extends HTMLElement = HTMLElement>(element: El, name: string, defaultProps?: Partial<Props>): Props;
