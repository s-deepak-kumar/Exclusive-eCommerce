import { Product } from '@/utils/interfaces';
import { useEffect, useState } from 'react';

interface ProductsInterface {
  productsData: Product[] | null;
  isLoading: boolean;
  error: any | null;
}

const useProductData = ({limit=5, skip=0} : any): ProductsInterface => {
  const [productsData, setProductsData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/products?skip=${skip}&limit=${limit}`);
        const data = await response.json();
        setProductsData(data?.products);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { productsData, isLoading, error };
};

export default useProductData;
