import { ProxyState } from "../AppState.js";

function _drawActiveComments()
{
    let commentsTemplate = "";
    ProxyState.comments.forEach(comment => commentsTemplate += comment.Template)
    document.getElementById("active-post-comments").innerHTML = commentsTemplate
}

export class CommentsController
{
    constructor()
    {
        ProxyState.on("comments", _drawActiveComments);
    }
}