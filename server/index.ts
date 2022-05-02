const express = require("express")
const next = require("next")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== "production"
const server = next({ dev })
const handle = server.getRequestHandler()
const mysql = require("mysql")

const db_config = {
  host: "eu-cdbr-west-02.cleardb.net",
  user: "bd57c0dda4db27",
  password: "43d943f3",
  database: "heroku_19042e25087c122",
}

server.prepare().then(() => {
  const app = express()

  let db = mysql.createConnection(db_config)
  /* db.on("connection", function (connection: any) {
    console.log("Connected to ClearDB!")

    connection.on("error", function (err: any) {
      console.error(new Date(), "MySQL error", err.code)
    })
    connection.on("close", function (err: any) {
      console.error(new Date(), "MySQL close", err)
    })
  })
  db.query("select 1", (err: string, rows: object[]) => {
    if (err) throw err
    console.log(rows)
  }) */

  db.connect((err: any) => {
    if (err) throw err

    console.log("Connected to ClearDB!")
    
    setInterval(function () {
      db.query("SELECT 1", (err: any, rows: object[]) => {
        if (err) throw err
        console.log(rows)
      })
    }, 5000)
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
