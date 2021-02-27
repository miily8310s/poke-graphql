import React from 'react'
import { render } from '../testUtils'
import { Home } from '../../pages/index'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client'
import fetch from 'cross-fetch'

const URI_ENDPOINT = 'https://graphql-pokemon2.vercel.app/'
const cache = new InMemoryCache()

const createApollo = () => {
  return new ApolloClient({
    cache,
    link: new HttpLink({ uri: URI_ENDPOINT, fetch }),
  })
}

const apolloClient = createApollo()

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <ApolloProvider client={apolloClient}>
        <Home />
      </ApolloProvider>,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render loading state initially', () => {
    const { asFragment } = render(
      <ApolloProvider client={apolloClient}>
        <Home />
      </ApolloProvider>,
      {}
    )
    expect(asFragment().children[0].textContent).toContain('Loading')
  })
})
