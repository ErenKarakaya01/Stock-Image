import table from "server/database/table"

const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")
/* const { ensureAuthenticated } = require("../config/auth") */

// Get isAuthenticated
router.get("/isauthenticated", (req: any, res: any) => {
  res.send({ isAuthenticated: req.isAuthenticated() })
})

// Register
router.post("/register", (req: any, res: any) => {
  const { name, email, password, password2 } = req.body
  let errors: string[] = []

  // Checking the errors
  if (!name || !email || !password || !password2) {
    errors.push("Please enter all fields")
  }

  if (password != password2) {
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
    table("user").findOne({ email: email }).execute().then((users: any[]) => {
      let user = users[0]
      if (user) {
        errors.push("Email already exists")
        res.send({
          isRegistered: false,
          errors,
        })
      } else {
        const newUser = {
          // Creating new user
          name,
          email,
          password,
        }

        bcrypt.genSalt(10, (_err: any, salt: string) => {
          // Encrypting the password
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                res.send({
                  isRegistered: true,
                  errors,
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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.send({
        isLoggedIn: false,
        errors: ["Wrong password or email!"],
      })
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.send({ isLoggedIn: true, errors: [] })
    })
  })(req, res, next)
})

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout()
  res.end()
})

module.exports = router

export {}