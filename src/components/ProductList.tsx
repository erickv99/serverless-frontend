import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import { Button } from './ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import ProductListSkeleton from './ProductListSkeleton';

export default function ProductList() {
  const qProducts = useQuery({
    queryKey: ['getProducts'],
    queryFn: getProducts,
  });

  if (qProducts.isLoading) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="flex flex-col space-y-2">
      <h2>Products Available: {qProducts.data?.length ?? 0}</h2>
      <div className="grid grid-cols-3 gap-2">
        {qProducts.data?.map((product) => {
          return (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description} </CardDescription>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.title} />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">Add to cart</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
