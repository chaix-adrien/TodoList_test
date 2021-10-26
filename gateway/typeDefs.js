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
    createTask(title: String, listId: ID!): Task
    deleteTask(taskId: ID!): List
    deleteList(listId: ID!): Boolean
  }
`

module.exports = typeDefs
