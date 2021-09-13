import { Breakpoint, BreakpointMap } from './breakpoints'

export type RemScalingOptions = {
  min: number
  max: number
  base: number
  breakpoints: BreakpointMap
  fallback: Breakpoint
  nonce?: string
}