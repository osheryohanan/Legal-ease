interface user{
    email:string,
    firstname:string,
    lastname:string,
    birstday:Date,
    telephone:string,
    imagePath:string

}







interface meeting{
    user:string,//id
    layer:string,//id
    date:Date,
    date_creation:Date,
    modification:[],
    link:string,
    payment:{
        price:number,
        payment:object
    }
}


