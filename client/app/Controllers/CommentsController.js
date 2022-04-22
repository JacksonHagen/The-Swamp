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
      commentsService.remove(id)
    } catch (error) {
      logger.error(error)
    }
  }
}
