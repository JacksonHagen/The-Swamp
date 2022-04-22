import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class PostsService {
  async getAll() {
    return await dbContext.Posts.find({}).populate("account", "name picture")
  }

  async getById(id) {
    const found = await dbContext.Posts.findById(id).populate("account", "name picture")
    if (!found) {
      throw new BadRequest('Unable to find that post')
    }
    return found
  }

  async create(body) {
    const newPost = await dbContext.Posts.create(body)
    newPost.populate("account", "name picture")
    return newPost
  }

  async edit(body) {
    const editedPost = await this.getById(body.id)
    if (editedPost.accountId.toString() !== body.accountId) {
      throw new Forbidden("User didn't make this post.")
    }
    editedPost.title = body.title || editedPost.title
    editedPost.body = body.body || editedPost.body
    editedPost.save()
    editedPost.populate("account", "name picture")
    return editedPost
  }

  async remove(id, userId) {
    const removed = await this.getById(id)
    if (removed.accountId.toString() !== userId) {
      throw new Forbidden("User didn't make this post.")
    }
    removed.remove()
    return removed
  }
}

export const postsService = new PostsService()
