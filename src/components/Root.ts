import { useRef } from '../../lib/hooks/useRef.ts'

export interface RootProps {
  strData?: string
}

export function Root(element: HTMLElement) {
  const buttonEl = element.querySelector('button')
  const buttonRef = useRef(buttonEl as HTMLElement, 'button')

  buttonRef.subscribe((ref) => {
    console.log('Button ref updated:', ref)
  })

  return {
    destroy() {
      buttonRef.complete()
    },
  }
}
