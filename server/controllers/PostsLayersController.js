import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsLayersService } from "../services/PostsLayersService.js";
import BaseController from "../utils/BaseController.js";

export class PostsLayersController extends BaseController
{
    constructor()
    {
        super("api/postslayers")

        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get("", this.getAll)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.remove)
    }

    async getAll(req, res, next)
    {
       try
       {
           const votes = await postsLayersService.getAll(req.query)
           return res.send(votes);
       }
       catch(error)
       {
           next(error);
       }
    }

    async create(req, res, next)
    {
       try
       {
           return res.send(await postsLayersService.create(req.body));
       }
       catch(error)
       {
           next(error);
       }
    }

    async edit(req, res, next)
    {
       try
       {
           req.body.id = req.params.id
           req.body.accountId = req.userInfo.id
           return res.send(await postsLayersService.edit(req.body));
       }
       catch(error)
       {
           next(error);
       }
    }

    async remove(req, res, next)
    {
       try
       {
           return res.send(await postsLayersService.remove(req.params.id, req.userInfo.id));
       }
       catch(error)
       {
           next(error);
       }
    }

}