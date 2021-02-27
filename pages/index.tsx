import Head from 'next/head'
import Image from 'next/image'
import { gql, useQuery } from '@apollo/client'

interface Pokemon {
  number: number
  name: string
  image: string
}

export const Home = (): JSX.Element => {
  const GetPokemonQuery = gql`
    query {
      pokemons(first: 9) {
        number
        name
        image
      }
    }
  `
  const { loading, error, data } = useQuery(GetPokemonQuery)

  if (loading) return <p>Loading</p>
  if (error)
    return (
      <p>
        Error!!!
        <br />
        {error.message}
      </p>
    )
  if (!data) return <p>Loading</p>

  return (
    <>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <p className="description">
            Get started by editing <code>pages/index.tsx</code>
          </p>
          <div className="grid">
            {data.pokemons.map((pokemon: Pokemon, index: number) => (
              <div key={index} className="card">
                <img src={pokemon.image} alt={pokemon.name} />
                <p>
                  {pokemon.number} {pokemon.name}
                </p>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              height={'32'}
              width={'64'}
            />
          </a>
        </footer>

        <style jsx>{`
          .grid {
            display: grid;
            grid-template-columns: 33% 33% 33%;
            margin-top: 20px;
            margin-left: 20px;
          }
          .card {
            display: flex;
            justify-content: center;
            border: 1px solid rgba(96, 165, 250);
            border-radius: 5%;
            margin-right: 20px;
            margin-bottom: 20px;
            padding: 15px 0;
          }
          .card img {
            width: 50%;
            background-color: rgba(147, 197, 253);
          }
          .card p {
            text-align: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              // flex-direction: column;
              grid-template-columns: 100%;
            }
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  )
}

export default Home
