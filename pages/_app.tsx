import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const URI_ENDPOINT = 'https://graphql-pokemon2.vercel.app/'
const cache = new InMemoryCache()

const createApollo = () => {
  return new ApolloClient({
    cache,
    uri: URI_ENDPOINT,
  })
}

export default function App({ Component, pageProps }) {
  const apolloClient = createApollo()

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
