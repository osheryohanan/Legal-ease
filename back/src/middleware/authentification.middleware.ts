import * as jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";

var cert = fs.readFileSync(path.join(__dirname,'../../','public.key'));


export var auth=(req,res,next)=>{

    const token= req.header('token');
    if(!token) return res.status(500).json({error:'Anth Error'});
    try {
        const decoded = jwt.verify(token, cert);
        req.user=decoded.user;
        next();
    } catch (error) {
         return res.status(500).json({error:'invalid token'});
        
    }
}