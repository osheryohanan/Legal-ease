import { lawyerRoute } from './routes/lawyer.route';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRoute } from "./routes/user.route";
import { commentsRoute } from "./routes/comments.route";
import { InitiateMongoServer } from "./config/db";
import fs from "fs";
import path from "path";
import { errorHandler } from "./interfaces/error.interfaces";
require("dotenv").config();
const app = express();

//json -POST
app.use(bodyParser.json());
//urlencoded -POST
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(cors());

InitiateMongoServer();

app.use("/user", new userRoute().router);
app.use("/lawyer", new lawyerRoute().router);
app.use("/comments", new commentsRoute().router);



var website=express();
website.get('*', (req, res) => {
try {
  if (fs.existsSync(path.join(__dirname, "../../", "front/dist/lease-ease/index.html"))) {
    const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.gif', '.map'];
    // if (req.ip != '::ffff:37.142.6.113') {
    //   return res.send('you are unauthorized to access this resource from the ip '+req.ip);
    // }
    if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
      return res.sendFile(path.join(__dirname,"../../" ,'front/dist/lease-ease/' ,`${req.url}`));
    } else {
      return res.sendFile(path.join(__dirname, "../../", "front/dist/lease-ease/index.html"));
    }
  }
  throw "err";
} catch (error) {
  res.send("can't resolve front");
}
});
app.use('/',website);



app.all("*", (req, res) => {
  var error: errorHandler = {
    status: 404,
    message: `We can't access to this path`,
    type: "Invalid Path",
  };
  res.status(error.status).send(error);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Listen on port " + PORT);
});
