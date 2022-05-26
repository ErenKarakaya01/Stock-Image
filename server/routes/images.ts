import table from "../database/table"

const express = require("express")
const router = express.Router()

const { ensureAuthenticated } = require("../config/auth")

// Upload image
router.post("/upload", ensureAuthenticated, async (req: any, res: any) => {
  try {
    const { name, category, price, base64_url, creator_id } = req.body
    const upload_date = new Date().toISOString().slice(0, 19).replace("T", " ")

    await table("image").insertOne({
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

    let likes = (
      await table("likes").select(["image_id"]).find({ id: id })
    ).map((v: any) => v.image_id)

    let images = (await table("image")
      .select(["image_id", "name", "category", "price", "base64_url"])
      .find()).map((v: any) => {
        return {
          ...v,
          liked: likes.includes(v.image_id)
        }
      })

    console.log(likes)

    res.send({ images: images })
  } catch (e) {
    console.log(e)
  }
})

router.post("/toggle_like", async (req: any, res: any) => {
  try {
    const { id, image_id } = req.body

    const liked = await table("likes").findOne({ id: id, image_id: image_id })

    if (liked) await table("likes").deleteOne({ id: id, image_id: image_id })
    else await table("likes").insertOne({ id: id, image_id: image_id })

    res.send({ isToggled: true })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router

export {}
