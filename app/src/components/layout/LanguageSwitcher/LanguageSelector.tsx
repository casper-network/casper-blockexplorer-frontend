import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LanguageSelectorButton,
  LanguageSelectorWrapper,
} from './LanguageSelector.styled';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const langs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' },
  };

  return (
    <LanguageSelectorWrapper>
      {Object.keys(langs).map(lng => (
        <LanguageSelectorButton
          bgColor=""
          type="submit"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}>
          {lng.toUpperCase()}
        </LanguageSelectorButton>
      ))}
    </LanguageSelectorWrapper>
  );
};
