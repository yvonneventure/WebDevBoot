# EJS - Embedded JavaScript Templates

[EJS](https://ejs.co) is a simple templating language that allow you to use javascript in html. File will be `index.ejs`.

[Using EJS with Express](https://github.com/mde/ejs/wiki/Using-EJS-with-Express)

First, install EJS: Using the package manager npm `npm install ejs`

Then require it and set view engines

### Pass variable from app.js to ejs

```js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//set the app first
const app = express();

//set the app to use ejs as view engine, all view engines require the views folder set up
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//about.ejs is under views directory//

//---------pass variables to from app.js to ejs file ---------------//
app.get("/about",function(req,res){
  const content="something";
  
  res.render("about",{aboutContent :content });  //the key is from ejs file, the value is from app.js
});
```

Then in about.ejs we are using `<%= variable_name %>` to get the variable from app.js 

```html
<p> <%= aboutContent%> </p>
```



### Run code inside the ejs

`<%`:  'Scriptlet' tag, for control-flow, no output

Add `<%` on each line that's not html:

```html

<% if (day==="Saturday" ) {  %>
   <h1 style="color : purple"> <%= day%> TO DO List <h1>
<%   } else {    %>
   <h1 style="color : blue"> <%= day%> TO DO List <h1>
<%  } %>
```

### Pass data from ejs back to app.js


















