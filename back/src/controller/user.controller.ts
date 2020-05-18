import {Request,Response}from 'express';

export class userController{
    constructor(){

    }
    create(req:Request,res:Response){
        res.send('ok user');
    }
}