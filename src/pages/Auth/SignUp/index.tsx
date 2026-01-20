import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import CustomInput from '@/components/shared/form/CustomInput';
import CustomPasswordInput from '@/components/shared/form/CustomPasswordInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { useSignUp } from '@/hooks/features/auth/useSignUp';

import useLocale from '@/i18n/useLocale';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = () => {
  const { signUp, isSigningUp } = useSignUp();
  const { isEnglish } = useLocale();
  
    const passwordSchema = z
    .string({
      message: isEnglish ? 'Password can not be empty.' : 'كلمة المرور لا يمكن أن تكون فارغة.',
    })
    .regex(/^.{8,20}$/, {
      message: isEnglish ? 'Minimum 8 and maximum 20 characters.' : 'يجب أن تكون كلمة المرور بين 8 و 20 حرفًا.',
    })
    .regex(/(?=.*[A-Z])/, {
      message: isEnglish ? 'At least one uppercase character.' : 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.',
    })
    .regex(/(?=.*[a-z])/, {
      message: isEnglish ? 'At least one lowercase character.' : 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.',
    })
    .regex(/(?=.*\d)/, {
      message: isEnglish ? 'At least one digit.' : 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.',
    })
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: isEnglish ? 'At least one special character.' : 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل.',
    });

  const schema = z.object({
    username: z
      .string({ message: isEnglish ? 'Username is required' : 'اسم المستخدم مطلوب' })
      .min(1, isEnglish ? 'Username is required' : 'اسم المستخدم مطلوب'),
    email: z
      .string({ message: isEnglish ? 'Email is required' : 'البريد الإلكتروني مطلوب' })
      .email(isEnglish ? 'Must be a valid email' : 'يجب أن يكون بريداً إلكترونياً صحيحاً')
      .min(1, isEnglish ? 'Email is required' : 'البريد الإلكتروني مطلوب'),
    password: passwordSchema,
  });

  type FormData = z.infer<typeof schema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await signUp({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEnglish ? 'Sign Up' : 'إنشاء حساب'}
          </CardTitle>
          <CardDescription>
            {isEnglish
              ? 'Create a new account to get started'
              : 'قم بإنشاء حساب جديد للبدء'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CustomInput
                fieldName="username"
                placeholder={isEnglish ? 'Enter username' : 'أدخل اسم المستخدم'}
                label={isEnglish ? 'Username' : 'اسم المستخدم'}
              />
              <CustomInput
                fieldName="email"
                placeholder={isEnglish ? 'Enter email' : 'أدخل البريد الإلكتروني'}
                label={isEnglish ? 'Email' : 'البريد الإلكتروني'}
                type="email"
              />
              <CustomPasswordInput
                fieldName="password"
                placeholder={isEnglish ? 'Enter password' : 'أدخل كلمة المرور'}
                label={isEnglish ? 'Password' : 'كلمة المرور'}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <Spinner />
                ) : isEnglish ? (
                  'Sign Up'
                ) : (
                  'إنشاء حساب'
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {isEnglish ? 'Already have an account? ' : 'لديك حساب بالفعل؟ '}
                <Link
                  to="/signin"
                  className="font-medium text-primary hover:underline"
                >
                  {isEnglish ? 'Sign In' : 'تسجيل الدخول'}
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
