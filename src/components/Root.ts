import { useGetRef } from '../../lib/hooks/useGetRef.ts'
import { useReady } from '../../lib/hooks/useReady.ts'

export interface RootProps {
  strData?: string
}

export function Root(element: HTMLElement, { strData }: RootProps) {
  console.log(strData)

  const buttonEl = element.querySelector('button')
  const buttonRef = useGetRef(buttonEl as HTMLElement, 'button')

  useReady(() => {
    console.log(buttonRef.current)
  })

  return {
    destroy() {
      console.log('Root component destroyed')
    },
  }
}
