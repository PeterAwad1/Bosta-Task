import { Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { DialogTrigger } from '../ui/dialog';

import { cn } from '@/lib/utils';

const AddButton = ({
  buttonLabel,
  buttonClassName,
  disabled = false,
}: {
  buttonLabel: string;
  buttonClassName?: string;
  disabled?: boolean;
}) => {
  return (
    <DialogTrigger asChild>
      <Button
        className={cn('text-primary-50 max-sm:w-full', buttonClassName)}
        disabled={disabled}
      >
        {buttonLabel} <Plus />
      </Button>
    </DialogTrigger>
  );
};

export default AddButton;
