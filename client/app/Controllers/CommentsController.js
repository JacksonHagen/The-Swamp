import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

function _drawActiveComments() {
  let commentsTemplate = ''
  // eslint-disable-next-line no-return-assign
  ProxyState.comments.forEach(comment => commentsTemplate += comment.Template)
  document.getElementById('active-post-comments').innerHTML = commentsTemplate
}

export class CommentsController {
  constructor() {
    ProxyState.on('comments', _drawActiveComments)
  }

  async addComment(postId)
  {
      try
      {
          window.event.preventDefault()
          const form = window.event.target
          await commentsService.addComment(ProxyState.activePost.id, form.comment.value)
          form.reset()
      }
      catch(error)
      {
          logger.error("[ADD COMMENT ERROR]", error.message);
      }
  }

  async vote(id, userVote) {
    try {
      commentsService.vote(id, userVote)
    } catch (error) {
      logger.error(error)
    }
  }

  async edit(id) {
    try {
      commentsService.edit(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async remove(id) {
    try {
      await commentsService.remove(id)
    } catch (error) {
      logger.error(error)
    }
  }
}
