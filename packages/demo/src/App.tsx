import React, { ChangeEventHandler, useCallback, useEffect, useState } from 'react'
import { HtmlFontSetter, RemScalingOptions } from '@atomixdesign/rem-scaling'
import { RemScalingContext } from '@atomixdesign/rem-scaling-react'

const rem = (size: number) => {
  return `${size / 16}rem`
}

const options: RemScalingOptions = {
  min: 12,
  max: 16,
  base: 16,
  breakpoints: {
    md: [768, 1024], // Font-size @768: 12px, @1024: 16px
    lg: [1024, 1600],
  },
  fallback: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY], // Fallback breakpoint for SSR, if no SSR is needed just use this
}

const Box: React.FC = ({ children }) => (
  <div style={{
    color: 'white',
    background: 'red',
    width: rem(100),
    height: rem(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    {children}
  </div>
)

export const ReactApp: React.VFC = () => {
  return (
    <RemScalingContext.Provider value={options}>
      <Box>React</Box>
    </RemScalingContext.Provider>
  )
}

export const HtmlApp: React.VFC = () => {
  const [instance, setInstance] = useState<HtmlFontSetter>()

  useEffect(() => {
    setInstance(
      new HtmlFontSetter(options)
    )
  }, [setInstance])

  useEffect(() => {
    return () => {
      if (instance) {
        instance.destroy()
      }
    }
  }, [instance])

  return (
    <>
      <Box>HTML</Box>
    </>
  )
}

export const App: React.VFC = () => {
  const [app, setApp] = useState<'react' | 'html'>('react')

  const onSelect: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    setApp(e.target.value as 'react' | 'html')
  }, [setApp])

  return (
    <div>
      <select onChange={onSelect}>
        <option value="react">React</option>
        <option value="html">HTML</option>
      </select>

      {app === 'react' && <ReactApp />}
      {app === 'html' && <HtmlApp />}
    </div>
  )
}