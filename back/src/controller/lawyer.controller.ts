import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { OAuth2Client } from "google-auth-library";
import { errorHandler } from '../interfaces/error.interfaces';
import { Ilawyer, IlawyerD, Lawyer } from '../model/lawyer.model';
import { Category, Icategory, IcategoryD } from './../model/category.model';
var privateKey = fs.readFileSync(path.join(__dirname, '../../', 'private.key'));
import { availability_default } from '../helpers/default.availability';

import mongoose, { } from "mongoose";
import { Comments } from '../model/comments.model';
export class lawyerController {
    color;
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
            email, password, firstname, lastname, phone, lawyerNum, gid } = req.body;

        try {
            let c = await Lawyer.findOne({
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
            let lawyer: Ilawyer = {
                firstname: firstname,
                lastname: lastname,
                phone: phone,
                password: await bcrypt.hash(password, salt),
                email: email,
                lawyerNum: lawyerNum

            };
            let lawyerModel = new Lawyer(lawyer);

            await lawyerModel.save();
            const payload = {
                laywer: {
                    type: 'lawyer',
                    id: lawyerModel._id
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
                all: error

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
            let laywer: any = await Lawyer.findOne({
                email
            });
            if (!laywer) {
                var error: errorHandler = {
                    status: 400,
                    message: `You didn't have an account! Please register.`,
                    type: 'Anth Error',

                }
                return res.status(error.status).send(error);
            }
            const isMatch = await bcrypt.compare(password, laywer.password);
            if (!isMatch) {
                var error: errorHandler = {
                    status: 400,
                    message: `The password is incorrect, please try again.`,
                    type: 'Anth Error',

                }
                return res.status(error.status).send(error);
            }
            const payload = {
                laywer: {
                    type: 'lawyer',
                    id: laywer.id
                },
                user: {
                    type: 'lawyer',
                    id: laywer.id
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
            const glaywer = ticket.getPayload();
            const gid = glaywer['sub'];

            let laywer = await Lawyer.findOne({
                gid
            });
            if (!laywer) {
                laywer = await Lawyer.findOne({
                    email: glaywer['email']
                });
                if (laywer) await Lawyer.findByIdAndUpdate(laywer._id, {
                    $set: {
                        gid
                    }
                })

            }
            if (!laywer) {
                var error: errorHandler = {
                    status: 400,
                    message: `You didn't have an account! Please register.`,
                    type: 'Anth Error',

                }
                return res.status(error.status).send(error);
            }
            const payload = {
                laywer: {
                    type: 'lawyer',
                    id: laywer._id
                },
                user: {
                    type: 'lawyer',
                    id: laywer.id
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
        if (req.body.category) {
            let category: Array<any> = req.body.category;
            req.body.category = category.map(x => mongoose.Types.ObjectId(x._id))
        }

        Lawyer.findByIdAndUpdate(req.laywer._id, {
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
        Lawyer.findById(req.params.id, function (err, laywer) {
            if (err) {
                // handle
            }
            res.send(laywer);
        })
    };
    me(req: any, res: Response) {
        Lawyer.findById(req.laywer._id, '-password').populate('category').exec(function (err, laywer) {
            if (err) {
                var error: errorHandler = {
                    status: 400,
                    message: `An error was occured , please try again later.`,
                    type: 'DataBasing',

                }
                return res.status(error.status).send(error);
            }
            laywer.set('type', 'laywer',
                    { strict: false });
            res.status(200).json(laywer);
        })
    };
    delete(req: Request, res: Response) {
        Lawyer.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                // handle
            }
            res.status(200).send('Deleted successfully!');
        })
    };
    uploadImage(req: any, res: Response) {
        try {
            if (req.file) {
                Lawyer.findById(req.laywer._id, function (err, doc: any) {
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

            let c = await Lawyer.findOne({
                "email": email
            });
            if (!c) {
                var error: errorHandler = {
                    status: 400,
                    message: 'Lawyer not found! Please enter your correct email',
                    type: 'Requirement',
                }
                return res.status(error.status).send(error);
            }
            const payload = {
                email,
                type: 'lawyer'
            }
            jwt.sign(
                payload,
                privateKey, {
                expiresIn: 10000,
                algorithm: 'RS256',
            },

                (err, token) => {
                    if (err) throw err;
                    //send email to the client
                    //https://stackoverflow.com/questions/48075688/how-to-decode-the-jwt-encoded-token-payload-on-client-side-in-angular-5
                    return res.status(200).json({
                        status: 200,
                        // token,
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
            if (decoded.type != 'lawyer') throw new Error("Token");
            const salt = await bcrypt.genSalt(10);
            Lawyer.findOneAndUpdate({
                email: decoded.email
            }, {
                $set: {
                    password: await bcrypt.hash(req.body.password, salt)
                }
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
    async getCategory(req: Request, res: Response) {
        try {



            Category.find({}, (err, _resultat) => {
                res.send(_resultat)
            })
            //    res.send(await Category.find());

        } catch (err) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error during saving, please try again later.`,
                type: 'DataBasing',

            }
            return res.status(error.status).send(error);
        }
    }

    // addcategory(req: Request, res: Response) {

    //     // Lawyer.find({ _id: "5ed3d805f399e42330d7f885" },(err,pro)=>{res.send(pro)})$

    //     Lawyer.updateOne({ _id: "5ed3d805f399e42330d7f885" }, { $addToSet: { category: [mongoose.Types.ObjectId("5ee12cc9d8232f45e4ebd52f")] } }, (err, pro) => {
    //         res.send(pro)

    //     })

    // }
    // deletecategory(req: Request, res: Response) {
    //     Lawyer.updateOne({ _id: "5ed3d805f399e42330d7f885" }, { $pull: { category: mongoose.Types.ObjectId("5ee12cc9d8232f45e4ebd52e") } }, (err, pro) => {
    //         res.send(pro)

    //     })
    // }
    async getbycategory(req: Request, res: Response) {
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
            var ids: string = req.query.id.toString();

            let lawyer: any = await Lawyer.find({ category: { "$in": [ids] } }).populate('category').select('-password -__v -zoomDetails')
            for (let index = 0; index < lawyer.length; index++) {

                let rating = await lawyerController.getRating(lawyer._id);
                lawyer[index].set('rating', rating,
                    { strict: false });

                let availability = lawyer[index].availability || availability_default;
                var result = this.getAv(availability);
                lawyer[index].set('availability', result, { strict: false })
            }

            res.send(lawyer);

        } catch (err) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error during saving, please try again later.`,
                type: 'DataBasing',
                all: err

            }
            return res.status(error.status).send(error);

        }


    }


    async getlawyerbyid(req: Request, res: Response) {
        const errors = validationResult(req);
        let validID = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!errors.isEmpty() || !validID) {

            var error: errorHandler = {
                status: 400,
                message: validID ? `We need to specified all attributes` : 'Lawyer id not valid',
                type: 'Requirement',
                all: errors.array()
            }
            return res.status(error.status).send(error);
        }
        try {
            let laywer: any = await Lawyer.findOne({
                _id: mongoose.Types.ObjectId(req.params.id)
            }).select('-password -zoomDetails -birstday').populate('category');
            if (!laywer) {
                var error: errorHandler = {
                    status: 400,
                    message: `Lawyer not exist!.`,
                    type: 'Anth Error',
                }
                return res.status(error.status).send(error);
            }

            if (!laywer.imagePath) laywer.set('imagePath', '/assets/img/profile.png', { strict: false })
            laywer.firstname = laywer.firstname.charAt(0).toUpperCase() + laywer.firstname.slice(1);
            laywer.lastname = laywer.lastname.charAt(0).toUpperCase() + laywer.lastname.slice(1);
            let rating = await lawyerController.getRating(laywer._id);
            laywer.set('rating', rating,
                { strict: false })

            let availability = laywer.availability || availability_default;
            var result = this.getAv(availability);

            laywer.set('availability', result, { strict: false })

            return res.send(laywer);

        } catch (error) {

        }

    }
    async getAvailability(req: Request, res: Response) {
        const errors = validationResult(req);
        let validID = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!errors.isEmpty() || !validID) {

            var error: errorHandler = {
                status: 400,
                message: validID ? `We need to specified all attributes` : 'Lawyer id not valid',
                type: 'Requirement',
                all: errors.array()
            }
            return res.status(error.status).send(error);
        }
        try {
            let laywer: any = await Lawyer.findOne({
                _id: mongoose.Types.ObjectId(req.params.id)
            }).select('availability')
            if (!laywer) {
                var error: errorHandler = {
                    status: 400,
                    message: `Lawyer not exist!.`,
                    type: 'Anth Error',
                }
                return res.status(error.status).send(error);
            }


            let availability = laywer.availability || availability_default;
            var result = this.getAv(availability);
            return res.json(result);


        } catch (error) {

        }
    }
    async dashbordData(req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }



    getAv(availability) {
        var resultat: {} = {};
        Object.keys(availability).forEach(key => {
            resultat[key] = [];
            availability[key].forEach((element, index) => {
                if (element) {
                    var result: string = "";
                    var decimalTime = (index * 30) / 60;
                    decimalTime = decimalTime * 60 * 60;
                    var hours = Math.floor((decimalTime / (60 * 60)));
                    decimalTime = decimalTime - (hours * 60 * 60);
                    var minutes = Math.floor((decimalTime / 60));
                    if (hours < 10) {
                        result += "0";
                    }
                    result += hours + ':';
                    if (minutes < 10) {
                        result += "0";
                    }
                    result += minutes;
                    resultat[key].push(result);


                }

            });
        });
        return resultat;
    }
    static async getRating(idLawyer) {
        let rating: any = await Comments.find({
            lawyer: mongoose.Types.ObjectId(idLawyer)
        })

        let all = rating.length;
        let score = 0;
        let o = 0;
        if (all > 0) {
            for (let i = 0; i < all; i++) {
                let item = rating[i];
                if (item.rating) {
                    score += item.rating; o++;
                }
            }
            score = o != 0 ? score / o : score;
        }
        return {
            score,
            all
        }



    }


    static patternExp(word: string, patern: RegExp[], minLengh = 8) {
        for (let index = 0; index < patern.length; index++) {
            const element = patern[index];
            if (!element.exec(word)) return false;
        }
        if (word.length < minLengh) return false;
        return true;
    }


}