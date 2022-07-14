import { Request, Response, NextFunction } from "express"

interface RequestWithIsAuthenticated extends Request {
  isAuthenticated: any
}

module.exports = {
  // Middleware to ensure authentication
  ensureAuthenticated: function (
    req: RequestWithIsAuthenticated,
    _res: Response,
    next: NextFunction
  ) {
    if (req.isAuthenticated()) {
      return next()
    }
  },
  // Middleware not to ensure authentication
  forwardAuthenticated: function (
    req: RequestWithIsAuthenticated,
    _res: Response,
    next: NextFunction
  ) {
    if (!req.isAuthenticated()) {
      return next()
    }
  },
}

export {}
