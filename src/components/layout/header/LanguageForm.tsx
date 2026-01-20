import Icon from '@/components/shared/Icon';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';

const LanguageSwitcher = () => {
  const { isEnglish } = useLocale();
  const { i18n } = useTranslations();

  const handleToggleLanguage = () => {
    const nextLang = isEnglish ? 'ar' : 'en';

    localStorage.setItem('language', nextLang);
    i18n.changeLanguage(nextLang);


    window.location.reload();
  };

  return (
    <div
      onClick={handleToggleLanguage}
      className='flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-secondary-900 hover:bg-secondary-50'
    >
      <Icon name='lang' className='size-6' />
      <span className='text-sm'>
        {isEnglish ? 'English' : 'عربي'}
      </span>
    </div>
  );
};

export default LanguageSwitcher;
