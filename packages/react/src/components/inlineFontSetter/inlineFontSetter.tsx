import React from 'react'
import { useContext, useEffect } from 'react'
import { useRemFontSize } from '../../hooks'
import { RemScalingContext } from '../remScalingContext/remScalingContext'
import { getMinSize } from '@atomixdesign/rem-scaling'

export const InlineFontSetter = () => {
  const { min, max, base, breakpoints, nonce } = useContext(RemScalingContext)
  const minSize = getMinSize(breakpoints)
  const fontSize = useRemFontSize()

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`

    if (document.body.parentElement) {
      document.body.parentElement.style.fontSize = `${fontSize}px`
    }
  }, [fontSize])

  return (
    <React.Fragment>
      <style nonce={nonce}>{`
        html {
          font-size: ${base}px;
        }
      `}</style>
      <script nonce={nonce} dangerouslySetInnerHTML={{ __html: `
        var breakpoints = JSON.parse('${JSON.stringify(breakpoints)}');
        var fontSizes = JSON.parse('${JSON.stringify({ min, max })}')
        var keys = Object.keys(breakpoints)

        if (window.innerWidth <= ${minSize}) {
          document.querySelector('html').style.fontSize = '16px'
        } else {
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var min = breakpoints[key][0]
            var max = breakpoints[key][1]
            var condition = '(max-width: ' + (max) + 'px)'
            if (window.matchMedia(condition).matches) {
              var scale = Math.min(1, Math.max(0, (window.innerWidth - min) / (max - min)))
              var difference = fontSizes.max - fontSizes.min
              var fontSize = Number(fontSizes.min + (difference * scale)).toFixed(1)
              document.querySelector('html').style.fontSize = fontSize + 'px'
              break
            }
          }
        }
      ` }} />
    </React.Fragment>
  )
}
