import { App } from '../App.ts'

export function destroyComponents(root: HTMLElement) {
  if (!App.isReady$.getValue()) {
    console.warn('App is not initialized yet.')
    return
  }

  const elementsToDestroy: HTMLElement[] = Array.from(
    root.querySelectorAll('[data-component]'),
  )

  for (const element of elementsToDestroy) {
    const componentIds: string[] = []
    const dataAttributes = Object.keys(element.dataset)

    dataAttributes.forEach((attr) => {
      const match = attr.match(/^component(.+)Id$/)
      if (match) {
        const componentId = element.dataset[attr]
        if (componentId) {
          componentIds.push(componentId)
        }
      }
    })

    componentIds.forEach((componentId) => {
      const componentItem = App.components.get(componentId)
      if (componentItem) {
        componentItem.ref.destroy?.()
        App.components.delete(componentId)
      }
    })

    dataAttributes.forEach((attr) => {
      if (attr.startsWith('component') && attr.endsWith('Id')) {
        delete element.dataset[attr]
      }
    })

    element.removeAttribute('data-component')
  }
}
