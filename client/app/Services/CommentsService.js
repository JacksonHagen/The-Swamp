import { api } from "./AxiosService.js"

class CommentsService
{
    async getCommentsByPostId(postId)
    {
        ProxyState.comments = await api.get("api/posts/" + postId + "/comments")
    }
}

export const commentsService = new CommentsService()