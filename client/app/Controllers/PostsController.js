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
      commentsService.getCommentsByPostId(ProxyState.activePost.postId)
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

  async newPost()
  {
      try
      {
        window.event.preventDefault();
        const form = window.event.target;
        const newPostData = {
            title: form.title,
            body: form.body,
            imageUrl: form.imageUrl
        };

        await postsService.createPost(newPostData);
      }
      catch(error)
      {
          console.error("[NEW POST]", error.message);
      }
  }
}
