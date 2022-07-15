console.log("eren8")
import table from "../database/table"
import { Request, Response, NextFunction } from "express"

const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth")

interface RequestBodyObject {
  [key: string]: string
}

// Get isAuthenticated
router.get("/isauthenticated", (req: Request, res: Response) => {
  res.send({ isAuthenticated: req.isAuthenticated() })
})
console.log("eren9")

// Get user info
router.get(
  "/getuser",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    res.send({ user: req.user })
  }
)

interface NewUser {
  name: string
  surname: string
  email: string
  password: string
  created_at: string
}

interface User extends NewUser {
  id: number
}
console.log("eren10")
// Register
router.post(
  "/register",
  forwardAuthenticated,
  (req: Request, res: Response) => {
    const {
      name,
      surname,
      email,
      password,
      confirmPassword,
      type,
    }: RequestBodyObject = req.body

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
        .then((user: User) => {
          if (user) {
            errors.push("Email already exists")
            res.send({
              isRegistered: false,
              errors,
            })
          } else {
            const created_at: string = new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " ")

            // Creating new user
            const newUser: NewUser = {
              name,
              surname,
              email,
              password,
              created_at,
            }

            bcrypt.genSalt(10, (_err: Error, salt: string) => {
              // Encrypting the password
              bcrypt.hash(
                newUser.password,
                salt,
                (err: Error, hash: string) => {
                  if (err) throw err

                  newUser.password = hash

                  table("user")
                    .insertOne(newUser)
                    .then((_) => {
                      table("user")
                        .findOne({ email: email })
                        .then(({ id }: { id: number }) => {
                          if (type === "customer") {
                            table("customer").insertOne({ id: id })
                          } else {
                            table("creator").insertOne({ id: id, balance: 0 })
                          }

                          res.send({ isRegistered: true, errors })
                        })
                    })
                    .catch((err: Error) => console.log(err))
                }
              )
            })
          }
        })
    }
  }
)

interface UserToLogin {
  id: number
  name: string
  surname: string
  email: string
  created_at: Date
  type: string
  balance?: number
}
console.log("eren11")
// Login
router.post(
  "/login",
  forwardAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err: Error, user: UserToLogin, _info: any) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.send({
          isLoggedIn: false,
          errors: ["Wrong password or email!"],
        })
      }

      req.logIn(user, (err: Error) => {
        if (err) {
          return next(err)
        }
        return res.send({ isLoggedIn: true, errors: [] })
      })
    })(req, res, next)
  }
)

interface RequestWithLogout extends Request {
  logout: any
}

// Logout
router.get(
  "/logout",
  ensureAuthenticated,
  (req: RequestWithLogout, res: Response, next: NextFunction) => {
    req.logout((err: any) => {
      if (err) {
        return next(err)
      }
    })
    res.send({ isLoggedOut: true })
  }
)

module.exports = router