import type { Ref } from 'vue'


/**
 * 首字母大写
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 * @param {string} str - 输入字符串
 * @returns {string} 首字母大写后的字符串
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
/**
 * Convert a kebab-case string to camelCase
 * @example
 * kebabToCamel('hello-world') // 'helloWorld'
 * @param {string} str - the kebab-case string
 * @returns {string} the camelCase string
 */
export function kebabToCamel(str: string): string {
  const result = str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
  return result
}

export function camelToHyphen(str: string): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

/**
 * Creates a record of event handler functions that forward the specified events.
 * Each handler emits an event with an optional prefix and camelCase conversion.
 *
 * @param {function} emits - The emit function used to trigger events.
 * @param {string[]} arr - An array of event names in kebab-case to be converted and forwarded.
 * @param {string} [prefix=''] - An optional prefix to prepend to the event names.
 * @returns {Record<string, (...args: any[]) => void>} A record of event handler functions.
 */

export function forwardEventUtils(
  emits: any,
  arr: string[],
  prefix: string = '',
) {
  const forwardEvents: Record<string, (...args: any[]) => void> = {}

  arr.forEach((eventName) => {
    // const name = kebabToCamel(eventName)
    const name = eventName
    forwardEvents[name] = (...args: any[]) => {
      emits(`${prefix}${name}`, ...args)
    }
  })

  return forwardEvents
}

export function exposeEventUtils(ref: Ref<any>, arr: string[]) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const exposeMethods: Record<string, Function> = {}

  arr.forEach((exposeName) => {
    exposeMethods[exposeName] = (...args: any[]) => {
      if (ref.value && typeof ref.value[exposeName] === 'function') {
        ref.value[exposeName](...args)
      } else {
        return ref.value[exposeName]
      }
    }
  })

  return exposeMethods
}
