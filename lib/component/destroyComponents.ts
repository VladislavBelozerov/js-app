import { App } from '../App.ts'

export function destroyComponents(root: HTMLElement) {
  if (!App.isReady) {
    console.warn('App is not initialized yet.')
    return
  }

  const elementsToDestroy: HTMLElement[] = Array.from(
    root.querySelectorAll('[data-component-id]'),
  )

  if (root.hasAttribute('data-component-id')) {
    elementsToDestroy.push(root)
  }

  for (const element of elementsToDestroy) {
    const componentId = element.dataset.componentId as string
    const componentItem = App.components.get(componentId)

    if (componentItem) {
      componentItem.ref.destroy?.()
      App.components.delete(componentId)
    }

    element.removeAttribute('data-component-id')
    element.removeAttribute('data-component-name')
  }
}
