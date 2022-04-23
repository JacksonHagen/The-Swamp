import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsLayersService } from "../services/CommentsLayersService.js";
import BaseController from '../utils/BaseController.js'

export class CommentsLayerController extends BaseController {
    constructor()
    {
        super("api/commentslayers")

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
           const votes = await commentsLayersService.getAll(req.query)
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
           return res.send(await commentsLayersService.create(req.body));
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
           return res.send(await commentsLayersService.edit(req.body));
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
           return res.send(await commentsLayersService.remove(req.params.id, req.userInfo.id));
       }
       catch(error)
       {
           next(error);
       }
    }
}