import {
  FakeStoreUser,
  LoginCredentials,
  LoginResponse,
  SignUpCredentials,
} from '@/types';

import { postData } from '@/utils';

export async function loginApi(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const res = await postData('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return res;
}

export async function signupApi(
  credentials: SignUpCredentials,
): Promise<FakeStoreUser> {
  const res = await postData('users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return res;
}
