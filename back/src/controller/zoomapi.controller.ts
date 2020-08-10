import { Ilawyer } from './../model/lawyer.model';
import { check, validationResult } from 'express-validator';
import axios from "axios";
import { Lawyer } from '../model/lawyer.model';
import { errorHandler } from '../interfaces/error.interfaces';
import { Response, Request } from 'express';
import mongoose from "mongoose";
// var request=require("request");

export class zoomApiController {

    CLIENTSERVE: String;
    constructor() {


        this.CLIENTSERVE = process.env.ENV == 'dev' ? "RDU3TzdOWG1UUEdFYWJsNEF6ZTJROmxZOWdhWDFGVDN4SjNyYWFZUnljWHJhSm9ZUHFocTJ1" : 'NTJEbFlIdzNUVDJUV21CMjZQMElROk5HMm4xdDVZMTBBcVcwN3BjSDJrbUZYa1ZNWjBtMTVN'

    }


    async updateUser(req: Request, res: Response) {
        // res.send(process.env)
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
            var access_token = await this.getAccessToken(req.query.code);
            if (!access_token.access_token) throw "Error zoom api";
            var userInfo = await this.getUserInfo(access_token.access_token);
            var email = userInfo.email;
            Lawyer.findOneAndUpdate(
                { email },
                {
                    $set:
                        { zoomDetails: access_token }
                }
                , function (err, _resultat) {
                    if (err) {
                        var error: errorHandler = {
                            status: 500,
                            message: `We occured an error during saving, please try again later.`,
                            type: 'DataBasing',
                            all: err

                        }
                        return res.status(error.status).send(error);
                    }
                    if (!_resultat) {
                        return res.send('<a href="https://legal-ease.co.il/register">Please register first</a> <script>setTimeout(() => {window.location.href = "https://legal-ease.co.il/register";}, 6000);</script>')

                    }
                    return res.send('<a href="https://legal-ease.co.il/lawyer/profile">Saved to your account</a><script>setTimeout(() => {window.location.href = "https://legal-ease.co.il/lawyer/profile";}, 3000);</script>');

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
    async refreshToken(req: Request, res: Response) {
        try {
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
           let id:string=req.query.lawyer.toString();
           let lawyer:Ilawyer=await Lawyer.findById(mongoose.Types.ObjectId(id));
           if(!lawyer) throw new Error("Lawyer Not found");
           
    
           res.send(await this.refreshAccessToken(lawyer.zoomDetails.refresh_token,id))
            

        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error during saving, please try again later.`,
                type: 'ZoomApi',
                all: error

            }
            return res.status(error.status).send(error);
        }

    }

    async getAccessToken(code) {
        try {
            let options = {
                method: 'POST',
                url: 'https://api.zoom.us/oauth/token',
                qs: {
                    grant_type: 'authorization_code',
                    //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
                    code: code,

                    //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
                    redirect_uri: process.env.ENV == 'dev' ? 'http://localhost:8080/zoomapi/update' : 'https://legal-ease.co.il/zoomapi/update'
                },
                headers: {
                    /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                     **/
                    Authorization: `Basic ${this.CLIENTSERVE}`
                }
            };
            var res: any = await axios.request({ method: 'POST', url: options.url, headers: options.headers, params: options.qs });
            if (res.data.access_token) {
                return res.data;
            }
        }
        catch (error) {
            throw error;

        }

    }

    async getUserInfo(access_token) {
        try {
            var options = {
                method: 'GET',
                url: 'https://api.zoom.us/v2/users/me',
                headers: {
                    /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                     **/
                    Authorization: 'Bearer ' + access_token
                },

            };
            var res: any = await axios.request({ method: 'GET', url: options.url, headers: options.headers })
            if (res.data.id) {
                return res.data;
            }
            throw res;
        } catch (error) {
            throw error;

        }

    }


    async refreshAccessToken(refresh_token, lawyerID) {
        try {
            var options = {
                method: 'GET',
                url: 'https://zoom.us/oauth/token',
                headers: {
                    Authorization: 'Basic  ' + this.CLIENTSERVE
                },
                qs: {
                    grant_type: 'refresh_token',
                    refresh_token
                }
            };
            var res: any = await axios.request({ method: 'POST', headers: options.headers, url: options.url, params: options.qs });
            if (res.data.access_token) {
                let data = await Lawyer.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(lawyerID) },
                    {
                        $set:
                            { zoomDetails: res.data }
                    });
                return { data: res.data, update: data };
            }
            throw res;
        } catch (error) {
             Lawyer.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(lawyerID) },
                {
                    $unset:
                        { zoomDetails: 1 }
                });
            throw error;

        }
    }

    async addMeeting(access_token:string,date:Date,clientName:string) {
        var options = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                Authorization: `Bearer ${access_token}`
            },

        };
        var form = {
            "topic": `Meeting with ${clientName}`,
            "type": 2,
            "start_time": date.toISOString(),
            "duration": 30,
            "timezone": "Asia/Jerusalem",
            "password": "legalEase1",
            "agenda": "qs",
            "settings": {
                "host_video": true,
                "audio": "both",
                "auto_recording": true,

            }
        }
        return axios.request({ method: 'POST', headers: options.headers, url: options.url, data: form })
            .then(function (response) {
                return response.data

            })
            .catch(function (error) {
                throw error;

            })



    }
    async myMeeting(accesstoken) {
        var options = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                Authorization: "Bearer " + accesstoken
            },

        };
        return axios.request({ method: 'GET', headers: options.headers, url: options.url })
            .then(function (response) {
                return response.data

            })
            .catch(function (error) {
                throw error;

            })


    }
    async saveRefreshToken(data, userid) {
        return Lawyer.findByIdAndUpdate(userid, {
            $set: { zoomDetails: data }
        }, function (err, d) {
            if (err) {
                var error: errorHandler = {
                    status: 500,
                    message: `We occured an error during saving, please try again later.`,
                    type: 'DataBasing',
                    all: err

                }
                throw error;
            }
            return d;
        });
    }

}