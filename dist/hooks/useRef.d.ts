import { BehaviorSubject } from 'rxjs';
import { JsAppComponent } from '../component';
export declare function useRef<R extends JsAppComponent>(element: HTMLElement, name: string): BehaviorSubject<ReturnType<R> | null>;
