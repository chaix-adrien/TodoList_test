const { param } = require("../back/routes")
const api = require("./datasources/MongoDbApi")
const resolvers = {
  Query: {
    lists: async (_, __, { dataSources }) => {
      return dataSources.mongo.getAllLists()
    },
  },
  Mutation: {
    createList: async (_, { title }, { dataSources }) => {
      return await dataSources.mongo.createList({ title })
    },
    createTask: async (_, { title, listId }, { dataSources }) => {
      return await dataSources.mongo.createTask({ title, listId })
    },
    deleteTask: async (_, { taskId }, { dataSources }) => {
      return await dataSources.mongo.deleteTask(taskId)
    },
    deleteList: async (_, { listId }, { dataSources }) => {
      return await dataSources.mongo.deleteList(listId)
    },
  },
}

module.exports = resolvers
