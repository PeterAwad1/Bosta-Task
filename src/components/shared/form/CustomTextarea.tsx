import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type CustomTextarea = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
};

function CustomTextarea({
  fieldName,
  label = '',
  placeholder = '',
  className = '',
  disabled = false,
}: CustomTextarea) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className='min-h-36 resize-none rounded-lg border-secondary-100 px-4 py-4 placeholder:text-secondary-300'
              {...field}
              disabled={isSubmitting || disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomTextarea;
