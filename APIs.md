# API - Application Programming Interfaces

Use [**https**](https://nodejs.org/api/https.html#https_https_get_url_options_callback) node.js native module and [**body-parser**](https://github.com/expressjs/body-parser#readme) express.js module for `get` and `post` request.

> - [Criptii](https://cryptii.com/pipes/hex-to-text) - Hexcadecimal Converter
> - [Chrome Browser Add-on Json Viewer Pro ](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc)

```js
// -------  1. require modeules -------------//
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

// ----------2. use express & body-parser ----------//
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

// ------3. render index.html when user go to the home page --------//
//  request and response will be passed back
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
  
  //res.send("Server is up and running");   // can also just send text to home page
});

// another example
app.get("/",function(req,res){
  const url= "";
// make a get request to the url
  https.get(url, function(response){
    console.log(response.statusCode); //get the http status statusCode
    
    // data got from GET request use response.on()  *d can be called anything
    response.on("data",function(d){
    
    const weatherData=JSON.parse(d);   // format data into json data. The original data is hexadecimal 
                                      //// JSON.stringify(js_Object)  /// can turn json data into a string
    const temp=weatherData.main.temp;
    const icon=weatherData.weather[0].icon;
    const description=weatherData.weather[0].description;
    // res.send() can only appear once, to send multiline use res.write()
    res.write("<h1> The tempreture is "+temp+"</h1>");
    res.write("<p> We are having "+description+"</p>");
    res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");
    res.send();
  });
    
    }
  
}); 










```
