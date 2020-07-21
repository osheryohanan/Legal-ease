export interface Imeeting{

  // personalID:number,
  _id:string|object|any,
  lawyerID:string|object|any,
  userID:string|object|any,
  date:Date,
  hour:Array<any>
  confirmed:number,
  createdAt?:Date,
  zoomDetails?:string,
  paymentinfo?:any,


}
