import { useCallback, useContext, useEffect, useState } from 'react'
import { getScale as baseGetScale, isSsr, getMinSize } from '@atomixdesign/rem-scaling'
import { RemScalingContext } from '../components'

export const useRemFontSize = () => {
  const { min, max, base, breakpoints, fallback } = useContext(RemScalingContext)
  const getScale = useCallback(() => baseGetScale({ breakpoints, fallback }), [breakpoints, fallback])
  const minSize = getMinSize(breakpoints)
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
  }, [getScale])

  if (typeof window === 'undefined') {
    return max
  }

  if (window.innerWidth <= minSize) {
    return base // Fall back to normal font size on mobile
  }

  const difference = max - min

  return Number(min + (difference * scale)).toFixed(1)
}
