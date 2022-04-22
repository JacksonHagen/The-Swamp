import { dbContext } from '../db/DbContext.js'
import { BadRequest } from '../utils/Errors.js'

class PostsService {
  async getAll() {
    return await dbContext.Posts.find({})
  }

  async getById(id) {
    const found = await dbContext.Posts.findById(id)
    if (!found) {
      throw new BadRequest('Unable to find that post')
    }
    return found
  }

  async create(body) {
    const newPost = await dbContext.Posts.create(body)
    return newPost
  }

  async edit(body) {
    const editedPost = this.getById(body.id)
    if(editedPost.accountId.toString())
  }

  async remove(id) {
    throw new Error('Method not implemented.')
  }
}

export const postsService = new PostsService()
