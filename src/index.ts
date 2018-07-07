import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import GameController from './games/controller'
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: [
     GameController
   ]
})

setupDb()
  .then(_ => {
    app.listen(port, () => console.log(`Opened a connection. Listening on port ${port}`))
  })
