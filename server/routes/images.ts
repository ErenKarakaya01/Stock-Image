import table from "../database/table"

const express = require("express")
const router = express.Router()

const { ensureAuthenticated } = require("../config/auth")

// Upload image
router.post("/upload", ensureAuthenticated, async (req: any, res: any) => {
  try {
    const { name, category, price, base64_url, creator_id } = req.body
    const date: Date = new Date()
    const upload_date: string =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2)

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

    const image = await table("image").findOne({ image_id: image_id })

    res.send({ image: image })
  } catch (e) {
    console.log(e)
  }
})

router.post("/buy", async (req: any, res: any) => {
  try {
    const { customer_id, creator_id, image_id, price } = req.body

    const date: Date = new Date()
    const trade_date =
      date.getUTCFullYear() +
      "-" +
      ("00" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getUTCDate()).slice(-2) +
      " " +
      ("00" + date.getUTCHours()).slice(-2) +
      ":" +
      ("00" + date.getUTCMinutes()).slice(-2) +
      ":" +
      ("00" + date.getUTCSeconds()).slice(-2)

    await table("creator").updateOne(
      { id: creator_id },
      { balance: `balance + ${price}` }
    )

    await table("trading").insertOne({
      trade_date: trade_date,
      customer_id: customer_id,
      creator_id: creator_id,
      image_id: image_id,
    })

    res.send({ wasBought: true })
  } catch (e) {
    console.log(e)
  }
})

/*  SELECT trading.customer_id, trading.trade_date, image.price FROM trading 
      LEFT JOIN image ON trading.image_id = image.image_id 
      WHERE trading.creator_id = 7; */
router.get("/trades/:id", ensureAuthenticated, async (req: any, res: any) => {
  const { id } = req.params

  const whereColumn: string =
    req.user.type === "customer" ? "trading.customer_id" : "trading.creator_id"

  let trades = await table("trading")
    .select([
      "trading.trade_date",
      "customer.name AS customer",
      "creator.name AS creator",
      "trading.image_id",
      "image.price",
      "image.category",
      "image.name",
      "image.upload_date",
      "image.base64_url",
    ])
    .leftJoin({ "trading.image_id": "image.image_id" }, "image")
    .innerJoin({ "customer.id": "trading.customer_id" }, "user AS customer")
    .innerJoin({ "creator.id": "trading.creator_id" }, "user AS creator")
    .where({ [whereColumn]: id })
    .find()

  res.send({ trades: trades })
})

module.exports = router

export {}
