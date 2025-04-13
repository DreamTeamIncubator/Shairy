const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => module.default),
  ru: () => import('./dictionaries/ru').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'ru') => dictionaries[locale]()
