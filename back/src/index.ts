import express from 'express';
import cors from 'cors';
// var upload=multer();
import bodyParser from 'body-parser';
import { userRoute } from "./routes/user.route";
import { InitiateMongoServer } from './config/db';
require('dotenv').config();


import { errorHandler  } from "./interfaces/error.interfaces";



const app=express();

//json -POST
app.use(bodyParser.json());
//urlencoded -POST
app.use(bodyParser.urlencoded(
    {extended:true}
));
//FORMDATA -POST
// app.use(upload.any());
app.use(express.static('public'));
app.use(cors());


// InitiateMongoServer();


app.use('/user',new userRoute().router);

app.all("*",(req,res)=>{
    var error:errorHandler={
        status:404,
        message:`We can't access to this path`,
        type:'Invalid Path'
    }
    res.status(error.status).send(error);
});





const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log('Listen on port '+PORT);
})