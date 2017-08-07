// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://testshawn:abcd1111@ds034807.mlab.com:34807/testshawn'; 
// Connection URL. This is where your mongodb server is running.
var mongoose=require("mongoose"); 
mongoose.connect(url);
var userSchema=mongoose.Schema({original_url:{type:String},short_url:{type:String}});
var Url=mongoose.model("url",userSchema);
var regex = /^(https?):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;
var arr;
var num=Math.floor(Math.random()*9000+1000);
var found=true;

var curl="https://something3.glitch.me/"; 

//var newUser=new User({username:'xxx'});
//newUser.save();
//(Focus on This Variable)
     
//(Focus on This Variable)


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));

// app.get("/new/:pam",function(request,response){
//   response.end("hahaha");
//   if(!regex.test(request.params.pam)){
//     response.end("not a valid url, resend again!")
//   }
//   else{
//     response.end("valid url!");
//   }
//   var o={original_url:request.params.pam,short_url:curl+num};
//   arr.push(request.path,request.basepath,request.originalpath)
//   response.json(arr);
//   response.end();
// });
app.get(/\/new\/(https?):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/,function(request,response){
  //var u=new Url({original_url:})
  num=Math.floor(Math.random()*9000+1000);
  Url.find().exec(function(err,users){arr=users.map((x)=>(x.short_url))});
  console.log(arr);
  while(arr && arr.indexOf(num)>0){
    num=Math.floor(Math.random()*9000+1000)
  }
  var o={original_url:request.path.slice(5),short_url:curl+num}
  var newUrl=new Url(o);
  newUrl.save();
  response.json(o);
  response.end("haha");
})

// http://expressjs.com/en/starter/basic-routing.html
app.get(/\/(\d){4}/, function (req, response) {
    //response.json(arr);
  var u=curl+req.originalUrl.slice(1);
  //response.end(u);
  console.log("comecomehere")
  console.log(u);
  Url.findOne({short_url:u}).exec(function(err,x){
    //console.log(x.original_url);
    
    if(x){
      response.redirect(x.original_url);
    }
    else {
      response.end("short url not found!");
    }
  })
  //response.end(req.protocol + '://' + req.get('host') + req.originalUrl);
  
});
app.get("/",function(req,res){
  res.sendFile(__dirname+"/views/index.html");
})

app.use(function(req,res,next){
  res.end("invalid url, resend again!");
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
