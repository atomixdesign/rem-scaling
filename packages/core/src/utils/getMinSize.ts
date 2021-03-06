import { BreakpointMap } from '../types'

export const getMinSize = (breakpoints: BreakpointMap) => {
  return Object.keys(breakpoints).reduce((min, key) => {
    const [next] = breakpoints[key]

    return Math.min(min, next)
  }, Number.POSITIVE_INFINITY)
}