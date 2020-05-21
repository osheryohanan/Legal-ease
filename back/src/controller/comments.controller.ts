import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import { errorHandler } from '../interfaces/error.interfaces';
import { Icomments, Comments } from "../model/comments.model";

export class commentsController {
    constructor() {

    }

    async addComment(req: any, res: Response) {
        // userGuard
        try {
            let comment: Icomments =
            {
                user: req.userID,
                lawyer: req.body.laywerID,
                text: req.body.text || '',
                rating: req.body.rating
            }
            let commnetModel = new Comments(comment);
            commnetModel.save();
            res.status(200).json({
                type: 'success',
                message: `We are successful save your comment!`,
            });
        } catch (err) {
            var error: errorHandler = {
                status: 500,
                message: `Error when saving the comment`,
                type: 'DataBasing',
            }
            return res.status(error.status).send(error);
        }
    }
    async getCommentForLaywer(req: any, res: Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var error: errorHandler = {
                status: 400,
                message: `We need to specified all attributes`,
                type: 'Requirement',
                all: errors.array()
            }
            return res.status(error.status).send(error);

        }
        res.json(await Comments.find({ laywer: req.body.laywerID}));
        


    }
    getAllComment(req: any, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var error: errorHandler = {
                status: 400,
                message: `We need to specified all attributes`,
                type: 'Requirement',
                all: errors.array()
            }
            return res.status(error.status).send(error);

        }

    }

}
