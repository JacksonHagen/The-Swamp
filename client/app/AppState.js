import { dev } from './env.js'
import { Post } from './Models/Post.js'
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

const post1 = new Post({ title: 'Shrek is love', imageUrl: 'https://cdn.vox-cdn.com/thumbor/iHYQCXZLUPAx3wLetkUI9H4gS_U=/108x4:1300x700/1400x933/filters:focal(580x237:804x461):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/68509203/the_dark_knight_shrek.0.jpg', layers: 0, postId: 1 })
class AppState extends EventEmitter {
  user = {}
  account = {}
  /** @type {import('./Models/Value').Value[]} */
  values = []
  socketData = []
  /** @type {import('./Models/User').User[]} */
  users = []
  /** @type {import('./Models/Post').Post[]} */
  posts = []

  activePost = null;

  comments = [];
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.ProxyState = ProxyState
}
