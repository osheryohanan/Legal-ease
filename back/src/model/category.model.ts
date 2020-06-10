import  {Schema,model} from 'mongoose';



export interface Icategory{
    
    name:string,
   


}

export interface IcategoryD extends Icategory, Document{

}




let categorySchema:Schema = new Schema({
    name: { type: Schema.Types.String,required: true,  }

});


export let Category= model('categories', categorySchema);

