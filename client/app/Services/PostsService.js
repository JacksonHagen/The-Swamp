import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async vote(postId, userVote) {
    const res = await api.post('api/posts/' + postId + '/vote', { userVote })
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

  async createPost(newPostData)
  {
    const res = await api.post("api/posts", newPostData);
    ProxyState.posts = [new Post(res.data), ...ProxyState.posts];
  }
}

export const postsService = new PostsService()
