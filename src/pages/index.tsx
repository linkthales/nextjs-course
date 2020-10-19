import { useCallback } from 'react';
import { GetServerSideProps } from 'next';

import SEO from '@/components/SEO';

import api from '@/services/api';

import { Title } from '@/styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  const handleSum = useCallback(async () => {
    const {
      default: { sum },
    } = await import('@/lib/math');

    sum(3, 2);
  }, []);

  return (
    <div>
      <SEO
        title="DevCommerce, your best e-commerce!"
        image="boost.png"
        shouldExcludeTitleSuffix
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await api.get<IProduct[]>('recommended');

  const recommendedProducts = response.data;

  return {
    props: {
      recommendedProducts,
    },
  };
};
