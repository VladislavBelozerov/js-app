import { uid } from '../utils/uid.ts'
import { App } from '../App.ts'

export async function initComponents(root: HTMLElement) {
  const itemsToBeInitialized = Array.from(App.registry.values()).filter(
    ({ selector }) => !!root.querySelector(selector),
  )
  const itemsToBeLoaded = itemsToBeInitialized.filter(
    ({ asyncComponent, component }) => !component && !!asyncComponent,
  )

  await Promise.all(
    itemsToBeLoaded.map((c) =>
      c.asyncComponent?.().then((component) => {
        c.component = component
      }),
    ),
  )

  for (const item of itemsToBeInitialized) {
    root.querySelectorAll(item.selector).forEach((element) => {
      if (element.hasAttribute(`[data-component-name="${item.name}"]`)) {
        return
      }

      const ref =
        item.component?.(element as HTMLElement, item.props ?? {}) ?? {}
      const id = uid(`component-${item.name}-`)

      element.setAttribute(`data-component-id`, id)
      element.setAttribute(`data-component-name`, item.name)

      App.components.set(id, {
        id,
        selector: item.selector,
        name: item.name,
        ref,
      })
    })
  }
}
