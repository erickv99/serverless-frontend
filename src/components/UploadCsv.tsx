import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../api';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useToast } from './ui/use-toast';
export default function UploadCsv() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const mUpload = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      toast({
        title: 'Products uploaded',
      });
    },
    onError: (error: any) => {
      let description = 'Something went wrong';
      if (error.status === 401 || error.status === 403) {
        console.error(error);
        description = 'Unauthorized';
      }
      toast({
        title: 'Error!',
        description,
      });
    },
  });

  const fileUploadHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target.files?.[0];

    if (!file || !file.type.includes('csv')) {
      setFile(null);
      return;
    }

    setFile(file);
  };

  const submitHandler = () => {
    if (!file) {
      return;
    }
    mUpload.mutate({
      fileName: file.name,
      file,
    });
  };

  return (
    <div className="border py-2">
      <h2>Upload your CSV</h2>
      <div
        className="flex flex-col justify-center items-center"
        onSubmit={submitHandler}
      >
        <label htmlFor="products">Product file</label>
        <input
          type="file"
          name="products"
          id="products"
          accept="text/csv"
          multiple={false}
          onChange={fileUploadHandler}
        />
        <Button
          type="button"
          onClick={submitHandler}
          disabled={mUpload.isPending}
        >
          {mUpload.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Upload
        </Button>
      </div>
    </div>
  );
}
