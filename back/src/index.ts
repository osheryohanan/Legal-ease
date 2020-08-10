import { zoomApiController } from './controller/zoomapi.controller';
import { lawyerRoute } from './routes/lawyer.route';
import { meetingsRoute } from './routes/meeting.route';
import express, { Application, Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRoute } from "./routes/user.route";
import { commentsRoute } from "./routes/comments.route";
import { InitiateMongoServer } from "./config/db";
import fs from "fs";
import path from "path";
import vhost from "vhost";
import { errorHandler } from "./interfaces/error.interfaces";
require("dotenv").config();
const app: Application = express();

//json -POST
app.use(bodyParser.json());
//urlencoded -POST
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use(express.static("public"));
app.use(cors());

InitiateMongoServer();

app.use("/user", new userRoute().router);
app.use("/lawyer", new lawyerRoute().router);
app.use("/comments", new commentsRoute().router);
app.use("/meeting", new meetingsRoute().router);

var test = new zoomApiController();
app.get('/test/api', async (req, res) => {

  try {
    let tokens = await test.getAccessToken(req.query.code)
    let user = await test.checkuser(tokens.access_token)
    res.send({ user, tokens });
  } catch (error) {
    res.send({ error: 'true', type: error })
  }
})
app.get('/test/refresh_token', async (req, res) => {

  try {
    let tokens = await test.refreshAccessToken(req.query.refresh_token);
    let sawait = await test.saveRefreshToken(tokens, '5ed3d805f399e42330d7f885')
    res.send({ tokens, sawait });
  } catch (error) {
    res.send({ error: 'true', type: error })
  }
})

app.get('/test/meeting', async (req, res) => {

  try {
    let meeing = await test.addMeeting()
    res.send({ meeing });
  } catch (error) {
    res.send({ error: 'true', type: error })
  }
})
app.get('/test/mymeeting', async (req, res) => {

  try {
    let meeing = await test.myMeeting(req.query.access_token)
    res.send({ meeing });
  } catch (error) {
    res.send({ error: 'true', type: error })
  }
})


var photo: Application = express();
photo.get('*', (req, res) => {
  try {

    const allowedExt = ['.ico', '.png', '.jpg', '.jpeg', '.svg', '.gif'];
    if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
      if (fs.existsSync(path.join(__dirname, "../", 'uploads/images', `${req.url}`))) {
        return res.sendFile(path.join(__dirname, "../", 'uploads/images', `${req.url}`));

      }
    }
    throw new Error("");


  } catch (error) {
    res.status(404).send();
  }
});
app.use('/photo/', photo)

var website: Application = express();
website.get('*', (req, res) => {
  // let WebsitePath={return:"../../",path:'comming/'}
  let WebsitePath={return:"../../",path:'front/dist/lease-ease/'}
  try {
    if (fs.existsSync(path.join(__dirname, WebsitePath.return, `${WebsitePath.path}index.html`))) {
      const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.gif', '.map'];
      // if (req.ip != '::ffff:37.142.6.113') {
      //   return res.send('you are unauthorized to access this resource from the ip '+req.ip);
      // }
      if (allowedExt.filter((ext) => req.url.indexOf(ext) > 0).length > 0) {
        return res.sendFile(path.join(__dirname, "../../", `${WebsitePath.path}`, `${req.url}`));
      } else {
        return res.sendFile(path.join(__dirname, "../../", `${WebsitePath.path}index.html`));
      }
    }
    throw "err";
  } catch (error) {
    res.send("can't resolve front");
  }
});




if (process.env.ENV == 'dev') {
  app.use('/', website);


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


}
else {
  app.use(vhost('legal-ease.co.il', website)); // Serves all subdomains via Redirect app
  
  app.all("*", (req, res) => {
    var error: errorHandler = {
      status: 404,
      message: `We can't access to this path`,
      type: "Invalid Path",
    };
    res.status(error.status).send(error);
  });
  app.use(vhost('api.legal-ease.co.il', app)); // Serves all subdomains via Redirect app

  require('greenlock-express').create({
    email: 'Oad.sh551@gmail.com'     // The email address of the ACME user / hosting provider
    , agreeTos: true                    // You must accept the ToS as the host which handles the certs
    , configDir: './certi'      // Writable directory where certs will be saved
    , communityMember: true             // Join the community to get notified of important updates
    , telemetry: true                   // Contribute telemetry data to the project
    , store: require('greenlock-store-fs')
    , app

  }).listen(80, 443);

}



