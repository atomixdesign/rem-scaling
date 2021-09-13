import React from 'react'
import { createContext } from 'react'
import { RemScalingOptions } from '@atomixdesign/rem-scaling'

export const RemScalingContext = createContext<RemScalingOptions>({
  min: 12,
  max: 16,
  base: 16,
  breakpoints: {
    md: [768, 1024],
    lg: [1024, 1600],
  },
  fallback: [0, 1600],
})

export const RemScalingProvider: React.FC<{ options: RemScalingOptions }> = ({ options, children }) => <RemScalingContext.Provider value={options} children={children} />