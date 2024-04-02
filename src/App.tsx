import { useEffect, useState } from 'react';
import './App.css';
import { getProducts, getProductsById } from './queries/products';
import { twJoin } from 'tailwind-merge';

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
              {product.name}
            </li>
          );
        })}
      </ul>
      <div className="border-b-2"></div>
      <div className="flex justify-center">
        {isLoading && <div>Loading....</div>}
        {selectedProduct && !isLoading && (
          <div className="w-96">
            <img src={selectedProduct.image} />
            <div className="flex flex-col bg-slate-800 text-white">
              <h2>{selectedProduct.name}</h2>
              <h2>${selectedProduct.price}</h2>
            </div>
          </div>
        )}
      </div>
      {error && <div className="text-xl text-red-600">{error}</div>}
    </div>
  );
}

export default App;
