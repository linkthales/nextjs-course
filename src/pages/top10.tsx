import { GetStaticProps } from 'next';

import api from '@/services/api';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

export default function Top10({ products }: Top10Props) {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await api.get<IProduct[]>('products');

  const products = response.data;

  return {
    props: {
      products,
    },
    revalidate: 5,
  };
};
