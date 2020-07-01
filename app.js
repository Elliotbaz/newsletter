//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.get('/', function(req,res){
  res.sendFile(__dirname+ '/signup.html');
});

app.post('/',function(req, res){
  var email = req.body.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;

var data= {
  members:[{
    email_address: email,
    status: 'subscribed',
    merge_fields:{
      FNAME: firstName,
      LNAME: lastName
    }
  }]
};

var jasonData = JSON.stringify(data);

var url = 'https://us10.api.mailchimp.com/3.0/lists/2fe2152aad';
var option = {
  method:'POST',
  auth: 'Elliotb:5ec0089976e535629de3cbd233c0910e-us10'
};

const request= https.request(url, option, function(response){

  if (response.statusCode === 200){
    res.sendFile(__dirname+ '/success.html');
  }else {
    res.sendFile(__dirname+ '/fail.html');
  }


  response.on('data', function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jasonData);
request.end();
});











// 5ec0089976e535629de3cbd233c0910e-us10
//2fe2152aad

app.listen(process.env.PORT || 3000,function(){
  console.log('server is listening to Port 3000');
});
