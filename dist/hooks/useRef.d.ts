import { JsAppComponentRef } from '../component';
import { BehaviorSubject } from 'rxjs';
export declare function useRef<Ref = JsAppComponentRef>(element: HTMLElement, name: string): BehaviorSubject<Ref | null>;
