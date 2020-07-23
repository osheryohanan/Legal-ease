export interface Imeeting{

  // personalID:number,
  _id?:string|object|any,
  lawyerID:string|object|any,
  userID:string|object|any,
  date:Date,
  hour:Array<any>
  confirmed:number,
  createdAt?:Date,
  zoomDetails?:string,
  paymentinfo?:any,


}

export interface CalendarEvent {

  id?: number,
  title:string,
  start?:string|Date,
  end?:string|Date,
  className?:string,
  description?:string,
  allDay?:boolean

}
