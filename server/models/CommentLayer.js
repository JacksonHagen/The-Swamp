import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentLayerSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  commentId: { type: Schema.Types.ObjectId, required: true, ref: 'Comment' },
  upVoted: { type: Boolean }
})
