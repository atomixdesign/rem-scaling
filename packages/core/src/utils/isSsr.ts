export const isSsr = () => typeof window === 'undefined'

export const isBrowser = () => !isSsr()
