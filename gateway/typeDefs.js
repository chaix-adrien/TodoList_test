const { gql } = require("apollo-server")

const typeDefs = gql`
  type Task {
    _id: String
    title: String
  }
  type List {
    _id: String
    title: String
    tasks: [Task]
  }
  type Query {
    lists: [List]
  }
  type Mutation {
    createList(title: String): List
    deleteList(listId: ID!): List
    createTask(title: String, listId: ID!): List
    deleteTask(taskId: ID!): List
  }
`

module.exports = typeDefs
