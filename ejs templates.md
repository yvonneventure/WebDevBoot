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

### Pass data from ejs back to app.js and rerender

This is a todo list app, and each time user make a post request (add new item), the new item will be added to the items array and rerender the home page for the item to show up.

```js

let items=["buy","eat","cook"];

app.get("/", function(req,res){
  res.render("list",{newListItems : items});
}

app.post("/", function(req,res){
    var item=req.body.nextitem;    // nextitem is passed out from ejs to app.js use body-parser
    items.push(item);            // item added to the array
    res.redirect("/");      // redirect to home page
}

```

Then in `list.ejs` render each item in array to a `<p>` element:

```html

<% newListItems.forEach(function(item){ %>         
        <p> <%=item%> </p>
         
      <% }) %>

    <form class="item" action="/" method="post">
      <input type="text" name="nextitem" placeholder="New Item" autocomplete="off">
      <button type="submit" name="button" >Add</button>
      </form>
```

### 

Use templating to create a todo list and work list use the same list.ejs.

The `app.js`  will look like below:

```js
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;
// if the list passed out is work, then redirect to /work route
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work", newListItems: workItems});
});

```

And list.ejs will be :

```html
  <div class="box">
    <% for (let i=0; i<newListItems.length; i++) { %>
      <div class="item">
        <input type="checkbox">
        <p><%=  newListItems[i]  %></p>
      </div>
      <% } %>

      <form class="item" action="/" method="post">
        <input type="text" name="newItem" placeholder="New Item" autocomplete="off">
        <!-- this will create a key-value pair with key "list" and value "listTitle" so that we know which list we are in -->
        <button type="submit" name="list" value=<%=listTitle%>+</button>
      </form>
  </div>
```

### Layouts

Create `header` and `footer` ejs and then just include them to create a consistent layout. All ejs will be in views folder.

`<%- include("header") -%>`

<img width="768" alt="Screen Shot 2022-10-01 at 12 50 16" src="https://user-images.githubusercontent.com/103771536/193419763-dc9a3b23-3688-426c-ab93-ce50d8c97354.png">












