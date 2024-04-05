import { APIS } from '../http';

export const getSignedUrl = async (fileName: string) => {
  try {
    const response = await fetch(`${APIS.import}/${fileName}`);
    const json = await response.json();
    return json.url;
  } catch (error) {
    throw new Error('Error getting signedUrl');
  }
};
