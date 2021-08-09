import { getWindowWidth } from './getWindowWidth'
import { getBreakpoint, GetBreakpointArgs } from './getBreakpoint'
import { normalise } from './normalise'

export const getScale = (context: GetBreakpointArgs) => {
  const [min, max] = getBreakpoint(context)
  const actual = getWindowWidth()

  return normalise(min, max, actual)
}

