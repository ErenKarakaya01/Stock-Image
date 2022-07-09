const mysql = require("mysql")
const util = require("util")

/* const db_config = {
  host: "localhost",
  user: "root",
  database: "deneme",
} */

let connection: any = mysql.createConnection(
  "mysql://b7c317a6536a15:e01681c5@eu-cdbr-west-03.cleardb.net/heroku_fb154a1c8e2c548?reconnect=true"
)

const query = util.promisify(connection.query).bind(connection)

const handleDisconnect = async () => {
  connection = await mysql.createConnection(
    "mysql://b7c317a6536a15:e01681c5@eu-cdbr-west-03.cleardb.net/heroku_fb154a1c8e2c548?reconnect=true"
  )

  await connection.connect((err: any) => {
    if (err) {
      console.log("An error occurred when connecting to DB:", err)
      setTimeout(handleDisconnect, 2000)
    }
  })
  /* connection.on("error", async () => {
    await handleDisconnect()
    console.log("Reconnected to ClearDB Database!")
  }) */
}

handleDisconnect().then(async () => {
  console.log("DB Connected!")

  setInterval(async () => {
    query("SELECT 1").then(() => {
      console.log("Request was sent to ClearDB...")
    })
  }, 5000)

  // Setting limits for sizes of images
  /* await query("SET GLOBAL net_buffer_length=1000000;")
  await query("SET GLOBAL max_allowed_packet=1000000000;") */

  // Creating database tables
  await query(
    "CREATE TABLE IF NOT EXISTS USER(created_at DATETIME NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password TEXT NOT NULL, id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (id));"
  )

  await query(
    "CREATE TABLE IF NOT EXISTS CUSTOMER (id INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (id) REFERENCES USER(id) ON DELETE CASCADE);"
  )

  await query(
    "CREATE TABLE IF NOT EXISTS CREATOR(id INT NOT NULL, balance FLOAT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (id) REFERENCES USER(id) ON DELETE CASCADE);"
  )

  await query(
    "CREATE TABLE IF NOT EXISTS IMAGE(image_id INT NOT NULL AUTO_INCREMENT, price FLOAT NOT NULL, category VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, upload_date DATETIME NOT NULL, base64_url MEDIUMTEXT NOT NULL, creator_id INT NOT NULL, PRIMARY KEY (image_id), FOREIGN KEY (creator_id) REFERENCES CREATOR(id) ON DELETE CASCADE);"
  )

  await query(
    "CREATE TABLE IF NOT EXISTS TRADING(trade_date DATETIME NOT NULL, customer_id INT NOT NULL, creator_id INT NOT NULL, image_id INT NOT NULL, PRIMARY KEY (customer_id, creator_id, image_id), FOREIGN KEY (customer_id) REFERENCES CUSTOMER(id) ON DELETE CASCADE, FOREIGN KEY (creator_id) REFERENCES CREATOR(id) ON DELETE CASCADE, FOREIGN KEY (image_id) REFERENCES IMAGE(image_id) ON DELETE CASCADE);"
  )

  await query(
    "CREATE TABLE IF NOT EXISTS likes(id INT NOT NULL AUTO_INCREMENT, image_id INT NOT NULL, PRIMARY KEY (id, image_id), FOREIGN KEY (id) REFERENCES CUSTOMER(id) ON DELETE CASCADE, FOREIGN KEY (image_id) REFERENCES IMAGE(image_id) ON DELETE CASCADE);"
  )

  console.log("DB was set up!")
})

module.exports = query

export default query
