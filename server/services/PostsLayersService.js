import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

class PostsLayersService
{
    async getById(id)
    {
        const found = await dbContext.PostLayers.findById(update.id)
        if(!found)
        {
            throw new BadRequest(`PostLayer with id ${update.id} not found`)
        }
        return found
    }

    async getAll(query)
    {
        return await dbContext.PostLayers.find({query})
    }

    async create(body)
    {
        return await dbContext.PostLayers.create(body)
    }

    async edit(update)
    {
        const edited = this.getById(update.id)
        if(edited.accountId.toString() !== update.accountId)
        {
            throw new Forbidden(`You don't have permission for this PostLayer`)
        }

        // NOTE have to check like this because it's a bool, so just checking against it would skip it if it was false
        edited.upvoted = typeof update.upvoted == "boolean" ? update.upvoted : edited.upvoted
        edited.save()
        return edited
    }

    async remove(id, userId)
    {
        const removed = this.getById(id)
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
        score += votes.filter(vote => vote.upvoted).length * 2
        return score
    }
}

export const postsLayersService = new PostsLayersService();