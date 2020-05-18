
import mongoose from 'mongoose';
require('dotenv').config();

var username=process.env.DB_USERNAME||'';
var password=process.env.DB_PASSWORD||'';
var port=process.env.DB_PORT||27017;
var url=process.env.DB_URL||'';
var name=process.env.DB_NAME||'';

const MONGOURI = `mongodb://${username}:${password}@${url}:${port}/${name}`;


export const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:false
    });
    // console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};


