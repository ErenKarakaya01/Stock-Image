module.exports = {
  ensureAuthenticated: function (req: any, _res: any, next: any) {
    if (req.isAuthenticated()) {
      return next()
    }
  },
  forwardAuthenticated: function (req: any, _res: any, next: any) {
    if (!req.isAuthenticated()) {
      return next()
    }
  }
}

export {}