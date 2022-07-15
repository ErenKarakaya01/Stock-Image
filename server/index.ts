import path from "path"
import express from "express"
import next from "next"
import passport from "passport"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
/* const dotenv = require("dotenv")

dotenv.config({ path: "./config/config.env" }) */

const MemoryStore = require("memorystore")(session)

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const server = next({ dev })
const handle = server.getRequestHandler()

console.log("process.env.PORT is: " + process.env.PORT)
console.log("port is: " + port)
console.log("process.env.NODE_ENV : " + process.env.NODE_ENV)
console.log("dev: " + dev)


server.prepare().then(async () => {
  const app = express()
  console.log("eren1")
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
  console.log("eren2")
  // Passport middleware
  app.use(passport.initialize())
  app.use(passport.session())
  require("./config/passport")(passport)

  // Cookieparser middleware
  app.use(cookieParser())
  console.log("eren3")
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
  
  console.log("eren4")
  // Routes
  app.use("/users", require("./routes/users.ts"))
  app.use("/images", require("./routes/images.ts"))
  console.log("eren6")
  app.all("*", (req: any, res: any) => {
    return handle(req, res)
  })
  console.log("eren5")
  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})