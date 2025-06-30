import { defineConfig, presetIcons, transformerDirectives } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  presets: [
    presetWind4(),
    presetIcons({
      prefix: 'i-',
      autoInstall: true,
      extraProperties: {
        display: 'inline-block',
        height: '1.2em',
        width: '1.2em',
        'vertical-align': 'middle',
      },
    }),
  ],
})
