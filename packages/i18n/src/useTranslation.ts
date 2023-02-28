import { useTranslation as useReactI18nextTranslation } from 'react-i18next'

export function useTranslationValues(...keys: string[]) {
  const { t } = useReactI18nextTranslation()
  return keys.map((key) => t(key))
}
