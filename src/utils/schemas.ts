import { z } from 'zod';

import i18n from '@/i18n/config';

export const passwordSchema = z
  .string({
    required_error:
      i18n.resolvedLanguage === 'en'
        ? 'Password cannot be empty.'
        : 'كلمة المرور لا يمكن أن تكون فارغة.',
  })
  .regex(/^.{8,20}$/, {
    message:
      i18n.resolvedLanguage === 'en'
        ? 'Password must be between 8 and 20 characters.'
        : 'يجب أن تكون كلمة المرور بين 8 و 20 حرفًا.',
  })
  .regex(/(?=.*[A-Z])/, {
    message:
      i18n.resolvedLanguage === 'en'
        ? 'Password must contain at least one uppercase letter.'
        : 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.',
  })
  .regex(/(?=.*[a-z])/, {
    message:
      i18n.resolvedLanguage === 'en'
        ? 'Password must contain at least one lowercase letter.'
        : 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.',
  })
  .regex(/(?=.*\d)/, {
    message:
      i18n.resolvedLanguage === 'en'
        ? 'Password must contain at least one digit.'
        : 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.',
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message:
      i18n.resolvedLanguage === 'en'
        ? 'Password must contain at least one special character.'
        : 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل.',
  });

export const noLeadingSpacesSchema = z
  .string()
  .refine((val) => val.trim().length > 0, {
    message: 'Input cannot be empty or start with spaces',
  });

export const noNumbersSchema = z.string().refine((val) => !/\d/.test(val), {
  message: 'Input cannot contain numbers',
});
