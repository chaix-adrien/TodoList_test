const router = require("express").Router()
const db = require("../database")
const { ObjectId } = require("mongodb")
const List = db.models.List
const Task = db.models.Task

router.post("/", async (req, res) => {
  try {
    const list = await List.findById(ObjectId(req.body.listId))
    if (!list) res.status(400).json({ error: "invalid ListId" })
    if (!list.tasks) list.tasks = []
    list.tasks.push({ title: req.body.title })
    list.save(function (err) {
      if (err) return res.status(400).json(err)
      return res.json(list.tasks[list.tasks.length - 1])
    })
  } catch (e) {
    res.status(400).json({ error: "invalid ListId" })
  }
})

router.delete("/:taskId", async (req, res) => {
  try {
    const taskId = ObjectId(req.params.taskId)
    const list = (await List.find()).find((l) => l.tasks.id(taskId))
    if (!list) return res.status(400).json({ error: "invalid taskId" })
    list.tasks.id(taskId).remove()
    return list.save(function (err) {
      if (err) return res.status(400).json(err)
      return res.json(list)
    })
  } catch (e) {
    return res.status(400).json({ error: e })
  }
})

module.exports = router
