# Node.js and Express


> Node.js Documentation https://nodejs.org/dist/latest-v16.x/docs/api/


Node is like a console to run scripts locally.

- To run JavaScript code, in command line `node index.js`

- To get the version of current node.js, in command line `node`

- To use internal/native node modules, in JavaScript file:

```javascript
const fs=require("fs");


fs.copyFileSync('file1.txt', 'destination.txt');
console.log('file1.txt was copied to destination.txt');
```
Then run `node index.js` in command line to **execute**.

❗️Use `ctr+c` to exit node mode.

#### `const` vs. `var`
  - `const` are for values do not change, `var` are for values will be updated.
  - `const` still can be updated with new value, but the structure cannot be changed.
  - For example:
 ```
 const a=[1,1,1] 
 // then later, a can be pushed but cannot be reassigned as another array.
 a=[2,2] // X  cannot be done
 a.push(3);  // ok to do
 
 ```

### Export modules

To use the module in `app.js` simple require it. Local module need to add `_dirname`.

```js
const date = require(__dirname + "/date.js");
date.getDate();   // Calling the function
```

Then in `date.js` file :

```js
//export getDate as a method, if `exports.getDate()` with (), then when the module is required, the function will automatically run instead of when the function is called
// if module.exports="Hello World"; then when module required, the console will log "Hello World"


exports.getDate=function (){
let today = new Date();
let currentDay=today.getDay();

let options={
  weekday:"long",
  day:"numeric",
  month:"long",
}

let day=today.toLocaleDateString("en-US",options);

return day;
};
```

#### If the module only has one export

Then `const date = require(__dirname + "/date.js");` the date here will be that export.












## To Use External Modules

#### Use [NPM (Node Package Manager)](https://www.npmjs.com)

> npm by default is installed with node.js, but npm initiation has to be done in every project


- In command line `npm init` to initiate npm, then below lines will show up in Terminal, just press "Enter".

<img width="536" alt="Screen Shot 2022-08-24 at 14 31 29" src="https://user-images.githubusercontent.com/103771536/186495963-5d16fb10-5f58-4775-b029-ed4c6e4ee0ce.png">


- Once done, in your working direcotry, your will find a file called "package.json"
- Then use npm to install external package `npm install superheroes`.
- Once installed, go to "package.json", your installed package will show up in `dependencies`.
- Then to use external package, similar to internal ones: `const superheroes = require('superheroes');`



## [Express](https://expressjs.com/en/4x/api.html)

Express is the most used framework in Node.js and it's like a external package, so need to be installed for each project.

Installation in command line: `npm install express `

Then in js file

```javascript
const express = require('express');

const app = express();

//set get request

app.get("/",function(request, response){
  console.log(request);   // will be able to see the requests sent
  
  response.send("hello");  // when go to http://localhost:3000/ "hello" will render
  
  response.send("<h1>hello</h1>");  // when go to http://localhost:3000/ html will render
});

```

To work with user input, we need[body-parser](https://www.npmjs.com/package/body-parser). To install, in command line `npm install body-parser`

JS file looks like this:

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//need to add below line everytime
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request, response){

  response.sendFile(__dirname+"/index.html");  //  .sendFile is to render the whole hmtl page
  // __dirname is a constant and grab your current directory, then even if we move to cloud or some other server, it will find the file
});

// POST request

app.post("/",function(request, response){
  console.log(request.body);   //.body is a preperty of bodyParser, this will log all the value user inputed
  
  var num1=Number(request.body.num1);  // num1 and num2 are the variable names in index.html
  var num2=Number(request.body.num2);
  var result=num1+num2;
  response.send("result is"+result);  
 
});
```

HTML file looks like this:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Calculator</title>
  </head>
  <body>
    <h1>Calculator</h1>
    <!-- value in name attribute are variable name, for example num1 and num2-->
    <form action="/" method="post">
      <input type="text" name="num1" placeholder="First Number">
      <input type="text" name="num2" placeholder="Second Number">
      <button type="submit" name="submit">Calculator</button>
      </form>
  </body>
</html>
```

#### Front-end vs Back-end

Front-end: have everythin run on client/user side, like render javascript on html.
Back-end: have work happen on server, then send readied info to client side and render the html.

### [Nodemon](https://www.npmjs.com/package/nodemon)

nodemon, a npm package that will make it way easier for us to auto start our servers.

Install nodemon `npm install -g nodemon`; if not work, use this one instead: `sudo npm install -g nodemon`

After install, instead of run srcipt using `node index.js`, use `nodemon index.js` and once your make changes to scripts, use `command+s` to save and nodemon will auto update.

To exit, use `ctrl+c`.















