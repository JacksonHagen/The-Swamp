import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    accountId: { type: Schema.Types.ObjectId, required: true },
    postId: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

CommentSchema.virtual('account',
  {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
  }
)

CommentSchema.virtual('post',
  {
    localField: 'postId',
    foreignField: '_id',
    ref: 'Post',
    justOne: true
  }
)

// TODO figure out how to only populate the votes the user has made on this comment
CommentSchema.virtual("info", 
    {
        localField: "",
        ref: "CommentLayer",
        foreignField: "",
        justOne: true
    }
)