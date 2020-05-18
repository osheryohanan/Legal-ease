import * as jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";
import { errorHandler } from '../interfaces/error.interfaces';

var cert = fs.readFileSync(path.join(__dirname,'../../','public.key'));


export var auth=(req,res,next)=>{

    const token= req.header('token');
    if(!token) {
        var error:errorHandler={
            status:500,
            message:`We need to be identified to access here`,
            type:'Anth Error'
        }
        return res.status(error.status).send(error);
    }
    try {
        const decoded = jwt.verify(token, cert);
        req.user=decoded.user;
        next();
    } catch (error) {
        var error:errorHandler={
            status:500,
            message:`The token is invalid`,
            type:'Anth Error'
        }
        return res.status(error.status).send(error);
        
    }
}