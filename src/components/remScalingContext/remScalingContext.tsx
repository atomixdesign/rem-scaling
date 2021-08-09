import React from 'react'
import { createContext } from 'react'

export type BreakpointKey = string

export type Breakpoint = [number, number]

export type BreakpointMap = Record<BreakpointKey, Breakpoint>

export type RemScalingContextType = {
  min: number
  max: number
  base: number
  breakpoints: BreakpointMap
  fallback: Breakpoint
}

export const RemScalingContext = createContext<RemScalingContextType>({
  min: 12,
  max: 16,
  base: 16,
  breakpoints: {
    md: [768, 1024],
    lg: [1024, 1600],
  },
  fallback: [0, 1600],
})

export const RemScalingProvider: React.FC<{ options: RemScalingContextType }> = ({ options, children }) => <RemScalingContext.Provider value={options} children={children} />