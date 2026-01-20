import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import useLocale from '@/i18n/useLocale';

const NotFoundError = () => {
  const { isEnglish } = useLocale();
  return (
    <section className='flex min-h-screen items-center justify-center bg-secondary-50'>
      <div className='container mx-auto flex flex-col items-center justify-center gap-y-6 px-4 py-8'>
        <img
          src='/images/404.png'
          alt='404 Not Found'
          className='mx-auto max-w-[200px] xs:max-w-[250px] sm:max-w-[300px]'
        />
        <div className='space-y-4 text-center'>
          <h1 className='text-3xl font-semibold text-secondary-900 xs:text-5xl sm:text-7xl'>
            404
          </h1>
          <h1 className='text-2xl font-semibold text-secondary-900 xs:text-3xl sm:text-5xl'>
            {isEnglish ? 'Page Not Found' : 'الصفحة غير موجودة'}
          </h1>
          <p className='mx-auto max-w-2xl text-lg text-secondary-400 max-xs:text-base'>
            {isEnglish ? 'The page you are looking for doesn\'t exist or has been moved.' : 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'}
          </p>
        </div>
        <Button
          className='mt-4'
          asChild
        >
          <Link
            to='/'
            replace={true}
          >
           {isEnglish ? 'Back to Home' : 'العودة للصفحة الرئيسية'}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFoundError;
