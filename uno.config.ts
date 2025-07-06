import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
export default defineConfig({
  rules: [
    [
      'm-safe',
      {
        'margin-left': 'env(safe-area-inset-left)',
        'margin-right': 'env(safe-area-inset-right)',
        'margin-bottom': 'env(safe-area-inset-bottom)',
        'margin-top': 'env(safe-area-inset-top)'
      },
    ]
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
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
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'xl2': '1444px',
      '2xl': '1536px',
    }
  }
})
