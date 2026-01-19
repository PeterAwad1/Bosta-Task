import Cookies from 'js-cookie';
import { toast } from 'sonner';

import { REFRESH_TOKEN, TOKEN, USER_DATA, USER_VERIFIED } from '@/constants';

export function removeAuthCookies() {
  Cookies.remove(TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  Cookies.remove(USER_VERIFIED);
  Cookies.remove(USER_DATA);
  toast.success('Logged out successfully');
}

export function setToken(token: string) {
  Cookies.set(TOKEN, token, { expires: 7 }); // Expires in 7 days
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN);
}

export function setUser(user: { username: string; token: string }) {
  Cookies.set(USER_DATA, JSON.stringify(user), { expires: 7 }); // Expires in 7 days
}

export function getUser(): { username: string; token: string } | null {
  const user = Cookies.get(USER_DATA);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Failed to parse user from cookie', error);
    return null;
  }
}

