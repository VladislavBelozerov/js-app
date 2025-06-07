import { Registry } from './registry';
import { Components } from './component';
import { BehaviorSubject, Subject } from 'rxjs';
export declare const App: {
    registry: Registry;
    components: Components;
    isReady$: BehaviorSubject<boolean>;
    root$: BehaviorSubject<HTMLElement | null>;
    updated$: Subject<void>;
    beforeUpdate$: Subject<void>;
    beforeDestroy$: Subject<void>;
    destroyed$: Subject<void>;
};
export declare function initApp(root: HTMLElement): void;
export declare function destroyApp(): void;
export declare function updateApp(): void;
