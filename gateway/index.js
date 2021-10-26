const { ApolloServer } = require("apollo-server")
const resolvers = require("./resolver")
const typeDefs = require("./typeDefs")
const MongoDbApi = require("./datasources/MongoDbApi")
const port = require("./config.json").port

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { mongo: new MongoDbApi() }
  },
})

server.listen({ port }).then(({ url }) => console.log(`Appollo gateway API ready at ${url}`))
