import type { JsAppComponentProps } from '../component'
import { kebabCase, camelCase } from 'lodash-es'

export function useProps<Props = JsAppComponentProps>(
  element: HTMLElement,
  name: string,
  defaultProps: Props = {} as Props,
) {
  const _name = kebabCase(name)
  const nameLength = name.split('-').length

  const res = Object.keys(element.dataset).reduce<any>((acc, key) => {
    const namespace = kebabCase(key).split('-').slice(0, nameLength).join('-')
    const value = element.dataset[key]
    if (typeof value === 'undefined') return acc

    // Skip attributes that do not match the module's namespace.
    if (namespace !== _name) return acc

    // Convert the attribute name to camelCase for the option name.
    const optionName = camelCase(
      kebabCase(key).split('-').slice(nameLength).join('-'),
    )

    if (!optionName) return acc

    // Attempt to parse the attribute value as JSON, falling back to primitive types or strings.
    try {
      acc[optionName] = JSON.parse(value)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      if (value === '' || value === 'true') {
        acc[optionName] = true
      } else if (value === 'false') {
        acc[optionName] = false
      } else {
        const num = parseFloat(value)

        if (num + '' === value) {
          acc[optionName] = num
        } else {
          acc[optionName] = value
        }
      }
    }

    return acc
  }, {})

  return { ...defaultProps, ...res } as Props
}
