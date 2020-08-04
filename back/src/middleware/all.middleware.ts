import mongoose from 'mongoose';
import { errorHandler } from "../interfaces/error.interfaces";
import multer from 'multer';
import path from 'path';



export var checkDbConnection = (req, res, next) => {

  if (mongoose.connection.readyState == 1) {
    return next();
  }
  var error: errorHandler = {
    status: 500,
    message: `Error server please try later`,
    type: 'DataBasing'
  }
  return res.status(error.status).send(error);
}

export var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      try {
        cb(null, path.join(__dirname, '../../', 'uploads/images'))

      } catch (error) {
        console.error('err upload' + error);

      }
    },
    filename: function (req: any, file, cb) {
      try {
        if (req.user) {
          let filename = req.user._id + path.extname(file.originalname);
          return cb(null, filename);
        }
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      } catch (error) {
        console.error('err upload fn' + error);

      }
    }
  })
})