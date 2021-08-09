import { isSsr } from './isSsr'

export let iOS = false

if (!isSsr()) {
  const navigator = window.navigator

  iOS = typeof navigator !== 'undefined' &&
    (/iPad|iPhone|iPod/.test(navigator.userAgent || '') ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) // iPad iOS 13
}

