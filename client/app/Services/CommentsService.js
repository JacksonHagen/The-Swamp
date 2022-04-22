/* eslint-disable no-self-assign */
import { api } from './AxiosService.js'
import { ProxyState } from '../AppState.js'
import { Comment } from '../Models/Comment.js'

class CommentsService {
  async remove(id) {
    await api.delete('api/comments' + id)
    ProxyState.comments = ProxyState.comments.filter(c => c.id !== id)
  }

  async edit(id, body) {
    const res = await api.put('api/comments' + id, body)
    const index = ProxyState.comments.findIndex(c => c.id === id)
    ProxyState.comments.splice(index, 1, res.data)
    ProxyState.comments = ProxyState.comments
  }

  async vote(id, newVote) {
    await api.post('api/comments' + id + this.vote, newVote)
    ProxyState.comments = ProxyState.comments
  }

  async getCommentsByPostId(postId) {
    const foundComments = await api.get('api/posts/' + postId + '/comments')
    console.log(foundComments.data)
    ProxyState.comments = foundComments.data.map(c => new Comment(c))
  }
}

export const commentsService = new CommentsService()
