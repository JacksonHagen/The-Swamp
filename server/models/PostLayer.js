import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostLayerSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  // REVIEW ref?
  postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
  upVoted: { type: Boolean }
})
