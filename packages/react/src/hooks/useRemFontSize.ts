import { useContext, useEffect, useState } from 'react'
import { getRemFontSize, getScale, isSsr } from '@atomixdesign/rem-scaling'
import { RemScalingContext } from '../components/remScalingContext/remScalingContext'

export const useRemFontSize = () => {
  const options = useContext(RemScalingContext)
  const [fontSize, setFontSize] = useState(getRemFontSize(options))

  useEffect(() => {
    if (!isSsr()) {
      const onResize = () => window.requestAnimationFrame(() => setFontSize(getRemFontSize(options)))

      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      }
    }
  }, [getScale, options])

  return fontSize
}
