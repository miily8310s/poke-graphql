import React from 'react'
import { Home, GetPokemonQuery } from '../../pages/index'
import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { waitFor } from '@testing-library/react'

describe('Home page', () => {
  it('renders without error', () => {
    const mocks = []
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )
    const tree = component.toJSON()
    expect(tree.children).toContain('Loading')
  })

  it('should render pokemons', async () => {
    const pokemonMock = {
      request: {
        query: GetPokemonQuery,
      },
      result: {
        data: {
          pokemons: [
            {
              number: '001',
              name: 'Bulbasaur',
              image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
            },
            {
              number: '001',
              name: 'Bulbasaur',
              image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
            },
            {
              number: '001',
              name: 'Bulbasaur',
              image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
            },
          ],
        },
      },
    }

    const component = TestRenderer.create(
      <MockedProvider mocks={[pokemonMock]} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    await waitFor(() => {
      const h1 = component.root.findByType('h1')
      const p = component.root.findByType('p')
      expect(h1.children.join('')).toContain('Welcome to')
      expect(p.children.join('')).toContain('001 Bulbasaur')
    })
  })
})
// it('matches snapshot', () => {
//   const { asFragment } = render(
//     <ApolloProvider client={apolloClient}>
//       <Home />
//     </ApolloProvider>,
//     {}
//   )
//   expect(asFragment()).toMatchSnapshot()
// })

// it('should render loading state initially', () => {
//   const { asFragment } = render(
//     <ApolloProvider client={apolloClient}>
//       <Home />
//     </ApolloProvider>,
//     {}
//   )
//   expect(asFragment().children[0].textContent).toContain('Loading')
// })
