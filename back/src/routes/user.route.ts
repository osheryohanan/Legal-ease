import express from 'express';
import { userController } from "../controller/user.controller";
import { auth } from "../middleware/authentification.middleware";
export class userRoute {
    public router = express.Router();
    private controller = new userController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/create',[auth], this.controller.create)
    }
}