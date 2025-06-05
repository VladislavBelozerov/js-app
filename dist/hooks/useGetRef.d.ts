import { JsAppComponentRef } from '../component';
export type RefCurrent<R> = {
    current: R | null;
};
export declare function useGetRef<Ref = JsAppComponentRef>(element: HTMLElement, name: string): RefCurrent<Ref>;
