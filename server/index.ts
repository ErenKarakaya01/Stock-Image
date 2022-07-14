import path from "path"
import express from "express"
import next from "next"
import passport from "passport"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import { ConnectingAirportsOutlined } from "@mui/icons-material"
const dotenv = require("dotenv")

dotenv.config()

const MemoryStore = require("memorystore")(session)

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const server = next({ dev })
const handle = server.getRequestHandler()

console.log(process.env.PORT)

server.prepare().then(async () => {
  const app = express()

  // Body parser middlewares
  app.use(express.json({ limit: "50mb" }))
  app.use(express.urlencoded({ extended: false, limit: "50mb" }))

  app.use(express.static(path.join(__dirname, "public")))

  // Session middleware
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  )

  // Passport middleware
  app.use(passport.initialize())
  app.use(passport.session())
  require("./config/passport")(passport)

  // Cookieparser middleware
  app.use(cookieParser())

  // CORS middleware
  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
  })
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  )
  

  // Routes
  app.use("/users", require("./routes/users.ts"))
  app.use("/images", require("./routes/images.ts"))

  app.all("*", (req: any, res: any) => {
    return handle(req, res)
  })

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

export {}
