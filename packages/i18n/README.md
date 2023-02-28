# `@easy-vscode/i18n`

> I18n for easy-vscode

## Usage

Add languages resource:

```ts
import { addResources } from '@easy-vscode/i18n'
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
```

Translate:

```tsx
import i18n, { useTranslationValues } from '@easy-vscode/i18n'
import { K } from '../../i18n'

// Batch translate values
const [TYPE, BACKGROUND] = useTranslationValues(K.TYPE, K.BACKGROUND)

// Translate value directly
const label = i18n.t(K.LABEL)
```
