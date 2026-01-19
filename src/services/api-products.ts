import { Product } from '@/types';

import { getAllData, postData } from '@/utils';





export async function getProductsApi() {
  const res = await getAllData('/products', {
    method: 'GET',
  });

  return res;
}

export async function getProductByIdApi(productId: string) {
  const res = await getAllData(`products/${productId}`, {
    method: 'GET',
  });

  return res;
}

export async function createProductApi(data: Partial<Product>) {
  const res = await postData('products', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
}

export async function updateProductApi(
  productId: number,
  data: Partial<Product>,
) {
  const res = await postData(`products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return res;
}

export async function deleteProductApi(productId: number) {
  const res = await postData(`products/${productId}`, {
    method: 'DELETE',
  });

  return res;
}

export async function getProductCategoriesApi() {
  const res = await getAllData('products/categories', {
    method: 'GET',
  });

  return res;
}
