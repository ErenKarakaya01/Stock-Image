import { Request, Response, NextFunction } from "express"

module.exports = {
  // Middleware to ensure authentication
  ensureAuthenticated: function (
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    if (req.isAuthenticated()) {
      return next()
    }
  },
  // Middleware not to ensure authentication
  forwardAuthenticated: function (
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    if (!req.isAuthenticated()) {
      return next()
    }
  },
}

export {}
