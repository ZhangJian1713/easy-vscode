import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'

export const DEFAULT_NAMESPACE = 'translation'

export const i18next = i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })

export const addResources = (resources: Resource) => {
  Object.entries(resources).forEach(([lng, lngResource])=>{
    Object.entries(lngResource).forEach(([ns, resource])=>{
      i18n.addResourceBundle(lng,ns,resource)
    })
  })
}
  
export default i18n
export * from './useTranslation'