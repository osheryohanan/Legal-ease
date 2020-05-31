import  {Schema,model} from 'mongoose';

export interface Ilawyer{
    email:string,
    firstname:string,
    lastname:string,
    birstday?:Date,
    phone?:string,
    companyPhone?:string,
    imagePath?:string,
    lawyerNum:string,
    createdAt?:Date,
    address?:string,
    password:string,
    gid?:string,


    
    articlesPath?:string,
    videosPath?:string,
    picturesPath?:string,
    AreasOfPractice?:string,
    comments?:string,//id
    meetingDiary?:string,//id  ARRY
    payments?:string,//id  ARRY
    workArea?:string,
    vacancySchedule?:string, //Dates and times for meetings
    zoomDetails?:string,
    morInfo?:string,
    bankDetails?:string
  
}

export interface IlawyerD extends Ilawyer, Document{

}





let lawyerSchema:Schema = new Schema({
    email:{type: Schema.Types.String ,required: true},
    password:{type: Schema.Types.String ,required: true},
    firstname:{type: Schema.Types.String ,required: true},
    lastname:{type: Schema.Types.String ,required: true},
    lawyerNum:{type: Schema.Types.String ,required: true},
    address:{type: Schema.Types.String },
    phone:{type: Schema.Types.String },
    companyPhone:{type: Schema.Types.String ,},
    imagePath:{type: Schema.Types.String ,},
    birstday:{type: Schema.Types.Date},
    createdAt: {type: Date,default: Date.now()},
    gid:{type: Schema.Types.String },

});


export let Lawyer= model('lawyers', lawyerSchema);

