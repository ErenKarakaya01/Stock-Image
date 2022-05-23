import path from "path"
import express from "express"
import next from "next"
import passport from "passport"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"

const MemoryStore = require("memorystore")(session)
const mysql = require("mysql2/promise")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const server = next({ dev })
const handle = server.getRequestHandler()

const db_config = {
  host: "localhost",
  user: "root",
  database: "DBMS",
}

server.prepare().then(async () => {
  const app = express()

  // Body parser middlewares
  app.use(express.json())
  app.use(express.urlencoded())

  app.use(express.static(path.join(__dirname, "public")))

  // Session middleware
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 },
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

  let connection: any

  const handleDisconnect = async () => {
    /* "mysql://ht8g9jqdwjgvijkn:slw5d31f56s7uoa7@i54jns50s3z6gbjt.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/lsunasu7vjaz9dy9" */
    connection = await mysql.createConnection(
      db_config
    )
    // Recreate the connection, since
    // the old one cannot be reused.

    await connection.connect((err: any) => {
      // The server is either down
      if (err) {
        // or restarting (takes a while sometimes).
        console.log("error when connecting to db:", err)
        setTimeout(handleDisconnect, 2000)
        // We introduce a delay before attempting to reconnect,
      } // to avoid a hot loop, and to allow our node script to
    })
    // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on("error", async () => {
      await handleDisconnect()
      console.log("Reconnected to ClearDB Database!")
    })
  }

  handleDisconnect().then(() => console.log("DB Connected!"))

  app.all("*", (req: any, res: any) => {
    return handle(req, res)
  })

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})

export {}
