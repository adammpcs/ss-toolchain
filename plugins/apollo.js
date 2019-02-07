import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';
import { InMemoryCache } from 'apollo-cache-inmemory';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

export default function () {
  return {
    cache,
    httpEndpoint: "https://graphql.datocms.com",
    getAuth     : () => `Bearer ${process.env.API_TOKEN}`
  };
}