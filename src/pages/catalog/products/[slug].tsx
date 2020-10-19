import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useCallback } from 'react';

const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Loading...</p>, ssr: false }
);

export default function Product() {
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const router = useRouter();

  const handleAddToCart = useCallback(() => {
    setIsAddToCartModalVisible(true);
  }, []);

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}
