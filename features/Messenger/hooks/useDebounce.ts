import { useEffect, useState } from 'react'

export function useDebounce(value: string, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const t = setTimeout(() => {
        setDebouncedValue(value)
      }, delay || 500)

      // clean up the timeout after value changes
      return () => {
        clearTimeout(t)
      }
    },
    [value, delay] // re-run if value or delay changes
  )
  return debouncedValue
}

export default useDebounce
