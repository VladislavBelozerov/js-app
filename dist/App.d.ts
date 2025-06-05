import { Registry } from './registry';
import { Components } from './component';
export declare const App: {
    registry: Registry;
    components: Components;
    isReady: boolean;
    on: <Name extends keyof import('emittery').OmnipresentEventData | "ready">(eventName: Name | readonly Name[], listener: (eventData: ({
        ready: undefined;
    } & import('emittery').OmnipresentEventData)[Name]) => void | Promise<void>, options?: {
        signal?: AbortSignal;
    }) => import('emittery').UnsubscribeFunction;
    off: <Name extends keyof import('emittery').OmnipresentEventData | "ready">(eventName: Name | readonly Name[], listener: (eventData: ({
        ready: undefined;
    } & import('emittery').OmnipresentEventData)[Name]) => void | Promise<void>) => void;
    emit: {
        <Name extends "ready">(eventName: Name): Promise<void>;
        <Name extends "ready">(eventName: Name, eventData: {
            ready: undefined;
        }[Name]): Promise<void>;
    };
    once: <Name extends keyof import('emittery').OmnipresentEventData | "ready">(eventName: Name | readonly Name[]) => import('emittery').EmitteryOncePromise<({
        ready: undefined;
    } & import('emittery').OmnipresentEventData)[Name]>;
    events: <Name extends "ready">(eventName: Name | readonly Name[]) => AsyncIterableIterator<{
        ready: undefined;
    }[Name]>;
    emitSerial: {
        <Name extends "ready">(eventName: Name): Promise<void>;
        <Name extends "ready">(eventName: Name, eventData: {
            ready: undefined;
        }[Name]): Promise<void>;
    };
    onAny: (listener: (eventName: "ready", eventData: undefined) => void | Promise<void>, options?: {
        signal?: AbortSignal;
    }) => import('emittery').UnsubscribeFunction;
    offAny: (listener: (eventName: "ready", eventData: undefined) => void | Promise<void>) => void;
    anyEvent: () => AsyncIterableIterator<["ready", undefined]>;
    clearListeners: <Name extends "ready">(eventName?: Name | readonly Name[] | undefined) => void;
    listenerCount: <Name extends "ready">(eventName?: Name | readonly Name[] | undefined) => number;
    bindMethods: (target: Record<string, unknown>, methodNames?: readonly string[]) => void;
};
export declare function initApp(root: HTMLElement): Promise<void>;
