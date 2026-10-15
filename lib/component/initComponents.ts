import { uid } from '../utils/uid.ts'
import { App } from '../App.ts'
import type { RegistryRecord } from '../registry'
import { kebabCase } from 'lodash-es'
import { SuspenseLogic } from './suspense-logic.ts'
import { take } from 'rxjs'

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

  return id
}

function initComponent(
  root: HTMLElement,
  record: RegistryRecord,
  includeRoot: boolean,
) {
  const elements = Array.from(
    root.querySelectorAll<HTMLElement>(record.selector),
  )

  if (includeRoot && root.matches(record.selector)) {
    elements.unshift(root)
  }

  elements.forEach((element) => {
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

    if ('component' in record) {
      const ref = record.component(element, record.props ?? {}) ?? {}
      addComponentRecord(element, record.name, ref, record.selector)
      return
    }

    const suspense = SuspenseLogic(
      element,
      record.props ?? {},
      record.asyncComponent,
    )
    const id = addComponentRecord(
      element,
      record.name,
      suspense,
      record.selector,
    )

    suspense.ready$.pipe(take(1)).subscribe({
      next: (ref) => {
        const component = App.components.get(id)
        if (component?.ref === suspense) {
          component.ref = ref
        }
      },
      error: (error: unknown) => {
        console.error(`Failed to initialize component "${record.name}".`, error)
      },
    })
  })
}

export function initComponents(
  root: HTMLElement,
  options: { includeRoot?: boolean } = {},
) {
  const includeRoot = options.includeRoot ?? false

  const itemsToBeInitialized = Array.from(App.registry.values()).filter(
    ({ selector }) =>
      !!root.querySelector(selector) || (includeRoot && root.matches(selector)),
  )

  for (const record of itemsToBeInitialized) {
    initComponent(root, record, includeRoot)
  }
}
