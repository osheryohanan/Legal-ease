import * as jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";
import { errorHandler } from '../interfaces/error.interfaces';
import { User } from '../model/user.model';

var cert = fs.readFileSync(path.join(__dirname, '../../', 'public.key'));


export var auth = (req, res, next) => {

    const token = req.header('token');
    if (!token) {
        var error: errorHandler = {
            status: 500,
            message: `We need to be identified to access here`,
            type: 'Anth Error'
        }
        return res.status(error.status).send(error);
    }
    try {
        const decoded = jwt.verify(token, cert);
        req.user = decoded.user;
        next();
    } catch (error) {
        var error: errorHandler = {
            status: 500,
            message: error.name=='TokenExpiredError'?'Your session has expired please login again': `The token is invalid`,
            type: 'Anth Error'
        }
        return res.status(error.status).send(error);

    }
}


export var checkUser = async (req, res, next) => {
    var userID = req.user.id;
    let user = await User.findOne({
        _id: userID
    });
    if (!user) {
        var error: errorHandler = {
            status: 500,
            message: `The user not exist`,
            type: 'Anth Error'
        }
        return res.status(error.status).send(error);
    }
    req.user=user;
    next();

}




