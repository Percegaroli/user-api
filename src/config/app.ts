import express, { Response as ExResponse, Request as ExRequest } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './openAPI/routes';

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.configureSwagger()
  }

  routes () {
    RegisterRoutes(this.express)
  }

  configureSwagger(){
    this.express.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import("./openAPI/swagger.json"))
      )
    })
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(express.json())
  }
}

export default new App().express
