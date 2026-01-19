'use client';

import { useState } from 'react';

import Cookies from 'js-cookie';
import { ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import LogOutMessage from './LogOutDialog';

import { REFRESH_TOKEN, TOKEN } from '@/constants';

import useTranslations from '@/i18n/useTranslations';

type Restaurant = {
  id: string;
  restaurantName: string;
  areaNameAr: string;
  areaNameEn: string;
  logoUrl: string;
};

type User = {
  fullName: string;
  email: string;
  profilePicture: string;
};

interface NavMenuProps {
  user: User;
  restaurants?: Restaurant[];
}

const NavMenu = ({ user }: NavMenuProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslations();
  function handleLogout() {
    Cookies.remove(TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    queryClient.clear();
    navigate('/signin', { replace: true });
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='flex min-w-[264px] items-center gap-x-2 rounded-md px-2 pt-4 hover:bg-primary-50 focus-visible:outline-none sm:pt-0'>
            {user?.profilePicture && (
              <img
                src={user?.profilePicture}
                alt={user?.fullName}
                width={48}
                height={48}
                className='rounded-full'
              />
            )}
            <div className='flex flex-col items-start'>
              <h3 className='font-semibold text-primary-500'>{user?.fullName}</h3>
             
            </div>
            <ChevronDown className='ml-auto size-4' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='ml-8 w-[--radix-dropdown-menu-trigger-width] min-w-80 rounded-lg p-4'
          align='center'
          sideOffset={22}
        >
          {' '}
          <DropdownMenuItem
            onSelect={() => setIsDialogOpen(true)}
            className='hidden w-full cursor-pointer rounded-sm hover:bg-red-700 hover:text-white focus:bg-red-700 focus:text-white md:flex'
          >
            <LogOut />
            {t('Log out')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogOutMessage
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onLogout={handleLogout}
      />

      {/* Restaurants list */}
      {/* <div className="mt-3">
        <h4 className="font-medium mb-2">Restaurants</h4>
        <ul className="space-y-2">
          {restaurants.map((r) => (
            <li
              key={r.id}
              className="flex items-center gap-2 rounded-md border p-2"
            >
              <img
                src={r.logoUrl}
                alt={r.restaurantName}
                width={32}
                height={32}
                className="rounded-md"
              />
              <div>
                <p className="font-medium">{r.restaurantName}</p>
                <p className="text-xs text-muted-foreground">
                  {r.areaNameEn} / {r.areaNameAr}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default NavMenu;
