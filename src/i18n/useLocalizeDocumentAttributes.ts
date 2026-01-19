import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

export default function useLocalizeDocumentAttributes() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage) {
      // Set the <html lang> attribute.
      document.documentElement.lang = i18n.resolvedLanguage;

      // Set the <html dir> attribute.
      document.documentElement.dir = i18n.dir(i18n.resolvedLanguage);

      // Set the font family based on language
      if (i18n.resolvedLanguage === 'en') {
        document.body.style.fontFamily = 'Noto Sans';
      } else {
        document.body.style.fontFamily = 'Tajawal';
      }
    }

    document.title = t('shared.appTitle');
  }, [i18n, i18n.resolvedLanguage, t]);
}
