const express = require("express")
const next = require("next")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const server = next({ dev })
const handle = server.getRequestHandler()
const mysql = require("mysql")

const db_config = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b1bc500c66092e",
  password: "e868a98a",
  database: "heroku_39f5874a1a20466",
}

server.prepare().then(() => {
  const app = express()

  let connection: any

  function handleDisconnect() {
    connection = mysql.createConnection(db_config) 
    // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err: any) {
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
    connection.on("error", function (err: any) {
      console.log("db error", err)
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        // Connection to the MySQL server is usually
        handleDisconnect() // lost due to either server restart, or a
      } else {
        // connnection idle timeout (the wait_timeout
        // server variable configures this)
        throw err
      }
    })
  }

  handleDisconnect()
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
