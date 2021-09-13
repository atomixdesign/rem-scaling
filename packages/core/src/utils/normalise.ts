import { clamp } from './clamp'

export const normalise = (min: number, max: number, actual: number): number => clamp(0, 1, (actual - min) / (max - min))
