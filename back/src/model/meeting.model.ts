import  {Schema,model} from 'mongoose';



export interface Imeeting{
    
    // personalID:number,
    layerID:string,
    userID:string,
    date:Date,
    confirmed:number,
    createdAt?:Date,
    zoomDetails?:string,
    paymentinfo?:any,


}

export interface ImeetingD extends Imeeting, Document{

}




let meetingSchema:Schema = new Schema({
    userID: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    layerID : [{ type:Schema.Types.ObjectId, ref: 'lawyers' }],
    date:{type: Schema.Types.Date,required: true},
    confirmed:{type: Schema.Types.Number ,required: true, default:-1},
    createdAt: {type: Date,default: Date.now()},
    zoomDetails:{},
    paymentinfo:{},
});


export let Meeting= model('meetings', meetingSchema);

