const mongoose = require("mongoose")
const config = require("./config.json")
const url = `mongodb+srv://${config.user}:${config.password}@cluster0.laykg.mongodb.net/TodoList?retryWrites=true&w=majority`
mongoose.set("debug", true)

const TaskScheme = new mongoose.Schema({ title: String })
mongoose.model("Task", TaskScheme, "Task")
mongoose.model(
  "List",
  {
    title: String,
    tasks: [TaskScheme],
  },
  "List"
)

mongoose.connect(url)

module.exports = mongoose
