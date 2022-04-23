import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService.js'
import { postsLayersService } from '../services/PostsLayersService.js'
import { postsService } from '../services/PostsService.js'
import BaseController from '../utils/BaseController.js'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/score', this.getPostScore)
      .get('/:id/comments', this.getCommentsByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .post('/:id/vote', this.vote)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll()
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postsService.getById(req.params.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const newPost = await postsService.create(req.body)
      res.send(newPost)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.id = req.params.id
      const editedPost = await postsService.edit(req.body)
      res.send(editedPost)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const removedPost = await postsService.remove(req.params.id, req.userInfo.id)
      res.send(removedPost)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByPostId(req, res, next) {
    try {
      const comments = await commentsService.getByPostId(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async vote(req, res, next)
  {
    try {
        req.body.commentId = req.params.id
        req.body.accountId = req.userInfo.id
      return res.send(await postsLayersService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getPostScore(req, res, next)
  {
      try
      {
          return res.send(postsLayersService.getPostScore(req.params.id));
      }
      catch(error)
      {
          next(error);
      }
  }
}
