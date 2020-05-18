import express from 'express';
import cors from 'cors';
import multer from 'multer';
var upload=multer();
import bodyParser from 'body-parser';
import { userRoute } from "./routes/user.route";




const app=express();

//json -POST
app.use(bodyParser.json());
//urlencoded -POST
app.use(bodyParser.urlencoded(
    {extended:true}
));
//FORMDATA -POST
// app.use(upload.array());
app.use(cors());

app.use('/user',new userRoute().router);

app.all("*",(req,res)=>{
    res.send('ok');
});





const PORT=8080;
app.listen(PORT,()=>{
    console.log('lisen on port'+PORT);
})