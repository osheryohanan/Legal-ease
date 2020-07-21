import mongoose, { Schema, Document } from 'mongoose';



export interface Iuser{
    // id?:string|mongoose.Types.ObjectId,
    // personalID:number,
    email:string,
    firstname:string,
    lastname:string,
    password:string,
    birstday?:Date,
    phone:string,
    imagePath?:string,
    meetingDiary?:string,//id  ARRY
    comments?:string,//id
    zoomDetails?:string
    createdAt?:Date,
    gid?:string,
    //facebook? google? user name
    //crditcard details?
}

export interface IuserD extends Iuser, Document{

}




let userSchema:Schema = new Schema({
    email:{type: Schema.Types.String ,required: true},
    password:{type: Schema.Types.String ,required: true},
    firstname:{type: Schema.Types.String ,required: true},
    lastname:{type: Schema.Types.String ,required: true},
    birstday:{type: Schema.Types.Date},
    phone:{type: Schema.Types.String ,required: true},
    imagePath:{type: Schema.Types.String ,required: true,default:'default.logo'},
    meetingDiary:[{type: Schema.Types.ObjectId}],//id  ARRY
    zoomDetails:{},
    createdAt: {type: Date,default: Date.now()},
    gid:{type: Schema.Types.String },
    facebook:{type: Schema.Types.String },

});


export let User= mongoose.model<IuserD>('users', userSchema);

