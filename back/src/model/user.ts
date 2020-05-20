interface user{
    profileCreatedOn:Date,
    personalID:number,
    email:string,
    firstname:string,
    lastname:string,
    birstday:Date,
    telephone:string,
    imagePath:string,
    meetingDiary:string,//id  ARRY
    comments:string,//id
    zoomDetails:string
    //facebook? google? user name
    //crditcard details?
}

interface lawyer{
    profileCreatedOn:Date,
    personalID:number,
    email:string,
    firstname:string,
    lastname:string,
    birstday:Date,
    telephone:string,
    companyPhone:string,
    lawyerNum:string,
    AreasOfPractice:string,
    imagePath:string,
    articlesPath:string,
    videosPath:string,
    picturesPath:string,
    comments:string,//id
    meetingDiary:string,//id  ARRY
    payments:string,//id  ARRY
    workArea:string,
    address:string,
    vacancySchedule:string, //Dates and times for meetings
    zoomDetails:string,
    morInfo:string,
    bankDetails:string
  
}


interface meeting{
    user:string,//id
    lawyer:string,//id
    date:Date,
    date_creation:Date,
    modification:[],
    link:string,
    payment:{
        price:number,
        payment:object
    }
}

interface comments{
    user:string,//id
    lawyer:string,//id
    text:string,
    rating:number
}

interface payments{
    user:string,//id
    lawyer:string,//id
    date:Date,
    price:number
}


