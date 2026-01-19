import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer';
import Icon from '../shared/Icon';
import Spinner from '../shared/loaders/Spinner';

//import { useMediaQuery } from '@/hooks/use-media-query';
import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type RemoveButtonProps = {
  title?: string;
  onDelete: () => void;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
  iconSize?: string;
  isTriggerTitle?: boolean;
};

const RemoveButton = ({
  title,
  onDelete,
  isLoading,
  children,
  className,
  iconSize,
  isTriggerTitle = true,
}: RemoveButtonProps) => {
  const [open, setOpen] = useState(false);

  // const isDesktop = useMediaQuery('(min-width: 768px)');
  const { t } = useTranslations();

  async function handleRemove() {
    await onDelete();
    setOpen(false);
  }

  // if (isDesktop)
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <button className={cn('flex items-center gap-2', className)}>
          <Icon
            name='trash'
            className={cn('size-4', iconSize)}
          />{' '}
          {isTriggerTitle ? title : ''}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-semibold text-secondary-900'>
            {title}
          </DialogTitle>
          <DialogDescription className='sr-only'>{title}</DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter className='flex w-full flex-col gap-4 xs:flex-row sm:justify-stretch'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='flex-1'
            >
              {t('buttons.cancel')}
            </Button>
          </DialogClose>

          <Button
            onClick={handleRemove}
            className='!m-0 flex-1 hover:bg-red-500'
            variant='destructive'
          >
            {isLoading ? <Spinner /> : t('buttons.Remove')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // return (
  //   <Drawer
  //     open={open}
  //     onOpenChange={setOpen}
  //   >
  //     <DrawerTrigger asChild>
  //       <button>
  //         <Icon
  //           name='trash'
  //           className='size-6'
  //         />
  //       </button>
  //     </DrawerTrigger>

  //     <DrawerContent className='pb-4'>
  //       <DrawerHeader>
  //         <DrawerTitle className='text-center text-2xl font-semibold text-secondary-900'>
  //           {title}
  //         </DrawerTitle>
  //         <DrawerDescription className='sr-only'> {title}</DrawerDescription>
  //       </DrawerHeader>

  //       {children}

  //       <DialogFooter className='mt-4 flex w-full flex-col gap-4 px-4 xs:flex-row sm:justify-stretch'>
  //         <DialogClose asChild>
  //           <Button
  //             variant='outline'
  //             className='flex-1'
  //           >
  //             {t('cancel')}
  //           </Button>
  //         </DialogClose>

  //         <Button
  //           onClick={handleRemove}
  //           className='flex-1'
  //         >
  //           {isLoading ? <Spinner /> : t('remove')}
  //         </Button>
  //       </DialogFooter>
  //     </DrawerContent>
  //   </Drawer>
  // );
};

export default RemoveButton;
