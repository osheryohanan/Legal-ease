import mongoose, { Document } from "mongoose";
import { Request, Response } from 'express';
import { availability_default } from '../../../front/src/app/lawyer/pages/availability/default.availability';
import { validationResult } from "express-validator";
import { errorHandler } from "../interfaces/error.interfaces";
import { Ilawyer, IlawyerD, Lawyer } from '../model/lawyer.model';
import { Meeting, Imeeting, ImeetingD } from '../model/meeting.model';
import $dateformat from "dateformat";

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
            meetingModel.save();
            res.status(200).json({
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
        }, function (err, product) {
            if (err) {
                var error: errorHandler = {
                    status: 500,
                    message: `We occured an error during saving, please try again later.`,
                    type: 'DataBasing',
                    all: err

                }
                return res.status(error.status).send(error);

            }
            return res.json(product);
        })

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


}