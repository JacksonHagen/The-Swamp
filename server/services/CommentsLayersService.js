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

    async create(body)
    {
        return await dbContext.CommentLayers.create(body)
    }

    async edit(update)
    {
        const edited = this.getById(update.id)
        if(edited.accountId.toString() !== update.accountId)
        {
            throw new Forbidden(`You don't have permission for this CommentLayer`)
        }

        // NOTE have to check like this because it's a bool, so just checking against it would skip it if it was false
        edited.userVote = typeof update.userVote == "boolean" ? update.userVote : edited.userVote
        edited.save()
        return edited
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

    async getPostScore(commentId)
    {
        const votes = await this.getAll({ postId: commentId });
        let score = votes.length;
        score += votes.filter(vote => vote.userVote).length * 2
        return score
    }
}

export const commentsLayersService = new CommentsLayersService()
