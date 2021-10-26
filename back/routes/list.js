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
  newList.save(async function (err) {
    if (err) return res.status(400).json(err)
    return res.json(newList)
  })
})

router.delete("/:listId", async (req, res) => {
  try {
    const list = await List.findById(ObjectId(req.params.listId))
    if (!list) throw "not found"
    await list.delete()
    return res.json(list)
  } catch (e) {
    return res.status(400).json({ error: "invalid listId" })
  }
})

module.exports = router
