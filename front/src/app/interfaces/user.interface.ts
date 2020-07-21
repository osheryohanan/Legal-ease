export interface Iuser{

  _id:string,
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
