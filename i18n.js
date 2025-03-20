import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const storedLang = await AsyncStorage.getItem('language');
      if (storedLang) {
        callback(storedLang); // ✅ Use stored language
      } else {
        // Detect system language if no saved language
        const bestLanguage = Localization.findBestLanguageTag(Object.keys(resources));
        callback(bestLanguage?.languageTag || 'en');
      }
    } catch (error) {
      console.error('Error loading language:', error);
      callback('en'); // Fallback to English
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    await AsyncStorage.setItem('language', language); // ✅ Save selected language
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
  });

export default i18n;
