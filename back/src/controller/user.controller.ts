import { EmailTransporter } from './../helpers/mail.helpers';
import {
    Request,
    Response
} from 'express';
import {
    validationResult
} from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import {
    OAuth2Client
} from "google-auth-library";
import {
    errorHandler
} from '../interfaces/error.interfaces';
import {
    User,
    Iuser
} from "../model/user.model";
import { lawyerController } from './lawyer.controller';

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
        const {
            email,
            password,
            firstname,
            lastname,
            phone,
            gid
        } = req.body;

        try {
            let c = await User.findOne({
                "email": email
            });
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
                    type: 'user',
                    id: userModel._id
                }
            };
            res.status(200).json({
                type: 'success',
                message: `We are successful create profile for ${email}!`,
                token: await jwt.sign(payload, privateKey, {
                    expiresIn: 10000,
                    algorithm: 'RS256'
                })
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
        const {
            email,
            password,
            longtime
        } = req.body;
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
                    type: 'user',
                    id: user.id
                }
            };
            let expiresIn: string = '1d';
            if (longtime) expiresIn = '30d';
            return jwt.sign(
                payload,
                privateKey, {
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
                if (user) await User.findByIdAndUpdate(user._id, {
                    $set: {
                        gid
                    }
                })

            }
            if (!user) {

                const salt = await bcrypt.genSalt(10);
                let nuser: Iuser = {
                    firstname: guser.given_name,
                    lastname: guser.family_name,
                    phone: '0',
                    password: await bcrypt.hash('LegalEase', salt),
                    email: guser.email,
                    gid: guser.sub,
                    imagePath: guser.picture
                };
                let userModel = new User(nuser);

                userModel.save();
                const payload = {
                    user: {
                        type: 'user',
                        id: userModel._id
                    }
                };
                return res.status(200).json({
                    type: 'success',
                    message: `We are successful create profile for ${nuser.email}!`,
                    token: await jwt.sign(payload, privateKey, {
                        expiresIn: 10000,
                        algorithm: 'RS256'
                    })
                });
            }
            const payload = {
                user: {
                    type: 'user',
                    id: user._id
                }
            };
            return jwt.sign(
                payload,
                privateKey, {
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

        User.findByIdAndUpdate(req.user._id, {
            $set: req.body
        }, function (err, _resultat) {
            if (err) {
                var error: errorHandler = {
                    status: 500,
                    message: `We occured an error during saving, please try again later.`,
                    type: 'DataBasing',
                    all: err

                }
                return res.status(error.status).send(error);

            }
            res.json(_resultat);
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
            user.set('type', 'user',
            { strict: false });
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
                        } else {
                            var error: errorHandler = {
                                status: 400,
                                message: `error when saving the image`,
                                type: 'DataBasing',

                            }
                            return res.status(error.status).send(error);
                        }
                    });
                })
            } else {
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
    async GenerateResetPassword(req: Request, res: Response) {
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
            const email = req.body.email;

            let c = await User.findOne({
                "email": email
            });
            if (!c) {
                var error: errorHandler = {
                    status: 400,
                    message: 'User not found! Please enter your correct email',
                    type: 'Requirement',
                }
                return res.status(error.status).send(error);
            }
            const payload = {
                email,
                type: 'user'
            }
            jwt.sign(
                payload,
                privateKey, {
                expiresIn: 10000,
                algorithm: 'RS256',
            },

                async (err, token) => {
                    if (err) throw err;
                    try {
                        let ret = await EmailTransporter.forgotPassword(email, token);
                        return res.status(200).json({
                            status: 200,
                            // token,
                            message: 'An email has been sent to you. please follow the instructions to renew your password.'
                        });

                    } catch (error) {
                        throw error;
                    }
                    //send email to the client
                    //https://stackoverflow.com/questions/48075688/how-to-decode-the-jwt-encoded-token-payload-on-client-side-in-angular-5

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
            const { password, token } = req.body;
            if (!lawyerController.patternExp(password, [/[a-z]/, /[A-Z]/, /\d/], 8)) {
                var error: errorHandler = {
                    status: 400,
                    message: `Password not valid`,
                    type: 'Requirement',
                    all: errors.array()
                }
                return res.status(error.status).send(error);
            }

            var cert = fs.readFileSync(path.join(__dirname, '../../', 'public.key'));
            const decoded = jwt.verify(req.body.token, cert);
            if (decoded.type != 'user') throw new Error("Token");
            const salt = await bcrypt.genSalt(10);
            User.findOneAndUpdate({
                email: decoded.email
            }, {
                $set: {
                    password: await bcrypt.hash(req.body.password, salt)
                }
            }, (err, _resultat) => {
                if (err) {
                    var error: errorHandler = {
                        status: 500,
                        message: `We occured an error during saving, please try again later.`,
                        type: 'DataBasing',
                        all: err

                    }
                    return res.status(error.status).send(error);
                }
                req.body.email = decoded.email;
                req.body.password = password;
                req.body.longtime = true;
                this.login(req, res);
                // res.json({
                //     status: 'success',
                //     message: 'Your password has been changed'
                // });
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