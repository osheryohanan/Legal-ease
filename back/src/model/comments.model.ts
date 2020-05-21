import  {Schema,model} from 'mongoose';



export interface Icomments{
 
}

let commentsSchema:Schema = new Schema({
    
    user: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lawyer: [{ type:Schema.Types.ObjectId, ref: 'lawyers' }],
    text:{type: Schema.Types.String},
    rating:{type: Schema.Types.Number ,required: true},

});


export let Comments= model('comments', commentsSchema);

