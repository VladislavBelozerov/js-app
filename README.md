# @vladislavbelozerov/js-app

A lightweight, modular runtime for initializing and managing DOM-based components.

The idea is simple:

- You **register** components by `name` + `selector`.
- At runtime, the app scans the DOM, **initializes** matching elements and stores component instances (refs).
- You can **update** (re-scan) or **destroy** (cleanup) the entire app.

This package is framework-agnostic and is intended for projects where you want a small “component runtime” without React/Vue/etc.

## Requirements

- **RxJS is required** (the library uses RxJS subjects/observables internally and in hooks).
  - `rxjs` is declared as a **peer dependency**, so you must install it in your app.

```bash
npm i rxjs
```

## Installation

```bash
npm i @vladislavbelozerov/js-app rxjs
```

## Quick start

### 1) Create a component

A component is just a function.

- Signature: `(element, props) => ref`
- `element`: the DOM element the component is mounted on
- `props`: plain object with component props
- `ref`: any object you want to expose as the component instance (optional)

```ts
// MyCounter.ts
export type MyCounterProps = {
  start?: number
}

export function MyCounter(element: HTMLElement, { start = 0 }: MyCounterProps) {
  let value = start

  element.textContent = String(value)

  const onClick = () => {
    value += 1
    element.textContent = String(value)
  }

  element.addEventListener('click', onClick)

  return {
    get value() {
      return value
    },
    destroy() {
      element.removeEventListener('click', onClick)
    },
  }
}
```

Notes:

- The `destroy()` method is optional, but recommended if you attach listeners/timers/subscriptions.
- Components **may omit props**:

```ts
export function Root(element: HTMLElement) {
  // ...
  return { /* ... */ }
}
```

### 2) Register components

Use `registerComponent()` to create registry records, then add them using `addToRegistry()`.

```ts
import { addToRegistry, registerComponent } from '@vladislavbelozerov/js-app'
import { MyCounter } from './MyCounter'

addToRegistry([
  registerComponent('my-counter', '[data-my-counter]', MyCounter, { start: 10 }),
])
```

### 3) Initialize runtime

```ts
import { initApp } from '@vladislavbelozerov/js-app'

initApp(document.documentElement)
```

## Runtime control

### `initApp(root)`

- Sets the root element for the runtime.
- Scans DOM and initializes components for all matching selectors.

```ts
initApp(document.documentElement)
```

### `updateApp()`

Re-scans the current root and initializes **new** elements that match registered selectors.

```ts
import { updateApp } from '@vladislavbelozerov/js-app'

updateApp()
```

### `destroyApp()`

Destroys all initialized components and clears internal state:

- Emits lifecycle events
- Calls component destroy logic (if present in the returned ref)
- Clears components and registry

```ts
import { destroyApp } from '@vladislavbelozerov/js-app'

destroyApp()
```

## Low-level component APIs

In addition to the app-level helpers, the library exposes lower-level functions from the component runtime.

### `initComponents(root)`

Scans the given `root` and initializes matching components based on the current registry.

`root` can be **any DOM subtree/container** (not only the app root). For example, you can initialize only inside a modal, a sidebar, or a newly injected HTML fragment.

This is what `initApp()` / `updateApp()` use internally, but you can call it directly if you want full control.

```ts
import { initComponents } from '@vladislavbelozerov/js-app'

initComponents(document.documentElement)
```

```ts
import { initComponents } from '@vladislavbelozerov/js-app'

const modal = document.querySelector('#my-modal')
if (modal) initComponents(modal)
```

### `setGlobalInitCondition(cb)`

Registers a global predicate to decide whether a component should be initialized for a given element.

This is useful for:

- Skipping initialization for hidden/disabled areas
- Feature flags / A-B experiments
- Deferring initialization until some attribute/data is present

```ts
import { setGlobalInitCondition } from '@vladislavbelozerov/js-app'

setGlobalInitCondition((element, record) => {
  // Example: skip everything inside [data-no-init]
  if (element.closest('[data-no-init]')) return false

  // Example: allow only a specific component
  // return record.name === 'my-counter'

  return true
})
```

### `destroyComponents(root)`

Destroys components that were previously initialized under `root`.

Just like `initComponents`, `root` can be **any DOM subtree/container**.

This is what `destroyApp()` uses internally.

```ts
import { destroyComponents } from '@vladislavbelozerov/js-app'

destroyComponents(document.documentElement)
```

```ts
import { destroyComponents } from '@vladislavbelozerov/js-app'

const sidebar = document.querySelector('#sidebar')
if (sidebar) destroyComponents(sidebar)
```

## Component structure (recommended)

A practical component structure looks like this:

- Read initial props
- Setup DOM listeners / timers / subscriptions
- Return a `ref` object (public API)
- Provide `destroy()` to cleanup

```ts
export type WidgetProps = {
  title?: string
}

export function Widget(element: HTMLElement, props: WidgetProps) {
  element.textContent = props.title ?? 'Widget'

  const interval = window.setInterval(() => {
    // ...
  }, 1000)

  return {
    destroy() {
      window.clearInterval(interval)
    },
  }
}
```

## Hooks

Hooks are helpers built on RxJS (observables) to interact with lifecycle and DOM/component utilities.

### Lifecycle hooks

These hooks allow you to react to app lifecycle events.

- `useReady(cb)`
- `useBeforeUpdate(cb)`
- `useUpdated(cb)`
- `useBeforeDestroy(cb)`
- `useDestroyed(cb)`

Example:

```ts
import { useReady, useBeforeDestroy } from '@vladislavbelozerov/js-app'

useReady(() => {
  console.log('App is ready')
})

useBeforeDestroy(() => {
  console.log('App will be destroyed')
})
```

### Props hooks

- `useProps(element, name, props)`
- `useStringifyProps(props)`

Use them to normalize/derive props (depending on your app’s conventions).

```ts
import { useProps } from '@vladislavbelozerov/js-app'

export function Button(element: HTMLElement, { text = 'Click' }: { text?: string }) {
  const props = useProps(element, 'button', { text })

  element.textContent = props.text

  return {
    text: props.text,
  }
}
```

### Refs

- `useRef(element, name)`

Allows you to subscribe to another component’s ref.

```ts
import { useRef } from '@vladislavbelozerov/js-app'
import type { Button } from './Button'

export function Root(element: HTMLElement) {
  const buttonEl = element.querySelector('button')
  if (!buttonEl) return {}

  const buttonRef$ = useRef<typeof Button>(buttonEl as HTMLElement, 'button')

  const sub = buttonRef$.subscribe((ref) => {
    console.log('Button ref updated:', ref)
  })

  return {
    destroy() {
      sub.unsubscribe()
      buttonRef$.complete()
    },
  }
}
```

## API surface (exports)

Main exports are available from:

```ts
import {
  App,
  initApp,
  updateApp,
  destroyApp,
  initComponents,
  setGlobalInitCondition,
  destroyComponents,
  registerComponent,
  addToRegistry,
  useReady,
  useBeforeUpdate,
  useUpdated,
  useBeforeDestroy,
  useDestroyed,
  useProps,
  useStringifyProps,
  useRef,
} from '@vladislavbelozerov/js-app'
```

## License

MIT
