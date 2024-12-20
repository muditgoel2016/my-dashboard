import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 *
 * @param {...any} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Determines if the user-agent belongs to a mobile device.
 * @param {string} userAgent - The user-agent string to evaluate.
 * @returns {boolean} `true` if the user-agent is mobile, otherwise `false`.
 */
export function isMobileUserAgent(userAgent: string): boolean {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}
