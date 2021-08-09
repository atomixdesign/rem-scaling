import { isSsr } from './isSsr'
import iOS from 'is-ios'

export const getWindowWidth = () => {
  if (isSsr()) {
    return Number.POSITIVE_INFINITY
  }

  let width = window.innerWidth

  /**
   * This is basically a bunch of logic to get the real screen size for iPad/iPhone when the device is rotated
   */
  if (iOS) {
    const orientation = typeof screen.orientation === 'undefined' ? window.orientation : screen.orientation.angle
    const isLandscape = Math.abs(Number(orientation)) === 90

    width = isLandscape ? screen.height : screen.width
  }

  return width
}