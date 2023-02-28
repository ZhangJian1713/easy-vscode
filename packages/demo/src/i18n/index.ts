import { addResources } from '@easy_vscode/i18n'
import en from './locales/en'
import zh from './locales/zh'

addResources({
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
})

export * from './constants'