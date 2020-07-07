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
    morInfo?:string,
    category?:object,
    availability?:object,
    rating?:object,
    priceHourly?:number,
    
    articlesPath?:string, //many
    videosPath?:string, //many
    picturesPath?:string, //many

    meetingDiary?:string,//id  ARRY Cest rendez vous faire base de donner a cote ObjectID
    workArea?:string, //Darom Tsafon



    
    
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
    imagePath:{type: Schema.Types.String ,default:'/assets/img/profile.png'},
    birstday:{type: Schema.Types.Date},
    createdAt: {type: Date,default: Date.now()},
    gid:{type: Schema.Types.String },
    morInfo:{type: Schema.Types.String },
    zoomDetails:{type: Object },
    availability:{type: Object },
    priceHourly:{type: Object },
    category:[{ type : Schema.Types.ObjectId, ref: 'categories' }],

});


export let Lawyer= model('lawyers', lawyerSchema);

