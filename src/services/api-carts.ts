import { Cart, CartProduct } from '@/types';

import { getAllData, postData } from '@/utils';

export async function getCartsApi() {
  const res = await getAllData('/carts', {
    method: 'GET',
  });

  return res;
}

export async function getCartByIdApi(cartId: number) {
  const res = await getAllData(`/carts/${cartId}`, {
    method: 'GET',
  });

  return res;
}

export async function createCartApi(data: {
  userId: number;
  products: CartProduct[];
}) {
  const res = await postData('/carts', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function updateCartApi(cartId: number, data: Partial<Cart>) {
  const res = await postData(`/carts/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return res;
}

export async function deleteCartApi(cartId: number) {
  const res = await postData(`/carts/${cartId}`, {
    method: 'DELETE',
  });

  return res;
}
