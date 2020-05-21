import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { OAuth2Client } from "google-auth-library";
import { errorHandler } from '../interfaces/error.interfaces';
import { User, Iuser } from "../model/user.model";

var privateKey = fs.readFileSync(path.join(__dirname, '../../', 'private.key'));


export class userController {
    constructor() {

    }
    async signup(req: Request, res: Response) {
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
        const { email, password, firstname, lastname, phone, gid } = req.body;

        try {
            let c = await User.findOne({ "email": email });
            if (c) {
                let msg: Array<string> = [];
                msg.push('Email Already Exists');
                var error: errorHandler = {
                    status: 400,
                    message: `The email address is already in use`,
                    type: 'Requirement',
                }
                return res.status(error.status).send(error);
            }
            const salt = await bcrypt.genSalt(10);
            let user: Iuser = {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                password: await bcrypt.hash(password, salt),
                email: email,

            };
            let userModel = new User(user);

            userModel.save();
            const payload = {
                user: {
                    id: userModel._id
                }
            };
            res.status(200).json({
                type: 'success',
                message: `We are successful create profile for ${email}!`,
                token: await jwt.sign(payload, privateKey, { expiresIn: 10000, algorithm: 'RS256' })
            });

        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error during saving, please try again later.`,
                type: 'DataBasing',

            }
            return res.status(error.status).send(error);
        }
    }
    async login(req: Request, res: Response) {
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
        const { email, password, longtime } = req.body;
        try {
            let user: any = await User.findOne({
                email
            });
            if (!user) {
                var error: errorHandler = {
                    status: 400,
                    message: `You didn't have an account! Please register.`,
                    type: 'Anth Error',

                }
                return res.status(error.status).send(error);
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                var error: errorHandler = {
                    status: 400,
                    message: `The password is incorrect, please try again.`,
                    type: 'Anth Error',

                }
                return res.status(error.status).send(error);
            }
            const payload = {
                user: {
                    id: user.id
                }
            };
            let expiresIn: string = '1d';
            if (longtime) expiresIn = '30d';
            return jwt.sign(
                payload,
                privateKey,
                {
                    expiresIn: expiresIn,
                    algorithm: 'RS256',
                },

                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        status: 200,
                        token
                    });
                }
            );
        } catch (e) {

            var error: errorHandler = {
                status: 400,
                message: `We have encountered a bug, please try again later..`,
                type: 'BUG',

            }
            return res.status(error.status).send(error);
        }
    }
    async loginGid(req: Request, res: Response) {

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
        try {
            const client = new OAuth2Client(process.env.GOOGLEID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.tokenid,
                audience: process.env.GOOGLEID,
            });
            const guser = ticket.getPayload();
            const gid = guser['sub'];

            let user = await User.findOne({
                gid
            });
            if (!user) {
                user = await User.findOne({
                    email: guser['email']
                });
                if (user) await User.findByIdAndUpdate(user._id, { $set: { gid } })

            }
            if (!user) {
                var error: errorHandler = {
                    status: 400,
                    message: `You didn't have an account! Please register.`,
                    type: 'Anth Error',

                }
                return res.status(error.status).send(error);
            }
            delete user['password'];
            const payload = {
                user: {
                    id: user._id
                }
            };
            return jwt.sign(
                payload,
                privateKey,
                {
                    expiresIn: 10000,
                    algorithm: 'RS256',
                },

                (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({
                        status: 200,
                        token
                    });
                }
            );
        } catch (e) {
            var error: errorHandler = {
                status: 400,
                message: `We have encountered a bug, please try again later..`,
                type: 'BUG',
            }
            return res.status(error.status).send(error);
        }
    }
    update(req, res) {
        if (req.body.email) delete req.body.email;
        if (req.body.password) delete req.body.password;
        if (req.body.meetingDiary) delete req.body.meetingDiary;
        if (req.body._id) delete req.body._id;
        if (req.body.imagePath) delete req.body.imagePath;

        User.findByIdAndUpdate(req.user._id, { $set: req.body }, function (err, product) {
            if (err) {
                var error: errorHandler = {
                    status: 500,
                    message: `We occured an error during saving, please try again later.`,
                    type: 'DataBasing',
                    all: err

                }
                return res.status(error.status).send(error);

            }
            res.json(product);
        });
    };
    getDetails(req: Request, res: Response) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                // handle
            }
            res.send(user);
        })
    };
    me(req: any, res: Response) {
        User.findById(req.user._id, '-password', function (err, user) {
            if (err) {
                var error: errorHandler = {
                    status: 400,
                    message: `An error was occured , please try again later.`,
                    type: 'DataBasing',

                }
                return res.status(error.status).send(error);
            }
            res.status(200).json(user);
        })
    };
    delete(req: Request, res: Response) {
        User.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                // handle
            }
            res.status(200).send('Deleted successfully!');
        })
    };
    uploadImage(req: any, res: Response) {
        try {
            if (req.file) {
                User.findById(req.user._id, function (err, doc: any) {
                    if (err) {
                        var error: errorHandler = {
                            status: 400,
                            message: `error when saving the image`,
                            type: 'DataBasing',

                        }
                        return res.status(error.status).send(error);
                    }
                    doc.imagePath = req.file.filename;
                    doc.save(function (err) {
                        if (!err) {
                            res.status(200).json({
                                success: true,
                                filename: req.file.filename
                            })
                        }
                        else {
                            var error: errorHandler = {
                                status: 400,
                                message: `error when saving the image`,
                                type: 'DataBasing',

                            }
                            return res.status(error.status).send(error);
                        }
                    });
                })
            }
            else {
                var error: errorHandler = {
                    status: 400,
                    message: `no image was received`,
                    type: 'Requirement',

                }
                return res.status(error.status).send(error);

            }
        } catch (error) {
            var error: errorHandler = {
                status: 400,
                message: `no image was received`,
                type: 'Requirement',

            }
            return res.status(error.status).send(error);
        }
    }
    GenerateResetPassword(req: Request, res: Response) {
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
        try {
            const payload = {
                email: req.body.email
            }
            jwt.sign(
                payload,
                privateKey,
                {
                    expiresIn: 10000,
                    algorithm: 'RS256',
                },

                (err, token) => {
                    if (err) throw err;
                    //send email to the client
                    //https://stackoverflow.com/questions/48075688/how-to-decode-the-jwt-encoded-token-payload-on-client-side-in-angular-5
                    return res.status(200).json({
                        status: 200,
                        message: 'An email has been sent to you. please follow the instructions to renew your password.'
                    });
                }
            );
        } catch (error) {
            var error: errorHandler = {
                status: 400,
                message: `We have encountered a bug, please try again later..`,
                type: 'BUG',

            }
            return res.status(error.status).send(error);
        }

    }
    async ResetPassword(req: Request, res: Response) {
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
        try {
            var cert = fs.readFileSync(path.join(__dirname, '../../', 'public.key'));
            const decoded = jwt.verify(req.body.token, cert);
            const salt = await bcrypt.genSalt(10);
            User.findOneAndUpdate({ email: decoded.email }, { $set: { password: await bcrypt.hash(req.body.password, salt) } }, function (err, product) {
                if (err) {
                    var error: errorHandler = {
                        status: 500,
                        message: `We occured an error during saving, please try again later.`,
                        type: 'DataBasing',
                        all: err

                    }
                    return res.status(error.status).send(error);
                }
                res.json({ status: 'success', message: 'Your password has been changed' });
            });


        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: error.name == 'TokenExpiredError' ? 'Your link has expired please login again' : `The token is invalid`,
                type: 'Requirement'
            }
            return res.status(error.status).send(error);
        }


    }


}