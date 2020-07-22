import mongoose, { Schema, Document,} from 'mongoose';



export interface Imeeting{
    
    // personalID:number,
    lawyerID:string|mongoose.Types.ObjectId,
    userID:string|mongoose.Types.ObjectId,
    date:string,
    hour:Array<any>
    confirmed:number,
    createdAt?:Date,
    zoomDetails?:string,
    paymentinfo?:any,


}

export interface CalendarEvent {
    
            id?: number,
            title:string,
            start?:string,
            end?:string,
            className?:string,
            description?:string,
            allDay?:boolean
          
}

export interface ImeetingD extends Imeeting, Document{

}




let meetingSchema:Schema = new Schema({
    userID: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lawyerID : [{ type:Schema.Types.ObjectId, ref: 'lawyers' }],
    date:{type: Schema.Types.String,required: true},
    hour:{type: Schema.Types.Array,required: true},
    confirmed:{type: Schema.Types.Number ,required: true, default:-1},
    createdAt: {type: Date,default: Date.now()},
    zoomDetails:{},
    paymentinfo:{},
    removed:{type: Schema.Types.Number ,required: true, default:0},
});


export let Meeting= mongoose.model<ImeetingD>('meetings', meetingSchema);

