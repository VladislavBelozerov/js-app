import assert from 'node:assert/strict'
import path from 'node:path'
import process from 'node:process'
import test from 'node:test'
import { setTimeout as delay } from 'node:timers/promises'
import ts from 'typescript'
import { createServer } from 'vite'

test('async component lifecycle', async (t) => {
  const server = await createServer({
    configFile: false,
    server: { middlewareMode: true, hmr: false, ws: false },
  })
  t.after(() => server.close())
  const { App, initApp, destroyApp } = await server.ssrLoadModule('/lib/App.ts')
  const { destroyComponents } = await server.ssrLoadModule(
    '/lib/component/destroyComponents.ts',
  )
  const { useRef } = await server.ssrLoadModule('/lib/hooks/useRef.ts')
  const { registerAsyncComponent } = await server.ssrLoadModule('/lib/main.ts')

  function mount(loader) {
    const attrs = new Map()
    const element = {
      dataset: {},
      setAttribute(name, value) {
        attrs.set(name, value)
        if (name === 'data-component-widget-id') {
          this.dataset.componentWidgetId = value
        }
      },
      getAttribute: (name) => attrs.get(name) ?? null,
      hasAttribute: (name) => attrs.has(name),
      removeAttribute: (name) => attrs.delete(name),
    }
    const root = {
      querySelector: () => element,
      querySelectorAll: () => [element],
    }
    App.registry.set(
      'widget',
      registerAsyncComponent('widget', '[data-widget]', loader, { count: 3 }),
    )
    initApp(root)
    return { element, root }
  }

  await t.test(
    'keeps the ID, resolves useRef and destroys without stale records',
    async () => {
      let resolve
      const pending = new Promise((done) => {
        resolve = done
      })
      const { element, root } = mount(() => pending)
      const id = element.getAttribute('data-component-widget-id')
      const ref$ = useRef(element, 'widget')
      const values = []
      ref$.subscribe((value) => values.push(value))
      await delay(10)
      assert.deepEqual(values, [null])
      let destroyCalls = 0
      const ref = {
        destroy() {
          destroyCalls++
        },
      }
      resolve((el, props) => {
        assert.equal(el, element)
        assert.deepEqual(props, { count: 3 })
        return ref
      })
      await delay(10)
      assert.deepEqual(values, [null, ref])
      assert.equal(App.components.size, 1)
      assert.equal(element.getAttribute('data-component-widget-id'), id)
      assert.equal(App.components.get(id).ref, ref)
      const lateRef$ = useRef(element, 'widget')
      await delay(10)
      assert.equal(lateRef$.getValue(), ref)
      destroyComponents(root)
      assert.equal(destroyCalls, 1)
      assert.equal(App.components.size, 0)
      destroyApp()
    },
  )

  await t.test('accepts components without a returned ref', async () => {
    const { root } = mount(async () => () => undefined)
    await delay(10)
    assert.deepEqual([...App.components.values()][0].ref, {})
    assert.doesNotThrow(() => destroyComponents(root))
    assert.equal(App.components.size, 0)
    destroyApp()
  })

  await t.test(
    'does not initialize after destruction during loading',
    async () => {
      let resolve
      const pending = new Promise((done) => {
        resolve = done
      })
      mount(() => pending)
      await delay(10)
      destroyApp()
      let calls = 0
      resolve(() => {
        calls++
      })
      await delay(10)
      assert.equal(calls, 0)
      assert.equal(App.components.size, 0)
    },
  )

  for (const failure of ['reject', 'loader throws', 'component throws']) {
    await t.test(
      `reports ${failure} to current and late useRef subscribers`,
      async () => {
        const expected = new Error(failure)
        let reject
        const pending = new Promise((_, fail) => {
          reject = fail
        })
        const originalError = console.error
        const reports = []
        console.error = (...args) => reports.push(args)
        try {
          const loader =
            failure === 'reject'
              ? () => pending
              : failure === 'loader throws'
                ? () => {
                    throw expected
                  }
                : async () => () => {
                    throw expected
                  }
          const { element } = mount(loader)
          const ref$ = useRef(element, 'widget')
          let received
          ref$.subscribe({
            error: (error) => {
              received = error
            },
          })
          await delay(10)
          if (failure === 'reject') {
            reject(expected)
          }
          await delay(10)
          assert.equal(received, expected)
          assert.equal(reports.length, 1)
          assert.equal(reports[0][1], expected)
          const lateRef$ = useRef(element, 'widget')
          let lateError
          lateRef$.subscribe({
            error: (error) => {
              lateError = error
            },
          })
          await delay(10)
          assert.equal(lateError, expected)
        } finally {
          console.error = originalError
          destroyApp()
        }
      },
    )
  }
})

test('public async registration infers and validates component props', () => {
  const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile)
  const parsed = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    process.cwd(),
  )
  const file = path.join(process.cwd(), '__async_type_test__.ts')
  const source = `
import { registerAsyncComponent } from './lib/main.ts'
const Component = (_el: HTMLElement, _props: { count: number }) => ({})
registerAsyncComponent('widget', '[data-widget]', async () => Component, { count: 1 })
registerAsyncComponent<typeof Component>('widget', '[data-widget]', async () => Component, { count: 1 })
// @ts-expect-error props must be inferred from the loaded component
registerAsyncComponent('widget', '[data-widget]', async () => Component, { count: 'wrong' })
// @ts-expect-error a loader must return a promise of a component
registerAsyncComponent('widget', '[data-widget]', Component, { count: 1 })
`
  const host = ts.createCompilerHost(parsed.options)
  const readFile = host.readFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  host.readFile = (name) => (name === file ? source : readFile(name))
  host.fileExists = (name) => name === file || fileExists(name)
  const program = ts.createProgram(
    [...parsed.fileNames, file],
    parsed.options,
    host,
  )
  const diagnostics = ts.getPreEmitDiagnostics(program)
  assert.deepEqual(
    diagnostics.map((d) =>
      ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    ),
    [],
  )
})
