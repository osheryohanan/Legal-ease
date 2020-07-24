import express from 'express';
import { meetingController } from "../controller/meeting.controller";
import { checkDbConnection } from "../middleware/all.middleware";
import { auth,checkUser,checkLawyer } from "../middleware/authentification.middleware";
import { check, body, param } from 'express-validator';
import { runInThisContext } from 'vm';
import {Types} from "mongoose";


export class meetingsRoute {
    public router = express.Router();
    private controller = new meetingController();
    constructor() {
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.post('/addMeeting',[checkDbConnection,auth,checkUser,body('lawyerID','Please confirm the laywer id').notEmpty(),body('userID','Please confirm the user id').notEmpty(),body('confirmed','Please confirm the laywer id').notEmpty(),body('hour','Please confirm the laywer id').notEmpty(),body('date','Please confirm the laywer id').notEmpty()], this.controller.addMeeting)
        this.router.post('/checkLawyerAvability',[checkDbConnection,auth,checkUser,body('date','Please confirm the laywer id').notEmpty(),body('laywerId','Please confirm the laywer id').notEmpty()], this.controller.checkLawyerAvability)
        this.router.post('/getMeetingsForUser',[checkDbConnection,auth,checkUser,body('userID','Please confirm the user id').notEmpty()], this.controller.getMeetingsForUser)
        this.router.post('/getMeetingsForLawyer',[checkDbConnection,auth,checkLawyer], this.controller.getMeetingsForLawyer)
        this.router.put('/confirmRejectMeeting/:id',[checkDbConnection,auth,checkLawyer,param('id','Please enter a valid id').notEmpty().custom(val=>Types.ObjectId.isValid(val)),body('status','Please send the status').notEmpty().isNumeric()], this.controller.confirmRejectMeeting)
        this.router.put('/updateZoomURL/:id',[checkDbConnection,auth,checkLawyer,param('id','Please enter a valid id').notEmpty().custom(val=>Types.ObjectId.isValid(val)),body('url','Please send the url').notEmpty()], this.controller.updateZoomURL)
        this.router.delete('/remove/:id',[checkDbConnection,auth,checkUser,param('id','Please enter a valid id').custom(val=>Types.ObjectId.isValid(val))], this.controller.delete)
      
        
    }
}