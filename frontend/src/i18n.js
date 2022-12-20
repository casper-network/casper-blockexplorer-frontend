import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import i18n from 'i18next';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    // todo: ask about fallback language
    fallbackLng: ['en', 'de'],
  });
