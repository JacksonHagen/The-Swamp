import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { postsService } from '../Services/PostsService.js'
import { logger } from '../Utils/Logger.js'

function _drawPosts() {
  let template = ''
  // eslint-disable-next-line no-return-assign
  ProxyState.posts.forEach(p => template += p.Template)
  document.getElementById('posts').innerHTML = template
}

function _drawActivePost() {
  if (ProxyState.activePost !== null) {
    document.getElementById('active-post-body').innerHTML = ProxyState.activePost.activeTemplate
    document.getElementById('active-post-title').innerText = ProxyState.activePost.title
  }
}

export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    ProxyState.on('activePost', _drawActivePost)
    this.getAllPosts()
    _drawPosts()
  }

  async getAllPosts() {
    try {
      await postsService.getAllPosts()
    } catch (error) {
      logger.error(error)
    }
  }

  async setActivePost(postId) {
    try {
      postsService.setActivePost(postId)
      commentsService.getCommentsByPostId(ProxyState.activePost.id)
    } catch (error) {
      logger.error('[SET ACTIVE POST]' + error.message)
    }
  }

  async vote(postId, userVote) {
    try {
      await postsService.vote(postId, userVote)
    } catch (error) {
      logger.error(error)
    }
  }

  async remove(postId) {
    try {
      postsService.remove(postId)
    } catch (error) {
      logger.error('[REMOVAL_ERROR]', error)
    }
  }

  // NOTE basically just a 'setActivePost' function, but it doesnt get the comments
  async editButton(postId) {
    postsService.setActivePost(postId)
  }

  async edit() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const formData = {
        title: form.editTitle.value,
        imageUrl: form.editImageUrl.value,
        body: form.editBody.value
      }
      postsService.edit(formData)
    } catch (error) {
      logger.error('[EDIT_FORM_Error]', error)
    }
  }

  async newPost() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const newPostData = {
        title: form.title.value,
        body: form.body.value,
        imageUrl: form.imageUrl.value
      }

      await postsService.createPost(newPostData)
    } catch (error) {
      console.error('[NEW POST]', error.message)
    }
  }
}
