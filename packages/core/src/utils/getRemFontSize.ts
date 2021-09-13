import { RemScalingOptions } from '../types'
import { getMinSize } from './getMinSize'
import { getScale } from './getScale'

export const getRemFontSize = (options: RemScalingOptions) => {
  const { min, max, base, breakpoints } = options
  const scale = getScale(options)
  const minSize = getMinSize(breakpoints)

  if (typeof window === 'undefined') {
    return max
  }

  if (window.innerWidth <= minSize) {
    return base // Fall back to normal font size on mobile
  }

  const difference = max - min

  return Number(min + (difference * scale)).toFixed(1)
}