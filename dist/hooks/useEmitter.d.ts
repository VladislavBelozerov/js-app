import { Options } from 'emittery';
export declare function useEmitter<Events>(options?: Options<Events>): {
    on: <Name extends keyof Events | keyof import('emittery').OmnipresentEventData>(eventName: Name | readonly Name[], listener: (eventData: (Events & import('emittery').OmnipresentEventData)[Name]) => void | Promise<void>, options?: {
        signal?: AbortSignal;
    }) => import('emittery').UnsubscribeFunction;
    off: <Name extends keyof Events | keyof import('emittery').OmnipresentEventData>(eventName: Name | readonly Name[], listener: (eventData: (Events & import('emittery').OmnipresentEventData)[Name]) => void | Promise<void>) => void;
    emit: {
        <Name extends import('emittery').DatalessEventNames<Events>>(eventName: Name): Promise<void>;
        <Name extends keyof Events>(eventName: Name, eventData: Events[Name]): Promise<void>;
    };
    once: <Name extends keyof Events | keyof import('emittery').OmnipresentEventData>(eventName: Name | readonly Name[]) => import('emittery').EmitteryOncePromise<(Events & import('emittery').OmnipresentEventData)[Name]>;
    events: <Name extends keyof Events>(eventName: Name | readonly Name[]) => AsyncIterableIterator<Events[Name]>;
    emitSerial: {
        <Name extends import('emittery').DatalessEventNames<Events>>(eventName: Name): Promise<void>;
        <Name extends keyof Events>(eventName: Name, eventData: Events[Name]): Promise<void>;
    };
    onAny: (listener: (eventName: keyof Events, eventData: Events[keyof Events]) => void | Promise<void>, options?: {
        signal?: AbortSignal;
    }) => import('emittery').UnsubscribeFunction;
    offAny: (listener: (eventName: keyof Events, eventData: Events[keyof Events]) => void | Promise<void>) => void;
    anyEvent: () => AsyncIterableIterator<[keyof Events, Events[keyof Events]]>;
    clearListeners: <Name extends keyof Events>(eventName?: Name | readonly Name[] | undefined) => void;
    listenerCount: <Name extends keyof Events>(eventName?: Name | readonly Name[] | undefined) => number;
    bindMethods: (target: Record<string, unknown>, methodNames?: readonly string[]) => void;
};
