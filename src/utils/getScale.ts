import { getWindowWidth } from './getWindowWidth'
import { getBreakpoint } from './getBreakpoint'
import { normalise } from './normalise'

export const getScale = () => {
  const [min, max] = getBreakpoint()
  const actual = getWindowWidth()

  return normalise(min, max, actual)
}

