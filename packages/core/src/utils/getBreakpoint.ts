import {
  BreakpointKey,
  RemScalingOptions,
} from '../types'
import { isSsr } from './isSsr'

export type GetBreakpointArgs = Pick<RemScalingOptions, 'breakpoints' | 'fallback'>

export const getBreakpoint = ({ breakpoints, fallback }: GetBreakpointArgs) => {
  const keys = Object.keys(breakpoints)

  if (isSsr()) {
    return fallback
  }

  for (const key in breakpoints) {
    const [min, max] = breakpoints[key as BreakpointKey]

    let query = `(max-width: ${max}px)`

    if (key === Object.keys(breakpoints)[0]) {
      query = `(min-width: ${min}px) and ${query}`
    }

    if (window.matchMedia(query).matches) {
      return [min, max]
    }
  }

  return breakpoints[keys[keys.length - 1] as BreakpointKey]
}