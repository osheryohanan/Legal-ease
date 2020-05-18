import express from 'express';
import { userController } from "../controller/user.controller";
import { auth } from "../middleware/authentification.middleware";
import { check } from 'express-validator';

export class userRoute {
    public router = express.Router();
    private controller = new userController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/create', this.controller.signup)
        this.router.post('/login',[check("email", "Please enter a valid email").isEmail(),check('password').notEmpty()], this.controller.login)
        this.router.post('/loginG',[check('tokenid','Please enter you gid').notEmpty()], this.controller.loginGid);


        this.router.delete('/remove/:id',[auth], this.controller.delete);
    }
}