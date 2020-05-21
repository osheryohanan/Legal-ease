


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


interface payments{
    user:string,//id
    lawyer:string,//id
    date:Date,
    price:number
}


