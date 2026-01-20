import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
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

import { useLogin } from '@/hooks/features/auth/useLogin';

import useLocale from '@/i18n/useLocale';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

const SignIn = () => {
  const { login, isLoggingIn } = useLogin();
  const { isEnglish } = useLocale();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login({
        username: data.username,
        password: data.password,
      });
    } catch {
      toast.error(isEnglish ? 'Failed to login' : 'فشل تسجيل الدخول');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEnglish ? 'Sign In' : 'تسجيل الدخول'}
          </CardTitle>
          <CardDescription>
            {isEnglish
              ? 'Enter your credentials to access your account'
              : 'أدخل بيانات الاعتماد للوصول إلى حسابك'}
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
              <CustomPasswordInput
                fieldName="password"
                placeholder={isEnglish ? 'Enter password' : 'أدخل كلمة المرور'}
                label={isEnglish ? 'Password' : 'كلمة المرور'}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <Spinner />
                ) : isEnglish ? (
                  'Sign In'
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {isEnglish ? "Don't have an account? " : 'ليس لديك حساب؟ '}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  {isEnglish ? 'Sign Up' : 'إنشاء حساب'}
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
