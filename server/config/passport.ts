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
      .select(["id", "name", "surname", "email", "created_at"])
      .findOne({ id: id })
      .then(async (user) => {
        interface LooseObject {
          [key: string]: any
        }

        let userObject: LooseObject = {
          ...user,
        }

        let customer = await table("customer").findOne({ id: id })

        if (customer) {
          userObject.type = "customer"
        } else {
          let creator = await table("creator").findOne({ id: id })

          userObject.type = "creator"
          userObject.balance = creator.balance
        }
        
        done(null, userObject)
      })
  })
}
