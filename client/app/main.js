import { AuthController } from './Controllers/AuthController.js'
import { PostsController } from './Controllers/PostsController.js'
import { UsersController } from './Controllers/UsersController.js'
import { ValuesController } from './Controllers/ValuesController.js'

class App {
  authController = new AuthController();
  valuesController = new ValuesController();
  usersController = new UsersController();
  postsController = new PostsController()
}

// @ts-ignore
window.app = new App()
