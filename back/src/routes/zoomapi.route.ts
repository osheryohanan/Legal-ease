import express from 'express';
import { zoomApiController } from "../controller/zoomapi.controller";
import { check,body,query } from 'express-validator';
import multer from 'multer';
var uploadMulter = multer();
import { checkDbConnection,upload } from "../middleware/all.middleware";
import { auth,checkUser } from "../middleware/authentification.middleware";


export class zoomApiRoute {
    public router = express.Router();
    private controller = new zoomApiController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.get('/update',[query('code').notEmpty()],(req,res)=>{ this.controller.updateUser(req,res)})
        this.router.get('/refreshToken',[query('lawyer').notEmpty()],(req,res)=>{ this.controller.refreshToken(req,res)})

    }
}


