import { FakeStoreUser } from '@/types';

import { getAllData, postData } from '@/utils';

export async function getUsersApi() {
  const res = await getAllData('/users', {
    method: 'GET',
  });

  return res;
}

export async function getUserByIdApi(userId: number) {
  const res = await getAllData(`/users/${userId}`, {
    method: 'GET',
  });

  return res;
}

export async function createUserApi(data: Partial<FakeStoreUser>) {
  const res = await postData('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function updateUserApi(userId: number, data: Partial<FakeStoreUser>) {
  const res = await postData(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return res;
}

export async function deleteUserApi(userId: number) {
  const res = await postData(`/users/${userId}`, {
    method: 'DELETE',
  });

  return res;
}
