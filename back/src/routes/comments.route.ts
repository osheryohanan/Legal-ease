import express from 'express';
import { commentsController } from "../controller/comments.controller";
import { checkDbConnection } from "../middleware/all.middleware";
import { auth,checkUser } from "../middleware/authentification.middleware";
import { check } from 'express-validator';
import { runInThisContext } from 'vm';



export class commentsRoute {
    public router = express.Router();
    private controller = new commentsController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/laywer',[checkDbConnection,check("laywerID", "Please enter the laywer ID").notEmpty()], this.controller.getCommentForLaywer)
        this.router.post('/add',[checkDbConnection,checkUser,],this.controller.addComment)
    }
}