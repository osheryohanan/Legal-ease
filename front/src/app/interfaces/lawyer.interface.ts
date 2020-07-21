export interface Ilawyer{
  email:string,
  _id?:string,
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

export interface Rating{
  score:number,
  all:number
}
