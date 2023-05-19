import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// @ts-ignore -- public folder is outside of rootDir
// eslint-disable-next-line import/extensions
import en from '../../public/locales/en/translation.json';

const resources = {
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  // debug: true,
  resources,
});

export default i18n;
