import { Iuser, User } from './../model/user.model';
import mongoose, { Document } from "mongoose";
import { Request, Response } from 'express';
import { availability_default } from '../helpers/default.availability';
import { validationResult } from "express-validator";
import { errorHandler } from "../interfaces/error.interfaces";
import { Ilawyer, IlawyerD, Lawyer } from '../model/lawyer.model';
import { Meeting, Imeeting, ImeetingD, CalendarEvent } from '../model/meeting.model';
import $dateformat from "dateformat";
import $nearest from "nearest-date";
import { zoomApiController } from "./zoomapi.controller";
export class meetingController {
    async addMeeting(req: Request, res: Response) {
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
            const meeting: Imeeting = req.body;
            let date = new Date(meeting.date);
            meeting.date = $dateformat(date, 'dd/mm/yyyy');

            let meetingModel = new Meeting(meeting);

            // zoomadding*

            let lawyerID:string=meetingModel.lawyerID.toString();
            let userID:string=meetingModel.userID.toString();
            let { start, end } = meetingController.dateStartEnd(meetingModel.date, Array.from(meetingModel.hour).map(v => v[0]));
            let meetingZoomDetail :string= await meetingController.addZoomMeeting(lawyerID,start,userID);
            meetingModel.zoomDetails=meetingZoomDetail;
            meetingModel.save();


            return res.status(200).json({
                type: 'success',
                message: `We are successful save this metting`,
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

    public async checkLawyerAvability(req: Request, res: Response) {


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

            const laywerId: string = req.body.laywerId;


            const date: Date = new Date(req.body.date);
            const day = meetingController.getDay(date);
            let lawyer: IlawyerD = await Lawyer.findOne({ _id: mongoose.Types.ObjectId(laywerId) }).populate('category').select('availability')
            if (!lawyer) throw new Error("Lawyer ID");

            let lawyerAvailability = lawyer.availability || availability_default;
            lawyerAvailability = meetingController.getAv(lawyerAvailability);
            var result: Array<any> = lawyerAvailability[day];
            let meetings: ImeetingD[] = await Meeting.find({
                lawyerID: lawyer._id,
                removed: { $ne: 1 },
                date: $dateformat(date, 'dd/mm/yyyy')
            });
            if (!meetings || meetings.length == 0) return res.status(200).json(result);


            meetings.forEach(meeting => {
                let hourOfMeeting = Array.from(meeting.hour).map(v => v[0]);
                result = result.filter(f => !hourOfMeeting.includes(f));


            })
            return res.send(result);


        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error, please try again later.`,
                type: 'BUG',
                all: error

            }
            return res.status(error.status).send(error);

        }

    }
    public async getMeetingsForUser(req: Request, res: Response) {

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

            let meetings: ImeetingD[] = await Meeting.find({
                userID: mongoose.Types.ObjectId(req.body.userID),
                removed: { $ne: 1 }
            }).populate({ path: 'lawyerID', select: 'firstname lastname _id priceHourly' });

            res.status(200).send(meetings);

        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error, please try again later.`,
                type: 'BUG',
                all: error

            }
            return res.status(error.status).send(error);

        }
    }
    public async getStatsPricesForLawyer(req: any, res: Response) {
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
            let total = [[], []];
            let meetings: Imeeting[] = await Meeting.find({
                lawyerID: mongoose.Types.ObjectId(req.laywer._id),
                removed: { $ne: 1 }
            }).populate({ path: 'userID', select: 'firstname lastname _id' })
                .populate({ path: 'lawyerID', select: 'priceHourly' });

            let totalA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let totalC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

            meetings.forEach((meeting: any) => {
                let priceHourly = meeting.lawyerID[0].priceHourly;
                totalC[meeting.createdAt.getMonth()]++;
                if (priceHourly) {
                    let price: number = (meeting.hour.length) * (priceHourly / 2);
                    totalA[meeting.createdAt.getMonth()] += price;
                }


            })
            res.status(200).json({ totalA, totalC });

        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error, please try again later.`,
                type: 'BUG',
                all: error

            }
            return res.status(error.status).send(error);

        }
    }
    public async getMeetingsForLawyer(req: any, res: Response) {

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

            let meetings: Imeeting[] = await Meeting.find({
                lawyerID: mongoose.Types.ObjectId(req.laywer._id),
                removed: { $ne: 1 }
            }).populate({ path: 'userID', select: 'firstname lastname _id' })
                .populate({ path: 'lawyerID', select: 'priceHourly' });

            let calendarEvent: CalendarEvent[] = [];
            let nextMeeting: Date | string;
            if (meetings&&meetings.length) {
                let today: Date = new Date()
                let dates: Date[] = meetingController.getDateObj(meetings);
                var index = $nearest(dates, today);
                nextMeeting = dates[index];
                if ((today.getTime() - nextMeeting.getTime()) > 0) {
                    nextMeeting = 'No futured Meeting'
                }
            }
            meetings.forEach((meeting: any) => {
                let { start, end } = meetingController.dateStartEnd(meeting.date, Array.from(meeting.hour).map(v => v[0]));
                let cEvent: CalendarEvent = {
                    title: `${meeting.userID[0].firstname} ${meeting.userID[0].lastname}`,
                    start,
                    end,
                    description: meeting._id,
                    allDay: false

                };
                calendarEvent.push(cEvent)
                // meeting.set('CalendarEvent', cEvent,{ strict: false });

            })

            res.status(200).json({ meetings, calendarEvent, nextMeeting });

        } catch (error) {
            var error: errorHandler = {
                status: 500,
                message: `We occured an error, please try again later.`,
                type: 'BUG',
                all: error

            }
            return res.status(error.status).send(error);

        }
    }
    confirmRejectMeeting(req: Request, res: Response) {
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
        Meeting.findByIdAndUpdate(req.params.id, {
            $set: { confirmed: req.body.status }
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
            return res.json(_resultat);
        })


    }
    delete(req: Request, res: Response) {
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
        Meeting.findByIdAndUpdate(req.params.id, {
            $set: { removed: 1 }
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
            return res.json(_resultat);
        })

    }
    updateZoomURL(req: Request, res: Response) {
        {
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
            Meeting.findByIdAndUpdate(req.params.id, {
                $set: { zoomDetails: req.body.url }
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
                return res.json(_resultat);
            })

        }

    }

    static getAv(availability) {
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
    static dateStartEnd(dates: string, plageHour: string[]) {
        let start: Date = new Date();
        let end = new Date();
        let date: any = dates.split('/');
        start.setUTCFullYear(Number(date[2])); start.setUTCMonth(Number(date[1]) - 1); start.setUTCDate(Number(date[0]));
        end.setUTCFullYear(Number(date[2])); end.setUTCMonth(Number(date[1]) - 1); end.setUTCDate(Number(date[0]));
        let startHours: string[] = plageHour[0].split(':');
        let endHours = plageHour[plageHour.length - 1].split(':');
        start.setUTCHours(Number(startHours[0])); start.setUTCMinutes(Number(startHours[1])); start.setUTCSeconds(0o0);
        end.setUTCHours(Number(endHours[0]) - 3); end.setUTCMinutes(Number(endHours[1])); end.setUTCSeconds(0o0);
        return { start, end }
    }
    static getDateObj(meeting: Imeeting[]): Date[] {
        return meeting.map((e) => {
            let start: Date = new Date();
            let date: any = e.date.split('/');
            start.setUTCFullYear(Number(date[2])); start.setUTCMonth(Number(date[1]) - 1); start.setUTCDate(Number(date[0]));
            return start;
        });



    }
    static getDay(date: Date) {
        var weekday = new Array(7);
        weekday[0] = "sun";
        weekday[1] = "mon";
        weekday[2] = "the";
        weekday[3] = "wed";
        weekday[4] = "thu";
        weekday[5] = "fri";
        weekday[6] = "sat";
        return weekday[date.getDay()];
    }
    static isValidDate(d: Date) {
        return d instanceof Date && (d.getTime() === d.getTime());
    }

    static async addZoomMeeting(laywerId:string,date:Date,userID:string): Promise<string>{
        try {
           var lawyerInfo:Ilawyer=await Lawyer.findOne({_id:mongoose.Types.ObjectId(laywerId)})
           var userInfo:Iuser=await User.findOne({_id:mongoose.Types.ObjectId(userID)})
           if(lawyerInfo&& !lawyerInfo.zoomDetails){
                return "";
           }
           let zoomD:any= lawyerInfo.zoomDetails;
           var zoomapi=new zoomApiController();
           let getNewToken=await zoomapi.refreshAccessToken(zoomD.refresh_token,laywerId);
           let access_token:string=getNewToken.data.access_token;
           let meetingDetail=await zoomapi.addMeeting(access_token,date,`${userInfo.firstname} ${userInfo.lastname}`);
           return meetingDetail.join_url;
            
        } 
        catch (error) {
            return '';
        }

    }


}