import { useGetProps } from '../../lib/hooks/useGetProps.ts'

export interface ButtonProps {
  text?: string
}

export function Button(element: HTMLElement, { text = 'test' }: ButtonProps) {
  const props = useGetProps(element, 'button', { text })

  return {
    text: props.text,
  }
}
