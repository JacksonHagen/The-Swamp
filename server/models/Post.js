import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    imageUrl: { type: String },
    accountId: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

PostSchema.virtual('account',
  {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
  })

PostSchema.virtual("upvotes",
    {
        localField: '_id',
        foreignField: 'postId',
        ref: 'PostLayer',
        count: true,
        match: { userVote: true }
    }
)

PostSchema.virtual("downvotes",
    {
        localField: '_id',
        foreignField: 'postId',
        ref: 'PostLayer',
        count: true,
        match: { userVote: false }
    }
)
