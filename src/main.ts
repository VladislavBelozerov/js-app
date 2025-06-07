import {
  initApp,
  registerComponent,
  addToRegistry,
  useReady,
  destroyApp,
} from '../lib/main.ts'
import { Root, type RootProps } from './components/Root.ts'
import { Button, type ButtonProps } from './components/Button.ts'
import { updateApp } from '../lib/App.ts'

document.addEventListener('DOMContentLoaded', async () => {
  addToRegistry([
    registerComponent<RootProps>('root', '#app', Root),
    registerComponent<ButtonProps>('button', 'button', Button),
    registerComponent<RootProps>('RootTwo', '#app', Root),
  ])

  initApp(document.documentElement)

  useReady(() => {
    setTimeout(() => {
      destroyApp()

      addToRegistry([
        registerComponent<RootProps>('root', '#app', Root),
        registerComponent<ButtonProps>('button', 'button', Button),
        registerComponent<RootProps>('RootTwo', '#app', Root),
      ])

      initApp(document.documentElement)

      setTimeout(() => {
        updateApp()
      }, 1000)
    }, 1000)
  })
})
