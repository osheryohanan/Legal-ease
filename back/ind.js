var request = require("request");

var options = {
    method: 'POST',
    url: 'https://api.zoom.us/oauth/token',
    qs: {
        grant_type: 'authorization_code',
        //The code below is a sample authorization code. Replace it with your actual authorization code while making requests.
        code: '23JNfWkwgE_g_d7uOdLSUez9tG2ZGNCMA',

        //The uri below is a sample redirect_uri. Replace it with your actual redirect_uri while making requests.
        redirect_uri: 'http://localhost:4200'
    },
    headers: {
        /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
         **/
        Authorization: 'Basic RDU3TzdOWG1UUEdFYWJsNEF6ZTJROmxZOWdhWDFGVDN4SjNyYWFZUnljWHJhSm9ZUHFocTJ1'
    }
};

request(options, function (error, response, body) {
    data=JSON.parse(body)

    if (error) throw new Error(error);
    var options = {
        method: 'GET',
        url: 'https://api.zoom.us/v2/users/me',
        headers: {
            /**The credential below is a sample base64 encoded credential. Replace it with "Authorization: 'Basic ' + Buffer.from(your_app_client_id + ':' + your_app_client_secret).toString('base64')"
             **/
            Authorization: 'Bearer ' + data.access_token
        }
    };
    request(options,function (error, response, body) {
        console.log(body);
        
        
    })
});