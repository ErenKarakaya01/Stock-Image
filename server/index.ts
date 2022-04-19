const express = require('express')
const next = require('next')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const server = next({ dev })
const handle = server.getRequestHandler()

server.prepare().then(() => {
  const app = express()

  app.all('*', (req: any, res: any) => {
    return handle(req, res)
  })

  app.listen(port, (err: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

export {}