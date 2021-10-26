import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import App from "../src/App"

const client = new ApolloClient({
  uri: `http://localhost:${4000}`,
  cache: new InMemoryCache(),
})

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <main>
          <App />
        </main>

        <style jsx>{`
          .container {
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            height: 100vh;
            overflow: auto;
            background-image: url("https://www.bretagne-conseil.fr/wp-content/uploads/revslider/splash-creative-light-02-animated/Splash-Creative-Dark-Slider-Background.jpg");
            background-position: top;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          main {
            height: 100%;
            width: 100%;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </ApolloProvider>
  )
}
