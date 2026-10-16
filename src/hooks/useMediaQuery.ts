import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
  )
}

/** Mouse/trackpad preciso e sem preferência por movimento reduzido. */
export function useFinePointerMotion() {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  return fine && !reduced
}
