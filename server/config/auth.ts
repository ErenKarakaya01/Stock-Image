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
  },
  ensureCustomerAuthenticated: function (req: any, _res: any, next: any) {
    if (req.isAuthenticated() && req.user.type === "customer") {
      return next()
    }
  },
  ensureCreatorAuthenticated: function (req: any, _res: any, next: any) {
    if (req.isAuthenticated() && req.user.type === "creator") {
      return next()
    }
  },
}

export {}