import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsLayersService } from '../services/CommentsLayersService.js'
import { commentsService } from '../services/CommentsService.js'
import BaseController from '../utils/BaseController.js'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')

    this.router
      .get("/:id/score", this.getCommentScore)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .post('/:id/vote', this.vote)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      return res.send(await commentsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.accountId = req.userInfo.id
      return res.send(await commentsService.edit(req.body))
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      return res.send(commentsService.remove(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }

  async vote(req, res, next) {
    try {
        req.body.commentId = req.params.id
        req.body.accountId = req.userInfo.id
      return res.send(await commentsLayersService.createOrEdit(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getCommentScore(req, res, next)
  {
      try
      {
          return res.send(commentsLayersService.getCommentScore(req.params.id));
      }
      catch(error)
      {
          next(error);
      }
  }
}
