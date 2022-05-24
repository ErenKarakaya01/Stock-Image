import table from "../database/table"

const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")

/* const { forwardAuthenticated } = require("../config/auth") */

// Get isAuthenticated
router.get("/isauthenticated", (req: any, res: any) => {
  console.log(req.user)
  res.send({ isAuthenticated: req.isAuthenticated() })
})

/* // Get user info
router.get("/getuser", ensureAuthenticated, (req: any, res: any) => {

}) */

// Register
router.post("/register", (req: any, res: any) => {
  const { name, surname, email, password, confirmPassword, type } = req.body
  let errors: string[] = []

  // Checking the errors
  if (!name || !email || !password || !confirmPassword) {
    errors.push("Please enter all fields")
  }

  if (password != confirmPassword) {
    errors.push("Passwords do not match")
  }

  if (password === undefined || password.length < 6) {
    errors.push("Password must be at least 6 characters")
  }

  if (errors.length > 0) {
    res.send({
      isRegistered: false,
      errors,
    })
  } else {
    table("user")
      .findOne({ email: email })
      .then((user: any) => {
        if (user) {
          errors.push("Email already exists")
          res.send({
            isRegistered: false,
            errors,
          })
        } else {
          const created_at = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")

          // Creating new user
          const newUser = {
            name,
            surname,
            email,
            password,
            created_at,
          }

          bcrypt.genSalt(10, (_err: any, salt: string) => {
            // Encrypting the password
            bcrypt.hash(newUser.password, salt, (err: any, hash: string) => {
              if (err) throw err
              newUser.password = hash
              table("user")
                .insertOne(newUser)
                .then((_) => {
                  table("user")
                    .findOne({ email: email })
                    .then(({ id }) => {
                      if (type === "customer") {
                        table("customer").insertOne({ id: id })
                      } else {
                        table("creator").insertOne({ id: id, balance: 0 })
                      }

                      res.sendStatus(200)
                    })
                })
                .catch((err) => console.log(err))
            })
          })
        }
      })
  }
})

// Login
router.post("/login", (req: any, res: any, next: any) => {
  passport.authenticate("local", (err: any, user: any, _info: any) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.send({
        isLoggedIn: false,
        errors: ["Wrong password or email!"],
      })
    }

    req.logIn(user, (err: any) => {
      if (err) {
        return next(err)
      }
      return res.send({ isLoggedIn: true, errors: [] })
    })
  })(req, res, next)
})

// Logout
router.get("/logout", (req: any, res: any) => {
  req.logout()
  res.end()
})

module.exports = router

export {}
