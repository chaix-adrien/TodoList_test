const router = require("express").Router()
const db = require("../database")
const { ObjectId } = require("mongodb")

const Task = db.models.Task
const List = db.models.List

router.get("/", async (req, res) => {
  const lists = await List.find()
  return res.json(lists)
})

router.post("/", async (req, res) => {
  const newList = new List({ title: req.body.title })
  newList.save(function (err) {
    if (err) return res.status(400).json(err)
    return res.json(newList)
  })
})

router.delete("/:listId", async (req, res) => {
  try {
    await List.findByIdAndDelete(ObjectId(req.params.listId))
  } catch (e) {
    return res.status(400).json({ error: "invalid listId" })
  }
  return res.json(true)
})

module.exports = router
