class CommentsLayersService {
    async getById(id)
    {
        const found = await dbContext.CommentLayers.findById(update.id)
        if(!found)
        {
            throw new BadRequest(`CommentLayer with id ${update.id} not found`)
        }
        return found
    }

    async getAll(query)
    {
        return await dbContext.CommentLayers.find({query})
    }

    async createOrEdit(body)
    {
        const found = await dbContext.CommentLayers.findOne({ accountId: body.accountId, commentId: body.commentId })
        if(!found)
        {
            const created = await dbContext.CommentLayers.create(body)
            return created
        }
        if(found.accountId.toString() !== body.accountId)
        {
            throw new Forbidden(`You don't have permission for this CommentLayer`)
        }

        // NOTE have to check like this because it's a bool, so just checking against it would skip it if it was false
        found.userVote = typeof body.userVote == "boolean" ? body.userVote : found.upvoted
        await found.save()
        return found
    }

    async remove(id, userId)
    {
        const removed = this.getById(id)
        if(removed.accountId.toString() !== userId)
        {
            throw new Forbidden(`You don't have permission for this CommentLayer`)
        }
        removed.remove()
        return removed
    }

    async getCommentScore(commentId)
    {
        const votes = await this.getAll({ commentId: commentId });
        let score = votes.length;
        score += votes.filter(vote => vote.userVote).length * 2
        return score
    }
}

export const commentsLayersService = new CommentsLayersService()
