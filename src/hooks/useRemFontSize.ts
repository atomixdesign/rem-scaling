import { useContext, useEffect, useState } from 'react'
import { getScale, isSsr } from '../utils'
import { RemScalingContext } from '../components/remScalingContext/remScalingContext'

export const useRemFontSize = () => {
  const { min, max, base, breakpoints } = useContext(RemScalingContext)
  const minSize = breakpoints?.[0]?.[0] ?? 0
  const [scale, setScale] = useState(getScale())

  useEffect(() => {
    if (!isSsr()) {
      const onResize = () => window.requestAnimationFrame(() => setScale(getScale()))

      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      }
    }
  }, [])

  if (typeof window === 'undefined') {
    return max
  }

  if (window.innerWidth <= minSize) {
    return base // Fall back to normal font size on mobile
  }

  const difference = max - min

  return Number(min + (difference * scale)).toFixed(1)
}
