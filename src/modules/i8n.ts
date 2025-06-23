import type { App } from 'vue'
import { createI18n, type Locale } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {}
})

// { en: import('/locales/en.ts'), zh-CN: import('/locales/zh-CN.ts') }
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.ts'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.ts$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

export const $t: typeof i18n.global.t = i18n.global.t

export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', locale)
  }
}

/**
 * NOTE:
 * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
 * The following is an example for axios.
 *
 * axios.defaults.headers.common['Accept-Language'] = locale
 */


export async function loadLocaleMessages(lang: string) {
  if(i18n.global.locale.value === lang || loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang)
  }
  // load locale messages with dynamic import
  const messages = await localesMap[lang]()

  // set locale and locale message
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default {
  install(app: App) {
    app.use(i18n)
    loadLocaleMessages('zh-CN')
  }
}