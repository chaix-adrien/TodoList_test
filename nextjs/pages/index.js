import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  uri: `http://localhost:${4000}`,
  cache: new InMemoryCache(),
})
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <main></main>

        <style jsx>{`
          .container {
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </ApolloProvider>
  )
}
