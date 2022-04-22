import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from '../models/Post.js'
import { CommentSchema } from '../models/Comment.js'
import { PostLayerSchema } from '../models/PostLayer.js'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Posts = mongoose.model('Post', PostSchema)
  Comments = mongoose.model('Comment', CommentSchema)
  PostLayers = mongoose.model('PostLayer', PostLayerSchema)
}

export const dbContext = new DbContext()
