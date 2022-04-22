import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from "../models/Post.js"
import { CommentSchema } from '../models/Comment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Posts = mongoose.model('Post', PostSchema)
  Comments = mongoose.model('comment', CommentSchema)
}

export const dbContext = new DbContext()
