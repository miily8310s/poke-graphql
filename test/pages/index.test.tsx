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
              number: '002',
              name: 'Ivysaur',
              image: 'https://img.pokemondb.net/artwork/ivysaur.jpg',
            },
            {
              number: '003',
              name: 'Venusaur',
              image: 'https://img.pokemondb.net/artwork/venusaur.jpg',
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
      expect(h1.children.join('')).toContain('Welcome to')

      // const p = component.root.findByType('p')
      const p = component.root.findAllByType('p')
      expect(p[0].children.join('')).toContain('001 Bulbasaur')
      expect(p[1].children.join('')).toContain('002 Ivysaur')
      expect(p[2].children.join('')).toContain('003 Venusaur')
    })
  })
  // TODO：snapshotは別の機会に書く
  // it('matches snapshot', () => {
  //   const { asFragment } = render(
  //     <ApolloProvider client={apolloClient}>
  //       <Home />
  //     </ApolloProvider>,
  //     {}
  //   )
  //   expect(asFragment()).toMatchSnapshot()
  // })
})
