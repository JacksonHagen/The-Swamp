import { AuthController } from './Controllers/AuthController.js'
import { UsersController } from './Controllers/UsersController.js'
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  usersController = new UsersController()
}

// @ts-ignore
window.app = new App()
