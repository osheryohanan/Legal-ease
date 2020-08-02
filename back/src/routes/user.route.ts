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
        this.router.post('/create',[uploadMulter.none(),checkDbConnection,body('email','Please enter you email').notEmpty(),body('password','Please enter you password').notEmpty(),body('firstname','Please enter you firstname').notEmpty(),body('lastname','Please enter you lastname').notEmpty(),body('phone','Please enter you phone').notEmpty()],(req,res)=>{ this.controller.signup(req,res)})
        this.router.post('/login',[uploadMulter.none(),checkDbConnection,body("email", "Please enter a valid email").isEmail(),body('password').notEmpty()], (req,res)=>{this.controller.login(req,res)})
        this.router.post('/loginG',[checkDbConnection,check('tokenid','Please enter you gid').notEmpty()],(req,res)=>{ this.controller.loginGid(req,res)});
        this.router.post('/GenerateResetPassword',[checkDbConnection,body('email','Please enter you email').isEmail().notEmpty()], (req,res)=>{this.controller.GenerateResetPassword(req,res)});
        this.router.post('/resetPassword',[checkDbConnection,body('password','Please enter you email').notEmpty(),body('token','Please enter you email').notEmpty()], (req,res)=>{this.controller.ResetPassword(req,res)});
        this.router.post('/profileImageUpdate',[auth,checkDbConnection,checkUser,upload.single('photo')], (req,res)=>{this.controller.uploadImage(req,res)});
        this.router.post('/me',[auth,checkDbConnection,checkUser],(req,res)=>{ this.controller.me(req,res)});
        this.router.put('/update',[auth,checkDbConnection,checkUser],(req,res)=>{this.controller.update(req,res)});
        this.router.delete('/remove/:id',[auth], (req,res)=>{this.controller.delete(req,res)});
    }
}


