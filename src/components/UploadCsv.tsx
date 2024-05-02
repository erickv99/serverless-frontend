import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../api';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
export default function UploadCsv() {
  const mUpload = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      // Invalidate and refetch
      //   queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const fileUploadHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.includes('csv')) {
      return;
    }
    console.log(file);
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      products: { value: File };
    };
    const file = target.products.value;
    mUpload.mutate({
      fileName: file.name,
      file,
    });
  };

  return (
    <div className="border py-2">
      <h2>Upload your CSV</h2>
      <form
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
        <Button type="submit" disabled={mUpload.isPending}>
          {mUpload.isPending && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Upload
        </Button>
      </form>
    </div>
  );
}
