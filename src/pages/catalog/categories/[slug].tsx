import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import api from '@/services/api';

interface ICategory {
  id: string;
  title: string;
}

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  return (
    <div>
      <h1>{router.query.slug}</h1>

      {router.isFallback ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<ICategory[]>('categories');

  const categories = response.data;

  const paths = categories.map((category) => ({
    params: { slug: category.id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await api.get<IProduct[]>(`products?category_id=${slug}`);

  const products = response.data;

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
