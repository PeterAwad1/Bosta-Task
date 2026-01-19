import { useState } from 'react';

import Cookies from 'js-cookie';
import { LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import Icon from '@/components/shared/Icon';

import LanguageForm from '../header/LanguageForm';
import LogOutMessage from '../header/LogOutDialog';

import { useMediaQuery } from '@/hooks/use-media-query';

import { REFRESH_TOKEN, TOKEN, USER_VERIFIED } from '@/constants';

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

const NavLinks = ({ onClose }: { onClose?: VoidFunction }) => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { academyId } = useParams();
  const { isEnglish } = useLocale();
  const MAIN_NAVLINKS = [
    { label: isEnglish ? 'Home' : 'الرئيسية', iconName: 'home', href: '' },
    {
      label: isEnglish ? 'Sessions' : 'الحصص',
      iconName: 'sessions',
      href: 'sessions',
    },
    {
      label: isEnglish ? 'Trainee' : 'المتدربين',
      iconName: 'trainee',
      href: 'trainee',
    },
    {
      label: isEnglish ? 'Financials' : 'الماليات',
      iconName: 'financials',
      href: 'financials',
    },
    {
      label: isEnglish ? 'Updates' : 'الاعلانات',
      iconName: 'updates',
      href: 'updates',
    },
    {
      label: isEnglish ? 'General' : 'الاعدادات',
      iconName: 'general',
      href: 'general',
    },
  ];
  const buildPath = (href: string) =>
    `/academies/${academyId}${href ? `/${href}` : ''}`;

  const isActive = (href: string) => pathname === buildPath(href);

  // Handle Logout
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  function handleLogout() {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(USER_VERIFIED);
    queryClient.clear();
    navigate('/signin', { replace: true });
  }
  return (
    <>
      {MAIN_NAVLINKS.map(({ label, href, iconName }) => (
        <Link
          key={label}
          to={href}
          className={cn(
            isMobile
              ? 'my-2 flex items-center gap-2 rounded-lg px-2 py-2'
              : 'my-2 flex w-16 flex-col items-center gap-2 rounded-lg px-2 py-2',
            'text-muted-foreground transition-colors hover:bg-primary-50',
            isActive(href) ? 'text-primary-500' : 'text-secondary-400',
          )}
          onClick={onClose}
        >
          <Icon
            name={iconName}
            fill={isActive(href) ? '#EA5F27' : '#716762'}
            className='shrink-0'
          />
          <span className={isMobile ? '' : 'text-xs'}>{label}</span>
        </Link>
      ))}
      {/* <Notifications /> */}
      <div className='md:hidden'>
        <LanguageForm />
      </div>
      {/* <Logout /> */}
      <div className='md:hidden'>
        <div
          onClick={() => setIsDialogOpen(true)}
          className='ml-3 mt-4 flex cursor-pointer items-center gap-2 rounded-sm text-[#EA2727] hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white'
        >
          <LogOut />
          <span>Log out</span>
        </div>
      </div>
      <LogOutMessage
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default NavLinks;
