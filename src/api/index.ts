import { APIS } from '../http';

export const getProducts = async (): Promise<Array<Product>> => {
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

export const getSignedUrl = async (fileName: string) => {
  try {
    const response = await fetch(`${APIS.import}/${fileName}`);
    const json = await response.json();
    return json.url;
  } catch (error) {
    throw new Error('Error getting signedUrl');
  }
};

export const uploadFile = async (payload: {
  fileName: string;
  file: File;
}): Promise<boolean> => {
  const signedUrl = await getSignedUrl(payload.fileName);

  try {
    await fetch(signedUrl, {
      method: 'PUT',
      body: payload.file,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${payload.fileName}"`,
      },
    });
    return true;
  } catch (error) {
    console.log('uploadFile', error);
    return false;
  }
};
