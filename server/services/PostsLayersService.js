import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class PostsLayersService
{
    async getById(id)
    {
        const found = await dbContext.PostLayers.findById(id)
        if(!found)
        {
            throw new BadRequest(`PostLayer with id ${id} not found`)
        }
        return found
    }

    async getAll(query)
    {
        return await dbContext.PostLayers.find({query})
    }

    async create(body)
    {
        const created = await dbContext.PostLayers.create(body)
        return created
    }

    async createOrEdit(body)
    {
        const found = await dbContext.PostLayers.findOne({ accountId: body.accountId, postId: body.postId })
        if(!found)
        {
            const created = await dbContext.PostLayers.create(body)
            return created
        }
        if(found.accountId.toString() !== body.accountId)
        {
            throw new Forbidden(`You don't have permission for this PostLayer`)
        }

        // NOTE have to check like this because it's a bool, so just checking against it would skip it if it was false
        found.userVote = typeof body.userVote == "boolean" ? body.userVote : found.upvoted
        await found.save()
        return found
    }

    async remove(id, userId)
    {
        const removed = await this.getById(id)
        if(removed.accountId.toString() !== userId)
        {
            throw new Forbidden(`You don't have permission for this PostLayer`)
        }
        removed.remove()
        return removed
    }

    async getPostScore(postId)
    {
        const votes = await this.getAll({ postId });
        let score = votes.length;
        score -= votes.filter(vote => !vote.userVote).length * 2
        return score
    }
}

export const postsLayersService = new PostsLayersService();