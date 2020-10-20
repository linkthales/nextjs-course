import Prismic from 'prismic-javascript';

export const apiEndpoint = process.env.PRISMIC_API_URL;

export const client = (req = null) => {
  const options = req ? { req } : null;

  return Prismic.client(apiEndpoint, options);
};
