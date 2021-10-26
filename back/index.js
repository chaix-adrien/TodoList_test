const express = require("express")
var bodyParser = require("body-parser")

const app = express()
const port = require("./config.json").port
const routes = require("./routes")
require("./database")

app.use((req, res, next) => {
  setTimeout(next, (2 + Math.random()) * 1000)
})
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use(routes)

app.listen(port, () => {
  console.log(`REST Api database listening on http://localhost:${port}`)
})
