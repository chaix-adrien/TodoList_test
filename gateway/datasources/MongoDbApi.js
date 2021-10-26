const { RESTDataSource } = require("apollo-datasource-rest")
const port = require("../../back/config.json").port
class MongoDbApi extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = `http://localhost:${port}/`
  }
  async getAllLists() {
    return await this.get("list")
  }
  async createTask(toCreate) {
    return await this.post("task", toCreate)
  }
  async createList(toCreate) {
    return await this.post("list", toCreate)
  }
  async deleteTask(taskId) {
    return await this.delete(`task/${taskId}`)
  }
  async deleteList(listId) {
    return await this.delete(`list/${listId}`)
  }
}

module.exports = MongoDbApi
