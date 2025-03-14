import express from "express"

const router = express.Router()

router.get("/anothertest", (req, res) => {
  res.status(200).send("it works")
})

export default router