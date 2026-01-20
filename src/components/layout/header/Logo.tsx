import { Link } from 'react-router-dom';

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';



const Logo = ({ className }: { className?: string }) => {

  const { isEnglish } = useLocale();
  return (
    <Link
      to={`/`}
      className={cn(className, 'flex items-center ')}
    >
      <img
        src='/svg/logo.svg'
        className='h-12 w-12'
      />
    {isEnglish ? <span className="text-3xl font-bold text-primary-500  rtl:text-right">bosta</span> : <span className="text-2xl font-bold text-primary-500  rtl:text-right">بوسطة</span>}
    </Link>
  );
};

export default Logo;
