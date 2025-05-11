import Emittery, { Options } from "emittery";

/**
 * A utility to create a typed event emitter based on Emittery
 *
 * This hook creates a new Emittery instance and returns all its methods,
 * enabling type-safe event emission and subscription throughout the application.
 *
 * @template T - The event data type map where keys are event names and values are event data types
 * @param options - Configuration options for the Emittery instance
 * @returns An object containing all Emittery methods
 *
 * @example
 * // Define your event types
 * type MyEvents = {
 *   started: { timestamp: number };
 *   completed: { result: string };
 * };
 *
 * // Create a typed emitter
 * const events = useEmitter<MyEvents>();
 *
 * // Subscribe to events with proper typing
 * events.on('started', ({ timestamp }) => console.log(`Started at ${timestamp}`));
 *
 * // Emit events with type checking
 * events.emit('started', { timestamp: Date.now() });
 */
const useEmitter = <T = {}>(options?: Options<T>) => {
  const emitter = new Emittery<T>(options);
  return {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
    once: emitter.once,
    events: emitter.events,
    emitSerial: emitter.emitSerial,
    onAny: emitter.onAny,
    offAny: emitter.offAny,
    anyEvent: emitter.anyEvent,
    clearListeners: emitter.clearListeners,
    listenerCount: emitter.listenerCount,
    bindMethods: emitter.bindMethods,
  };
};

export { useEmitter };
