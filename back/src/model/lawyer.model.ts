import  {Schema,model} from 'mongoose';

export interface Ilawyer{
    email:string,
    firstname:string,
    lastname:string,
    birstday?:Date,
    phone:string,
    companyPhone?:string,
    imagePath?:string,
    lawyerNum:string,
    createdAt?:Date,
    address?:string,
    password:string,
    gid?:string,


    
    articlesPath?:string, //many
    videosPath?:string, //many
    picturesPath?:string, //many

    category?:string, // Cest quoi les troum? ObjectID

    meetingDiary?:string,//id  ARRY Cest rendez vous faire base de donner a cote ObjectID

    workArea?:string, //Darom Tsafon

    morInfo?:string,



    
    payments?:string,//id  ARRY
    bankDetails?:string
    vacancySchedule?:string, //Dates and times for meetings
    zoomDetails?:string,


  
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
    phone:{type: Schema.Types.String,required: true },
    companyPhone:{type: Schema.Types.String ,},
    imagePath:{type: Schema.Types.String ,},
    birstday:{type: Schema.Types.Date},
    createdAt: {type: Date,default: Date.now()},
    gid:{type: Schema.Types.String },

});


export let Lawyer= model('lawyers', lawyerSchema);

