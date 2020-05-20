import express from 'express';
import { userController } from "../controller/user.controller";
import { check } from 'express-validator';

import { checkDbConnection,upload } from "../middleware/all.middleware";
import { auth } from "../middleware/authentification.middleware";


export class userRoute {
    public router = express.Router();
    private controller = new userController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/create',[checkDbConnection], this.controller.signup)
        this.router.post('/login',[checkDbConnection,check("email", "Please enter a valid email").isEmail(),check('password').notEmpty()], this.controller.login)
        this.router.post('/loginG',[checkDbConnection,check('tokenid','Please enter you gid').notEmpty()], this.controller.loginGid);
        this.router.post('/profileUpdate',[auth,checkDbConnection,upload.single('photo')], this.controller.uploadImage);
        this.router.delete('/remove/:id',[auth], this.controller.delete);
    }
}