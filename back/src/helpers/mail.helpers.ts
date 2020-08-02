import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path  from 'path';
import { promises, resolveTxt } from 'dns';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'legaleaseb7@gmail.com',
      pass: 'e3ep8r2m' // naturally, replace both with your real credentials or an application-specific password
    }
  });

export class EmailTransporter {
  
    static async forgotPassword(email,token){
        return new Promise(async (resolve, reject) => {
        

          try {
            const emailT=await ejs.renderFile(path.resolve( __dirname, "./mail/forgotPassword.ejs"), { token: token })
            const mailOptions = {
                from: 'legaleaseb7@gmail.com',
                to: email,
                subject: 'Reset password',
                html:emailT
              };
             transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  throw error;
                } else {
                  resolve(info);
                }
              });
              
          } catch (error) {
              reject(error);
              
          }
        })
          

    }
}