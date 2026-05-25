import { useProps } from '../../lib/hooks/useProps.ts'

export interface ButtonProps {
  text?: string
}

export function Button(
  element: HTMLButtonElement,
  { text = 'test' }: ButtonProps,
) {
  const props = useProps(element, 'button', { text })

  return {
    text: props.text,
  }
}
