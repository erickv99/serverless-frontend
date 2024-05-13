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
  const credentials = localStorage.getItem('authorization_token') ?? '';
  const token = btoa(credentials);

  const response = await fetch(`${APIS.import}/${fileName}`, {
    headers: { Authorization: `Basic ${token}` },
  });
  if (response.ok) {
    const json = await response.json();
    return json.url;
  } else {
    throw response;
  }
};

export const uploadFile = async (payload: { fileName: string; file: File }) => {
  const signedUrl = await getSignedUrl(payload.fileName);

  const response = await fetch(signedUrl, {
    method: 'PUT',
    body: payload.file,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${payload.fileName}"`,
    },
  });
  if (!response.ok) {
    throw response;
  }
};
