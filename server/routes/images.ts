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

    let likes = (
      await table("likes").select(["image_id"]).find({ id: id })
    ).map((v: any) => v.image_id)

    let images = (
      await table("image")
        .select(["image_id", "name", "category", "price", "base64_url"])
        .find()
    ).map((v: any) => {
      return {
        ...v,
        liked: likes.includes(v.image_id),
      }
    })

    res.send({ images: images })
  } catch (e) {
    console.log(e)
  }
})

router.post("/toggle-like", async (req: any, res: any) => {
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

router.get("/image-ids", async (_req: any, res: any) => {
  try {
    const image_ids = await table("image").select(["image_id"]).find()

    res.send({ image_ids: image_ids })
  } catch (e) {
    console.log(e)
  }
})

router.get("/image/:image_id", async (req: any, res: any) => {
  try {
    const { image_id } = req.params

    const image = await table("image")
      .select(["name", "category", "price", "base64_url", "upload_date"])
      .findOne({ image_id: image_id })

    console.log(image)

    res.send({ image: image })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router

export {}
