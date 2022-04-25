import { ProxyState } from '../AppState.js'
import { Post } from '../Models/Post.js'
import { logger } from '../Utils/Logger.js'
import { api } from './AxiosService.js'

class PostsService {
  async edit(formData) {
    const post = ProxyState.activePost
    await api.put('api/posts/' + post.id, formData)
    post.title = formData.title
    post.imageUrl = formData.imageUrl
    post.body = formData.body
    const index = ProxyState.posts.findIndex(p => p.id === post.id)
    ProxyState.posts.splice(index, 1, post)
    // eslint-disable-next-line no-self-assign
    ProxyState.posts = ProxyState.posts
  }

  async remove(postId) {
    const res = await api.delete('api/posts/' + postId)
    logger.log(res.data)
    ProxyState.posts = ProxyState.posts.filter(p => p.id !== postId)
  }

  async vote(postId, userVote) {
    const res = await api.post('api/posts/' + postId + '/vote', { userVote })
    logger.log(res.data)
    const votedPost = await api.get('api/posts/' + postId)
    ProxyState.posts.find(post => post.id === postId).score = new Post(votedPost.data).score
    ProxyState.posts = ProxyState.posts
  }

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p)).sort((a, b) => (b.score - a.score))
  }

  setActivePost(postId) {
    ProxyState.activePost = ProxyState.posts.find(post => post.id === postId)
  }

  async createPost(newPostData) {
    const res = await api.post('api/posts', newPostData)
    ProxyState.posts = [new Post(res.data), ...ProxyState.posts]
  }
}

export const postsService = new PostsService()
