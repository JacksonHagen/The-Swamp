import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class CommentsService {
  async create(body) {
    return await dbContext.Comments.create(body).populate("account", "name picture")
  }

  async edit(update) {
    const original = await dbContext.Comments.findById(update.id)
    if (!original) {
      throw new BadRequest('No comment with that ID was found')
    }
    if (original.accountId.toString() !== update.accountId) {
      throw new Forbidden('What are you doing in me swamp!?')
    }
    original.body = update.body
    original.save()
    original.populate("account", "name picture").populate("upvotes downvotes")
    return original
  }

  async remove(id, accountId) {
    const comment = await dbContext.Comments.findById(id)
    if (!comment) {
      throw new BadRequest('No comment with that ID was found.')
    }
    if (comment.accountId.toString() !== accountId) {
      throw new Forbidden('What are you doing in me swamp!?')
    }
    await dbContext.Comments.findByIdAndDelete(id)
    return comment
  }

  async getByPostId(postId)
  {
      const found = await dbContext.Comments.find({postId: postId}).populate("account", "name picture").populate("upvotes downvotes")
      return found
  }
}

export const commentsService = new CommentsService()
