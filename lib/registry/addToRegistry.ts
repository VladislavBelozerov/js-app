import type { RegistryRecord } from './index.ts'
import { App } from '../App.ts'

export function addToRegistry(data: RegistryRecord | RegistryRecord[]) {
  if (Object.isFrozen(App.registry)) {
    console.warn('Cannot add to read-only registry.')

    return
  }

  const _data = Array.isArray(data) ? data : [data]

  _data.forEach((record) => {
    App.registry.set(record.name + ':' + record.selector, record)
  })
}
