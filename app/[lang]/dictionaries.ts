const dictionaries = {
  en: () => import('../locales/en.json').then((module) => module.default),
  ru: () => import('../locales/ru.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ru') => dictionaries[locale]()
