import express from 'express';
import { userController } from "../controller/user.controller";
import { check,body } from 'express-validator';
import multer from 'multer';
var uploadMulter = multer();
import { checkDbConnection,upload } from "../middleware/all.middleware";
import { auth,checkUser } from "../middleware/authentification.middleware";


export class userRoute {
    public router = express.Router();
    private controller = new userController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/create',[uploadMulter.none(),checkDbConnection,body('email','Please enter you email').notEmpty(),body('password','Please enter you password').notEmpty(),body('firstname','Please enter you firstname').notEmpty(),body('lastname','Please enter you lastname').notEmpty(),body('phone','Please enter you phone').notEmpty()], this.controller.signup)
        this.router.post('/login',[uploadMulter.none(),checkDbConnection,body("email", "Please enter a valid email").isEmail(),body('password').notEmpty()], this.controller.login)
        this.router.post('/loginG',[checkDbConnection,check('tokenid','Please enter you gid').notEmpty()], this.controller.loginGid);
        this.router.post('/profileImageUpdate',[auth,checkDbConnection,checkUser,upload.single('photo')], this.controller.uploadImage);
        this.router.post('/me',[auth,checkDbConnection,checkUser], this.controller.me);
        this.router.put('/update',[auth,checkDbConnection,checkUser], this.controller.update);
        this.router.delete('/remove/:id',[auth], this.controller.delete);
    }
}


