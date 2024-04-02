import { APIS } from '../http';

export const getProducts = async () => {
  const response = await fetch(APIS.products);
  const parsedResponse = await response.json();
  return parsedResponse.products;
};

export const getProductsById = async (productId: number) => {
  const response = await fetch(`${APIS.products}/${productId}`);
  if (response.status === 200) {
    const parsedResponse = await response.json();
    return parsedResponse.product;
  } else if (response.status === 404) {
    return undefined;
  } else {
    throw new Error('Something went wrong');
  }
};
