import { getSignedUrl } from '../queries/upload';

export const uploadFile = async (fileName: string, file: File) => {
  const signedUrl = await getSignedUrl(fileName);

  try {
    await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
    return true;
  } catch (error) {
    console.log('uploadFile', error);
    return false;
  }
};
