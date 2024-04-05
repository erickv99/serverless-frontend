import { useEffect, useState } from 'react';
import './App.css';
import { getProducts, getProductsById } from './queries/products';
import { twJoin } from 'tailwind-merge';
import { uploadFile } from './mutations/upload';

function App() {
  const [productList, setProductList] = useState<Array<Product>>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const products = await getProducts();
      setProductList(products);
    })();
  }, []);

  const selectProductHandler = async (productId: number) => {
    try {
      setIsLoading(true);
      const product = await getProductsById(productId);
      setSelectedProduct(product);
      setError(undefined);
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const fileUploadHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target.files?.[0];

    if (!file) {
      return;
    }

    console.log(file.name);

    const response = await uploadFile(file.name, file);
    if (response) {
      alert('File upload: success');
    } else {
      setError('Error uploading file');
    }
  };

  return (
    <div className="flex flex-col container space-y-2">
      <h1 className="text-3xl font-bold underline text-red-400">
        Hello world!
      </h1>
      <ul className="flex flex-col space-y-2">
        {productList.map((product) => {
          return (
            <li
              key={product.id}
              className={twJoin(
                'hover:underline cursor-pointer',
                selectedProduct?.id === product.id ? 'underline' : ''
              )}
              onClick={() => {
                selectProductHandler(product.id);
              }}
            >
              {product.title}
            </li>
          );
        })}
      </ul>
      <div className="border-b-2"></div>
      <div className="flex justify-center">
        {isLoading && (
          <div className="animate-pulse w-96 flex flex-col bg-slate-800 text-white">
            Loading....
          </div>
        )}
        {selectedProduct && !isLoading && (
          <div className="w-96">
            <div className="flex flex-col bg-slate-800 text-white">
              <h2>Name: {selectedProduct.title}</h2>
              <h2>Price: ${selectedProduct.price}</h2>
              <h2>Count: {selectedProduct.count ?? 0}</h2>
            </div>
          </div>
        )}
      </div>
      {error && <div className="text-xl text-red-600">{error}</div>}
      <div className="border py-2">
        <h2>Upload your CSV</h2>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="product">Product file</label>
          <input
            type="file"
            name="product"
            id="product"
            multiple={false}
            onChange={fileUploadHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
