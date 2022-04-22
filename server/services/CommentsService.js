import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class CommentsService {
  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async edit(update) {
    const original = await dbContext.Comments.findById(update.id)
    if(!original) {
        throw new BadRequest("No comment with that ID was found")
    }
    if(original.accountId.toString !== update.accountId) {
        throw new Forbidden("No ")
    }
  }

  async remove(id, userId) {

  }
}

export const commentsService = new CommentsService()
