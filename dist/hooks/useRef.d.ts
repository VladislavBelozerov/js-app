import { BehaviorSubject } from 'rxjs';
import { JsAppComponent } from '../component';
export declare function useRef<R extends JsAppComponent<any, any, any>>(element: HTMLElement, name: string): BehaviorSubject<ReturnType<R> | null>;
