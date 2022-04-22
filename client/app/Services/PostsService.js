import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async upVote(postId) {
    const res = await api.post('api/posts/' + postId + '/vote', { upvoted: true })
    logger.log(res.data)
  }

  async downVote(postId) {
    const res = await api.post('api/posts/' + postId + '/vote', { upvoted: true })
    logger.log(res.data)
  }

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  setActivePost(postId) {
    ProxyState.activePost = ProxyState.posts.find(post => post.postId === postId)
  }
}

export const postsService = new PostsService()
