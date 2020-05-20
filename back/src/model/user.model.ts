import  {Schema,model} from 'mongoose';
export interface user{
    email:string,
    firstname:string,
    lastname:string,
    birstday:Date,
    telephone:string,
    imagePath:string

}

let userSchema:Schema = new Schema({
    email:{type: Schema.Types.String ,required: true},
    firstname:{type: Schema.Types.String ,required: true},
    lastname:{type: Schema.Types.String ,required: true},
    birstday:{type: Schema.Types.Date ,required: true},
    telephone:{type: Schema.Types.String ,required: true},
    imagePath:{type: Schema.Types.String ,required: true},

});


export let User= model('users', userSchema);

