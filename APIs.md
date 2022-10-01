# API - Application Programming Interfaces

Use [**https**](https://nodejs.org/api/https.html#https_https_get_url_options_callback) node.js native module and [**body-parser**](https://github.com/expressjs/body-parser#readme) express.js module for `get` and `post` request.

> - [Criptii](https://cryptii.com/pipes/hex-to-text) - Hexcadecimal Converter
> - [Chrome Browser Add-on Json Viewer Pro ](https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc)

```js
// -------  1. require modeules -------------//
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");  // allow parse the info back to our server when make a post request

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

### Make a POST request

`index.html` below:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Weather App</title>
  </head>
  <body>
    <!-- when button clicked, the form will make a post request and redirect to "/" home page -->
    <form action="/" method="post">
      <!-- name property will be passed out as a variable -->
      <input name="cityName" placeholder="City Name" type="text">
      <button type="submit">Go</button>
      </form>

  </body>
</html>

```

Then app.js will be blow:

```js
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

//------render index.html, which is a form
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});

//--------when user submit the form (make a post request), render the below text and data from api-------//
app.post("/",function(req,res){

// use bodyPaser here to get the value of cityName
 var cityName=req.body.cityName;
                      //console.log(cityName);

 const apiKey="";
 const api="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;

https.get(api, function(response){
  

  response.on("data",function(d){
    const weatherData=JSON.parse(d);
    const temp=weatherData.main.temp;
    const icon=weatherData.weather[0].icon;
    const description=weatherData.weather[0].description;
    // res.send() can only appear once, to send multiline use res.write()
    res.write("<h1> The tempreture is "+temp+"</h1>");
    res.write("<p> We are having "+description+"</p>");
    res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");
    res.send();
  });
});
});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
```






























