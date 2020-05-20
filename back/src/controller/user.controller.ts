import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { OAuth2Client } from "google-auth-library";
import { errorHandler } from '../interfaces/error.interfaces';

import { User } from "../model/user.model";

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
        const { email, password, name, phone, gid } = req.body;

        try {
            let c = await User.findOne({ "email": email });
            if (c) {
                let msg: Array<string> = [];
                msg.push('Email Already Exists');
                return res.status(400).json({
                    error: 2342,
                    msg: msg
                });
            }
            const salt = await bcrypt.genSalt(10);

            let user = {
                name: name,
                password: await bcrypt.hash(password, salt),
                email: email,
                phone: phone,
                type: 'user'
            };
            let userModel = new User(user);


            userModel.save();

            res.status(200).json({
                type: 'success',
                message: `We are successful create profile for ${email}!`,
            });

        } catch (error) {
            res.status(500).send({
                message: "Error in Saving"
            });
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
        const { email, password } = req.body;
        try {
            let user: any = await User.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });
            const payload = {
                user: {
                    id: user.id
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

            res.status(500).json({
                message: "Server Error"
            });
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
            const client = new OAuth2Client('GOOGLE ID');

            const ticket = await client.verifyIdToken({
                idToken: req.body.gid,
                audience: 'GOOGLE ID',
            });
            const guser = ticket.getPayload();
            const gid = guser['sub'];

            let user = await User.findOne({
                gid
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });
            delete user['password'];
            const payload = {
                user
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
            res.status(500).json({
                message: "Server Error"
            });
        }
    }

    update(req, res) {
        User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
            if (err) {
                // handle
            }
            res.send('User udpated.');
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
    me(req: Request, res: Response) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                // handle
            }
            res.send(user);
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
                User.findById(req.user, function (err, doc: any) {
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

}