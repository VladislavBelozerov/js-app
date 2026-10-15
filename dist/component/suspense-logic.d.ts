import { JsAppComponent } from './index.ts';
import { ReplaySubject } from 'rxjs';
export declare function SuspenseLogic($element: HTMLElement, props: any, asyncComponent: () => Promise<JsAppComponent<any, any, any>>): {
    __suspense: boolean;
    ready$: ReplaySubject<any>;
    destroy: () => void;
};
