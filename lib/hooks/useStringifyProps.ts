import { kebabCase } from 'lodash-es'
import type { JsAppComponentProps } from '../component'

export function useStringifyProps(
  name: string,
  props: JsAppComponentProps,
): Record<string, string> {
  const _name = kebabCase(name)
  const result: Record<string, string> = {}

  Object.entries(props).forEach(([key, value]) => {
    const attrName = `data-${_name}-${kebabCase(key)}`

    if (value === undefined) {
      return
    } else if (value === null) {
      result[attrName] = 'null'
    } else if (value === true) {
      result[attrName] = ''
    } else if (value === false) {
      result[attrName] = 'false'
    } else if (typeof value === 'number') {
      result[attrName] = value.toString()
    } else if (typeof value === 'string') {
      result[attrName] = value
    } else if (typeof value === 'symbol') {
      result[attrName] = value.toString()
    } else if (typeof value === 'function') {
      // Для функций мы сохраняем только информацию о том, что это функция
      result[attrName] = 'function'
    } else {
      try {
        result[attrName] = JSON.stringify(value)
      } catch (e) {
        console.warn(`Failed to stringify property ${key}:`, e)
      }
    }
  })

  return result
}
