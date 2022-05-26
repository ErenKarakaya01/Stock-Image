import table from "../database/table"

const express = require("express")
const router = express.Router()

const { ensureAuthenticated } = require("../config/auth")

// Upload image
router.post("/upload", ensureAuthenticated, async (req: any, res: any) => {
  try {
    const { name, category, price, base64_url, creator_id } = req.body
    const upload_date = new Date().toISOString().slice(0, 19).replace("T", " ")

    table("image").insertOne({
      creator_id: creator_id,
      name: name,
      category: category,
      price: price,
      base64_url: base64_url,
      upload_date: upload_date,
    })

    res.send({ wasUploaded: true })
  } catch (e) {
    console.log(e)
  }
})

router.get("/gallery/:id", ensureAuthenticated, async (req: any, res: any) => {
  try {
    const images = await table("image")
      .select([
        "base64_url",
        "category",
        "image_id",
        "name",
        "price",
        "upload_date",
      ])
      .find({ creator_id: req.params.id })

    res.send({ images })
  } catch (e) {
    console.log(e)
  }
})

router.get("/browse/:id", ensureAuthenticated, async (req: any, res: any) => {
  try {
    const { id } = req.params
    console.log(id)

    const images = await table("image").select(["image_id", "name", "category", "price", "base64_url"]).find({ 1: 1 })

    res.send({ images: images })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router

export {}
