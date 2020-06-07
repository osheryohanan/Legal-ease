import { check } from 'express-validator';
import axios from "axios";
import { Lawyer } from '../model/lawyer.model';
import { errorHandler } from '../interfaces/error.interfaces';
// var request=require("request");

export class zoomApiController {
    CLIENTSERVE="RDU3TzdOWG1UUEdFYWJsNEF6ZTJROmxZOWdhWDFGVDN4SjNyYWFZUnljWHJhSm9ZUHFocTJ1";
    constructor() {

    }
  

    async getAccessToken(code){
        const newLocal = this.CLIENTSERVE;
        let options = {
            method: 'POST',
            url: 'https://api.zoom.us/oauth/token',
            qs: {
                grant_type: 'authorization_code',
                //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
                code: code,
        
                //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
                redirect_uri: 'http://localhost:4200'
            },
            headers: {
                /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                 **/
                Authorization: 'Basic RDU3TzdOWG1UUEdFYWJsNEF6ZTJROmxZOWdhWDFGVDN4SjNyYWFZUnljWHJhSm9ZUHFocTJ1'
            }
        };
        var res:any =await axios.request({method:'POST',url:options.url,headers:options.headers,params:options.qs});
        if (res.data.access_token){
            return res.data;
        }
        throw res;
        
    }

    async checkuser(access_token){
        var options = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me',
            headers: {
                /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
                 **/
                Authorization: 'Bearer ' + access_token
            },
            
        };
        var res:any=await axios.request({method:'GET',url:options.url,headers:options.headers})
        if (res.data.id){
            return res.data;
        }
        throw res;
    }


    async refreshAccessToken(refresh_token){
        var options = {
            method: 'GET',
            url: 'https://zoom.us/oauth/token',
            headers: {
                Authorization: 'Basic  ' +this.CLIENTSERVE 
            },
            qs:{
                grant_type:'refresh_token',
                refresh_token
            }
        };
        var res:any =await axios.request({method:'POST',headers:options.headers,url:options.url,params:options.qs});
        if (res.data.access_token){
            return res.data;
        }
        throw res;
    }

    async addMeeting(){
        var options = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiJjMTE3ZTcxOC1hMjAwLTQzYTgtYWRlMC02YzdiY2JiYTMyZDkifQ.eyJ2ZXIiOiI2IiwiY2xpZW50SWQiOiJENTdPN05YbVRQR0VhYmw0QXplMlEiLCJjb2RlIjoiZFVlNXRQV3dVOV9nX2Q3dU9kTFNVZXo5dEcyWkdOQ01BIiwiaXNzIjoidXJuOnpvb206Y29ubmVjdDpjbGllbnRpZDpENTdPN05YbVRQR0VhYmw0QXplMlEiLCJhdXRoZW50aWNhdGlvbklkIjoiNjAyODUyYjI0MzdkMTRkNmMwMTgwMjBiNjZmYTJmYzYiLCJ1c2VySWQiOiJnX2Q3dU9kTFNVZXo5dEcyWkdOQ01BIiwiZ3JvdXBOdW1iZXIiOjAsImF1ZCI6Imh0dHBzOi8vb2F1dGguem9vbS51cyIsImFjY291bnRJZCI6ImhBY2hrdnhmVHZhNEpaVnRvcXBPWlEiLCJuYmYiOjE1OTE1NTc5NzYsImV4cCI6MTU5MTU2MTU3NiwidG9rZW5UeXBlIjoiYWNjZXNzX3Rva2VuIiwiaWF0IjoxNTkxNTU3OTc2LCJqdGkiOiIwMTE2YmU5Ny0zMGM4LTQxMzktODUwNy1mNjMwYmRkMjE5MzkiLCJ0b2xlcmFuY2VJZCI6NX0.YdaKMk-ZwrSzocuddar47sc41xWBZ1fyWNS1Y4f_DJ80bW5AFBs7Mg-YMPV9ekjSr2EXq69PcXJJoi-HSx0FHg"
            },
            
        };
        var form={
            "topic": "Meeting with LAWER for Client",
            "type": 2,
            "start_time": "2020-06-08T19:13:39Z",
            "duration": 30,
            "timezone": "Asia/Jerusalem",
            "password": "legalEase1",
            "agenda": "qs",
            "settings": {
              "host_video": true,
              "audio": "both",
              "auto_recording": true,
             
            }
          }
          return axios.request({method:'POST',headers:options.headers,url:options.url,data:form})
          .then(function (response) {
            return response.data
           
          })
          .catch(function (error) {
              throw error;
              
          })
         
      
          
    }
    async myMeeting(accesstoken){
        var options = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                Authorization: "Bearer "+accesstoken
            },
            
        };
        return axios.request({method:'GET',headers:options.headers,url:options.url})
          .then(function (response) {
            return response.data
           
          })
          .catch(function (error) {
              throw error;
              
          })
         
        
    }
    async saveRefreshToken(data,userid){
        return Lawyer.findByIdAndUpdate(userid, {
            $set: {zoomDetails:data}
        }, function (err, d) {
            if (err) {
                var error: errorHandler = {
                    status: 500,
                    message: `We occured an error during saving, please try again later.`,
                    type: 'DataBasing',
                    all: err

                }
                throw error;
            }
            return d;
        });
    }

}