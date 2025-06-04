import Emittery, { type Options } from 'emittery'

export function useEmitter<Events>(options?: Options<Events>) {
  const emitter = new Emittery<Events>(options)

  return {
    on: emitter.on.bind(emitter),
    off: emitter.off.bind(emitter),
    emit: emitter.emit.bind(emitter),
    once: emitter.once.bind(emitter),
    events: emitter.events.bind(emitter),
    emitSerial: emitter.emitSerial.bind(emitter),
    onAny: emitter.onAny.bind(emitter),
    offAny: emitter.offAny.bind(emitter),
    anyEvent: emitter.anyEvent.bind(emitter),
    clearListeners: emitter.clearListeners.bind(emitter),
    listenerCount: emitter.listenerCount.bind(emitter),
    bindMethods: emitter.bindMethods.bind(emitter),
  }
}
