import {
  initApp,
  registerAsyncComponent,
  registerComponent,
  addToRegistry,
  destroyComponents,
} from '../lib/main.ts'
import { Root, type RootProps } from './components/Root.ts'
import { Button, type ButtonProps } from './components/Button.ts'

document.addEventListener('DOMContentLoaded', async () => {
  addToRegistry([
    registerComponent<RootProps>('root', '#app', Root),
    registerAsyncComponent<RootProps>('root-async', '#app', () =>
      import('./components/Root.ts').then(({ Root }) => Root),
    ),
    registerComponent<ButtonProps>('button', 'button', Button),
  ])

  await initApp(document.documentElement)

  setTimeout(() => {
    destroyComponents(document.querySelector('#app') as HTMLElement)
  })
})
