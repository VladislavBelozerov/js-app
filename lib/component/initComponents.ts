import { uid } from '../utils/uid.ts'
import { App } from '../App.ts'
import type { RegistryRecord } from '../registry'
import { kebabCase } from 'lodash-es'

export type InitConditionCb = (record: RegistryRecord) => boolean

const globalInitCondition: { value: null | InitConditionCb } = {
  value: null,
}

export function setGlobalInitIgnore(cb: InitConditionCb) {
  globalInitCondition.value = cb
}

function initComponent(root: HTMLElement, record: RegistryRecord) {
  root.querySelectorAll(record.selector).forEach((element) => {
    if (element.hasAttribute(`data-component-${kebabCase(record.name)}-id`)) {
      return
    }

    if (globalInitCondition.value && !globalInitCondition.value(record)) {
      return
    }

    if (record.initCondition && !record.initCondition(record)) {
      return
    }

    const ref =
      record.component?.(element as HTMLElement, record.props ?? {}) ?? {}
    const id = uid(`component-${record.name}-`)

    element.setAttribute(`data-component`, '')
    element.setAttribute(`data-component-${kebabCase(record.name)}-id`, id)

    App.components.set(id, {
      id,
      selector: record.selector,
      name: record.name,
      ref,
    })
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
