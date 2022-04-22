import { ProxyState } from '../AppState.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let template = ''
  // eslint-disable-next-line no-return-assign
  ProxyState.posts.forEach(p => template += p.Template)
  document.getElementById('posts').innerHTML = template
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    _drawPosts()
  }

  async getAllPosts() {
    try {
      await postsService.getAllPosts()
    } catch (error) {
      logger.error(error)
    }
  }

  async upLayer(postId) {
    try {
      await postsService.upLayer(postId)
    } catch (error) {
      logger.error(error)
    }
  }

  async downLayer(postId) {
    try {
      await postsService.downLayer(postId)
    } catch (error) {
      logger.error(error)
    }
  }
}
