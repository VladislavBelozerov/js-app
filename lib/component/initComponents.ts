import { uid } from '../utils/uid.ts'
import { App } from '../App.ts'
import type { RegistryRecord } from '../registry'
import { kebabCase } from 'lodash-es'

export type InitConditionCb = (
  element: HTMLElement,
  record: RegistryRecord,
) => boolean

const globalInitCondition: { value: null | InitConditionCb } = {
  value: null,
}

export function setGlobalInitCondition(cb: InitConditionCb) {
  globalInitCondition.value = cb
}

export function addComponentRecord<T extends HTMLElement>(
  element: T,
  name: string,
  ref: any,
  selector?: string,
) {
  const id = uid(`component-${name}-`)
  element.setAttribute(`data-component`, '')
  element.setAttribute(`data-component-${kebabCase(name)}-id`, id)

  App.components.set(id, {
    id,
    selector: selector ?? '',
    name: name,
    ref,
  })
}

function initComponent(root: HTMLElement, record: RegistryRecord) {
  root.querySelectorAll<HTMLElement>(record.selector).forEach((element) => {
    if (element.hasAttribute(`data-component-${kebabCase(record.name)}-id`)) {
      return
    }

    if (
      globalInitCondition.value &&
      !globalInitCondition.value(element, record)
    ) {
      return
    }

    if (record.initCondition && !record.initCondition(element, record)) {
      return
    }

    const ref = record.component?.(element, record.props ?? {}) ?? {}

    addComponentRecord(element, record.name, ref, record.selector)
  })
}

export function initComponents(root: HTMLElement) {
  const itemsToBeInitialized = Array.from(App.registry.values()).filter(
    ({ selector }) => !!root.querySelector(selector),
  )

  for (const record of itemsToBeInitialized) {
    initComponent(root, record)
  }
}
