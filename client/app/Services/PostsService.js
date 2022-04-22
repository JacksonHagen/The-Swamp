import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async upLayer(postId) {
    const res = await api.put('api/posts/' + postId, )
    logger.log(res.data)

  }

  downLayer(postId) {

  }

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p))
  }
}

export const postsService = new PostsService()
