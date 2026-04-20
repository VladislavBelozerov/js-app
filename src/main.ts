import {
  initApp,
  registerComponent,
  addToRegistry,
  useReady,
  destroyApp,
} from '../lib/main.ts'
import { Root } from './components/Root.ts'
import { Button } from './components/Button.ts'
import { updateApp } from '../lib/App.ts'

document.addEventListener('DOMContentLoaded', async () => {
  addToRegistry([
    registerComponent('root', '#app', Root),
    registerComponent('button', 'button', Button),
    registerComponent('RootTwo', '#app', Root),
  ])

  initApp(document.documentElement)

  useReady(() => {
    setTimeout(() => {
      destroyApp()

      addToRegistry([
        registerComponent('root', '#app', Root),
        registerComponent('button', 'button', Button),
        registerComponent('RootTwo', '#app', Root),
      ])

      initApp(document.documentElement)

      setTimeout(() => {
        updateApp()
      }, 1000)
    }, 1000)
  })
})
