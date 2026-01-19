import * as React from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
      props.value === '' || props.value === undefined || props.disabled;
    const { dir } = useTranslations();
    return (
      <div className='relative'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pr-10', className)}
          ref={ref}
          {...props}
          dir={dir}
        />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className={cn(
            'absolute top-0 h-full px-3 py-2 hover:bg-transparent',
            dir === 'rtl' ? 'left-0' : 'right-0',
          )}
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
        >
          {showPassword && !disabled ? (
            <EyeIcon
              className='h-4 w-4'
              aria-hidden='true'
            />
          ) : (
            <EyeOffIcon
              className='h-4 w-4'
              aria-hidden='true'
            />
          )}
          <span className='sr-only'>
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>

        {/* hides browsers password toggles */}
        <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
