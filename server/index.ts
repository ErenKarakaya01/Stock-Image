const express = require("express")
const next = require("next")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const server = next({ dev })
const handle = server.getRequestHandler()
const mysql = require("mysql")

/* const db_config = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b1bc500c66092e",
  password: "e868a98a",
  database: "heroku_39f5874a1a20466",
} */

server.prepare().then(async () => {
  const app = express()

  // Body parser middlewares
  app.use(express.json())
  app.use(express.urlencoded())

  let connection: any

  const handleDisconnect = async () => {
    connection = await mysql.createConnection("mysql://ht8g9jqdwjgvijkn:slw5d31f56s7uoa7@i54jns50s3z6gbjt.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/lsunasu7vjaz9dy9") 
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

  await handleDisconnect()

  connection.query("select 1", (err: string, rows: object[]) => {
    if (err) throw err
    console.log(rows)
  })

  app.all("*", (req: any, res: any) => {
    return handle(req, res)
  })

  app.listen(port, (err: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

export {}
