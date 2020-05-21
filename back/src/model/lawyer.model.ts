import  {Schema,model} from 'mongoose';

interface lawyer extends Document{
    email:string,
    firstname:string,
    lastname:string,
    birstday?:Date,
    telephone:string,
    companyPhone:string,
    imagePath:string,
    lawyerNum:string,
    createdAt:Date,
    address:string,

    articlesPath:string,
    videosPath:string,
    picturesPath:string,
    AreasOfPractice:string,
    comments:string,//id
    meetingDiary:string,//id  ARRY
    payments:string,//id  ARRY
    workArea:string,
    vacancySchedule:string, //Dates and times for meetings
    zoomDetails:string,
    morInfo:string,
    bankDetails:string
  
}





let lawyerSchema:Schema = new Schema({
    email:{type: Schema.Types.String ,required: true},
    firstname:{type: Schema.Types.String ,required: true},
    lastname:{type: Schema.Types.String ,required: true},
    birstday:{type: Schema.Types.Date},
    telephone:{type: Schema.Types.String ,required: true},
    companyPhone:{type: Schema.Types.String ,required: true},
    imagePath:{type: Schema.Types.String ,required: true},
    createdAt: {type: Date,default: Date.now()},
    lawyerNum:{type: Schema.Types.String ,required: true},

});


export let Lawyer= model('lawyers', lawyerSchema);

