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

## Newsletter Signup Project (use Mailchimp API)

Project folder:

`app.js`: 

```js
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");


const app=express();

// to use static files, create a folder called public and move local css and images to the folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// -------render signup page as the homepage-----//

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

//-------once user filled out info and pressed submit (make post request)-----//
app.post("/",function(req,res){

// get the data passed out
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;
  
// compose the data into object
  var data={
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }

      }
    ]
  }
  
// transform the data into string, where mailchimp accept
  var jsonData=JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/<list_ID>";
  
  
// set up the option
  const options ={
    method:"POST",
    auth:"name: <api_key>"
  }


//----------make a post request to mailchimp with options-------------//

  const request= https.request(url,options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    } else {
      res.sendFile(__dirname+"/failure.html")
    }


// the data response get back from mailchimp
    // response.on("data",function(data){
    //   console.log(JSON.parse(data));
    // });
  });
//-----------pass the stringified json data to mailchimp---//
  request.write(jsonData);
  request.end();    // once the post request is done, end the request

});


//------handle the post request from  failure.html form ---------//
app.post("/failure",function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})
```

`failure.html` :

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Failure</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

  </head>
  <body>
    <div class="jumbotron">
  <h1 class="display-4">Uh Oh!</h1>
  <p class="lead">There was a problem signing you up. Please try again or contact me.</p>
<form method="post" action="/failure">
  <button class="btn btn-lg btn-warning" type="submit">Try again!</button>
  </form>

</div>
  </body>
</html>

```



## REST API

### REST (REpresentational State Transfer)

![image](https://user-images.githubusercontent.com/103771536/193451788-9200b482-bd28-4094-b927-ddf6b4db613a.png)




**1. Use HTTP Request Verbs (Get, Post, Put/Patch, Delete)**
> Similar to database CRUD (Create, Read, Update, Delete)

##### Put vs Patch
- Put : Replace the entire entry
- Patch: Replace only pieces of data

**2. Use specific Pattern of Routes/Endpoint URLs**

Express allows [chained route handler](https://expressjs.com/en/guide/routing.html) for the same route like code below use `app.route()`.

```js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/articles")   // chained route

.get(function(req, res){     // get all articles
  Article.find(function(err, foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){    // post one new article

  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){   // delete all articles

  Article.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/articles/:articleTitle")

.get(function(req, res){

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function(req, res){

  Article.update(
    {title: req.params.articleTitle},                     // conditions
    {title: req.body.title, content: req.body.content},   //updates : entire record; if you only specify one field then by default it will make other fields without value supplemented null.
    {overwrite: true},                           // overwrite entire record
    function(err){
      if(!err){
        res.send("Successfully updated the selected article.");
      }
    }
  );
})

.patch(function(req, res){

  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},         // make updates to the specific field
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
})  // no semicolon

.delete(function(req, res){

  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding article.");
      } else {
        res.send(err);
      }
    }
  );
}); has semicolon, only the last function in chained router has the semicolon

```
























