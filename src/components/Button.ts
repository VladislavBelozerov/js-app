import { useProps } from '../../lib/hooks/useProps.ts'

export interface ButtonProps {
  text?: string
}

export function Button(element: HTMLElement, { text = 'test' }: ButtonProps) {
  console.log('Button element:', element)

  const props = useProps(element, 'button', { text })

  return {
    text: props.text,
  }
}
