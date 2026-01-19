import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';

const LogOutMessage = ({
  isOpen,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) => {
  const { dir } = useTranslations();
  const { isEnglish } = useLocale();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      {' '}
      {/* Ensure dialog is controlled */}
      <DialogContent className='sm:rounded-lg'>
        <DialogHeader>
          <DialogTitle
            className='text-secondary-900 text-xl font-semibold rtl:text-right ltr:text-left'
            dir={dir}
          >
            {isEnglish
              ? 'Are you sure you want to logout?'
              : 'هل أنت متأكد من أنك تريد تسجيل الخروج؟'}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className='xs:flex-row flex w-full flex-col gap-4 sm:justify-stretch'>
          <Button
            onClick={onLogout}
            className='m-0! flex-1 hover:bg-red-500'
            variant='outline'
          >
            {isEnglish ? 'Logout' : 'تسجيل الخروج'}
          </Button>
          <DialogClose asChild>
            <Button
              variant='default'
              className='flex-1'
            >
              {isEnglish ? 'Stay Logged in' : 'البقاء مسجل الدخول'}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogOutMessage;
