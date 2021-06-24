import express from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  routes () {
    this.express.use(UserRoutes)
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(express.json())
  }
}

export default new App().express
