const mysql = require("mysql")
const util = require("util")

const db_config = {
  host: "localhost",
  user: "root",
  database: "dbms_eren_aysegul"
}

let connection: any

let query: any

const handleDisconnect = async () => {
  /* let conString = "mysql://ht8g9jqdwjgvijkn:slw5d31f56s7uoa7@i54jns50s3z6gbjt.chr7pe7iynqr.eu-west-1.rds.amazonaws.com:3306/lsunasu7vjaz9dy9" */
  connection = await mysql.createConnection(db_config)
  query = await util.promisify(connection.query).bind(connection)

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

handleDisconnect().then(() => {
  console.log("DB Connected!")
})

module.exports = query

export {}
