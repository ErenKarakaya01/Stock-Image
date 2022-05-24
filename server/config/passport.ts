import table from "../database/table"

const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")

module.exports = function (passport: any) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      (email: string, password: string, done: any) => {
        // Match user
        table("user")
          .findOne({
            email: email,
          })
          .then((user: any) => {
            if (!user) {
              return done(null, false, {
                message: "That email is not registered",
              })
            }

            // Match password
            bcrypt.compare(
              password,
              user.password,
              (err: any, isMatch: any) => {
                if (err) throw err
                if (isMatch) {
                  return done(null, user)
                } else {
                  return done(null, false, { message: "Password incorrect" })
                }
              }
            )
          })
      }
    )
  )

  passport.serializeUser(function (user: any, done: any) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id: any, done: any) {
    table("user")
      .findOne({ id: id })
      .then((user) => {
        console.log(user)
        done(null, user)
      })
  })
}
