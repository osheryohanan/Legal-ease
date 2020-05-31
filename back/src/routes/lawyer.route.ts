import express from 'express';
import { lawyerController } from "../controller/lawyer.controller";
import { check,body } from 'express-validator';
import multer from 'multer';
var uploadMulter = multer();
import { checkDbConnection,upload } from "../middleware/all.middleware";
import { auth,checkLawyer } from "../middleware/authentification.middleware";


export class lawyerRoute {
    public router = express.Router();
    private controller = new lawyerController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/create',[uploadMulter.none(),checkDbConnection,body('email','Please enter you email').notEmpty(),body('password','Please enter you password').notEmpty(),body('lawyerNum','Please enter you laywerNum').notEmpty(),body('firstname','Please enter you firstname').notEmpty(),body('lastname','Please enter you lastname').notEmpty(),body('phone','Please enter you phone').notEmpty()], this.controller.signup)
        this.router.post('/login',[uploadMulter.none(),checkDbConnection,body("email", "Please enter a valid email").isEmail(),body('password').notEmpty()], this.controller.login)
        this.router.post('/loginG',[checkDbConnection,check('tokenid','Please enter you gid').notEmpty()], this.controller.loginGid);
        this.router.post('/profileImageUpdate',[auth,checkDbConnection,checkLawyer,upload.single('photo')], this.controller.uploadImage);
        this.router.post('/me',[auth,checkDbConnection,checkLawyer], this.controller.me);
        this.router.put('/update',[auth,checkDbConnection,checkLawyer], this.controller.update);
        this.router.delete('/remove/:id',[auth], this.controller.delete);
    }
}


