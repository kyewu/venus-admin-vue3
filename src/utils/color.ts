/**
 * Darkens a color by the specified rate.
 *
 * @param {string} color - The color to be darkened in hexadecimal format.
 * @param {number} rate - The rate at which the color should be darkened.
 * @return {string} The darkened color in hexadecimal format.
 */
export function darken(color: string, rate: number) {
  // 支持 #fff 或 #ffffff
  let hex = color.replace('#', '')
  if (hex.length === 3) {
    hex = hex.split('').map(s => s + s).join('')
  }
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // 根据比率调整 RGB 值
  const adjustedR = Math.round(r * (1 - rate))
  const adjustedG = Math.round(g * (1 - rate))
  const adjustedB = Math.round(b * (1 - rate))

  // 将调整后的 RGB 值转换回十六进制颜色值
  const adjustedColor = `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG
    .toString(16)
    .padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`

  return adjustedColor
}