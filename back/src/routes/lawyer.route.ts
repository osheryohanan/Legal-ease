import express from 'express';
import { lawyerController } from "../controller/lawyer.controller";
import { check,body, param, query } from 'express-validator';
import multer from 'multer';
var uploadMulter = multer();
import { checkDbConnection,upload } from "../middleware/all.middleware";
import { auth,checkLawyer,checkUser } from "../middleware/authentification.middleware";


export class lawyerRoute {
    public router = express.Router();
    private controller = new lawyerController();
    constructor() {
        try {
            this.initializeRoutes()
        } catch (error) {
            console.error(error);
            
        }
        
    }
    private initializeRoutes() {
        this.router.post('/create',[uploadMulter.none(),checkDbConnection,body('email','Please enter you email').notEmpty(),body('password','Please enter you password').notEmpty(),body('lawyerNum','Please enter you laywerNum').notEmpty(),body('firstname','Please enter you firstname').notEmpty(),body('lastname','Please enter you lastname').notEmpty(),body('phone','Please enter you phone').notEmpty()],(req,res)=>{ this.controller.signup(req,res)})
        this.router.post('/login',[uploadMulter.none(),checkDbConnection,body("email", "Please enter a valid email").isEmail(),body('password').notEmpty()], (req,res)=>{this.controller.login(req,res)})
        this.router.post('/loginG',[checkDbConnection,check('tokenid','Please enter you gid').notEmpty()], (req,res)=>{this.controller.loginGid(req,res)});
        this.router.post('/GenerateResetPassword',[checkDbConnection,body('email','Please enter you email').isEmail().notEmpty()], (req,res)=>{this.controller.GenerateResetPassword(req,res)});
        this.router.post('/resetPassword',[checkDbConnection,body('password','Please enter you email').notEmpty(),body('token','Please enter you email').notEmpty()], (req,res)=>{this.controller.ResetPassword(req,res)});
        this.router.put('/profileImageUpdate',[auth,checkDbConnection,checkLawyer,upload.single('photo')],(req,res)=>{ this.controller.uploadImage(req,res)});
        this.router.post('/me',[auth,checkDbConnection,checkLawyer], (req,res)=>{this.controller.me(req,res)});
        this.router.put('/update',[auth,checkDbConnection,checkLawyer,body('category').custom(function(value) {return Array.isArray(value);})], (req,res)=>{this.controller.update(req,res)});
        this.router.delete('/remove/:id',[auth], (req,res)=>{this.controller.delete(req,res)});
        this.router.get('/category',[checkDbConnection],(req,res)=>{this.controller.getCategory(req,res)})
        this.router.get('/bycategory',[auth,checkDbConnection,query('id','Please enter an ids').notEmpty()],(req,res)=>{this.controller.getbycategory(req,res)})
        this.router.get('/getinfo/:id',[auth,checkDbConnection,checkUser,param('id','Please enter an id').notEmpty()], (req,res)=>{this.controller.getlawyerbyid(req,res)});
        this.router.get('/getavailability/:id',[auth,checkDbConnection,checkUser,param('id','Please enter an id').notEmpty()], (req,res)=>{this.controller.getAvailability(req,res)});

    }
}


