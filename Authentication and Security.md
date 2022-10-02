# Authentication and Security

> Source Code [Doc](https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/13559648#overview) & [Git Repository](https://github.com/londonappbrewery/Authentication-Secrets/commits/master)

## Encrytion & Hashing

### Levels of security:

### - Level 1 : Simply store username and password in plain text in server

> [plaintextoffenders: ](https://plaintextoffenders.com)a list of companies will email your password back to you when you want to reset your password, which we learnt in hashing that it's impossible to get the plain text of your password. This means that their websites are not secure.

```js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = ({
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

// save email and password as plain text
app.post("/register", function(req, res){
  const newUser =  new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
```
### - Level 2 Encryption : Password + Key with cipher method, then we end up with some ciphertext

Limitation is that encrytion needs key, which is not that secure if the hacker is motivated enough.

Use [Mongoose-encryption](https://github.com/joegoldbeck/mongoose-encryption).

`mongoose-encryption` will **encrypt** when `.save()` and **decrypt** when call `.find()`. So other than setting up the encryption, nothing else needs to be done.

```js
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");  // install and require mongoose-encryption

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({   //full mongo schema
  email: String,
  password: String
});

// set up encryption
const secret = "Thisisourlittlesecret.";  // define the secret, the secret will be used to encrypt our password
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });  // add the plugin on the schema

//set encryption before set up the model
const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const newUser =  new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
```

### - Level 3 Hashing : Password with a hash function will produce a Hash and we will store the hash in the server. 

Hash function is a mathematical function that will take no time going forward, but almost impossible going backward. Meaning it may take 1 millisecond to hash it, but may take 2 years to decode it. Hashing also doesn't need a key.

Here we are using `md5` module for the training purpose.

First install `npm install md5`.

Then require `var md5 = require('md5');`

Simply use `md5()` to hash it.

```js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

console.log("weak password hash: " + md5("123456"));  // week
console.log("strong password hash: " + md5("sjkhdfsd8f7jhsd$%$sdfsdfHJKHSJFHDSF78324")); //strong

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});


const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const newUser =  new User({
    email: req.body.username,
    password: md5(req.body.password)  // hash it and save to the database
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {   // hash the one user input and check if they are the same after hash
          res.render("secrets");
        }
      }
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
```

### - Level 4 Salting: Adding random characters to user's password to generate the hash. 

We will only store the salt and the Hash in the database. MD5 is the most easiest hash to be hacked. Now the industry standard is [**bcrypt**](https://github.com/kelektiv/node.bcrypt.js#readme) and also use Salt Rounds. 



**Salt Rounds**: First we use password and **a random set of salt** to generate Hash, then we take this Hash and add the same salt agin and create another Hash, then do this again and again. This is called Salt Rounds. In this case, we only store the salt and end Hash in the database. Once user input the password, we will use the salt stored in database, and hash the same number of rounds and compare with the end hash stored in database, if it's a match then we have our user verified.

Install bcypt :`npm install bcrypt`

Then use `bcypt`:

```js
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Technique 2 (auto-gen a salt and hash):

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

```

The entire `app.js` will look like below:

```js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});


const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {  // bcrypt hash
    const newUser =  new User({
      email: req.body.username,
      password: hash    //store the generated hash
    });
    newUser.save(function(err){
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });

});

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err, result) {  // compare the password inputted with the hash in database
          if (result === true) {
            res.render("secrets");
          }
        });
      }
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
```

> - [Cryptii](https://cryptii.com)
> - [YouTube Video: Enigma Machine - Numberphile](https://www.youtube.com/watch?v=G2_Q9FoD-oQ)
> - [YouTube Video: Flaw in the Enigma Code - Numberphile](https://www.youtube.com/watch?v=V4V2bpZlqx8)
> - [Book: The Code Book by Simon Singh](https://www.torontopubliclibrary.ca/search.jsp?Ntt=The+code+book)


### - Level 5 Cookies and Session

Cookies are used to store the data on the browsing session. As long as the cookies for the site is not deleted, it will remember all the actions. It also will track your activities on other sites.

**Session** : is more like a period of time that you keep authenticated/loged in .

Use [Passport] to add cookies and sessions.

Install :`npm install passport-local, passport, passport-local-mongoose, expression-session`.

> - [express-session](https://www.npmjs.com/package/express-session)
> - [passport](https://www.npmjs.com/package/passport) | [Homepage](https://www.passportjs.org)
> - [passport-local](https://www.npmjs.com/package/passport-local)
> - [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)

```js
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


//--------------- first, set the express session
app.use(session({
  secret: "Our little secret.",   // any long string, should be store in .env
  resave: false,
  saveUninitialized: false
}));

//--------------------- then initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

//--------passportlocalmongoose as plugin
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

//------passport local mongoose to create local strategy---//
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//------------------//

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.get("/secrets", function(req, res){
  if (req.isAuthenticated()){    // check if user is authenticated
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

//log out route

app.get("/logout", function(req, res){
// logout from passport
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res){

//paspport local mongoose to register user
  User.register({username: req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){  // if no error, authenticate our user
        res.redirect("/secrets");
      });
    }
  });

});

app.post("/login", function(req, res){

// create user object
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  
// comes from passport module
  req.login(user, function(err){
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });

});

```



### - Level 6 OAuth 2.0 : delegating user signin use google or facebook

#### Why OAuth?

1. Grant Granular Access, like what pieces of info we can access only name or their contact list
2. Allow read-only access or read&write access 
3. Revoke access : facebook/google can remove your access to their info

#### Steps of OAuth

Step 1. Set up our app and let third-party (Google/faceboook) know who we are, and we will get an app_id/client_id

Step 2. Redirect to the third-party site to authenticate

Step 3. user login on the third-party site

Step 4. User review and grant permissions

Step 5. Once permission granted, our site will receive a authurization code (just authenticated)

Step 6. Exchange Auth code for Access Tocken (can access info)


Use login with Google as example



















## Use ENV to keep secrets safe

[Dotenv](https://www.npmjs.com/package/dotenv)is a module that loads environment variables from a `.env` file into `process.env` code.

### Install

```
# install locally (recommended)
npm install dotenv --save
```

### Usage

`.env` is a hidden file, can not show use `ls`, only can show use `ls -a` or in Atom.


Create a `.env` file in the root of your project, and in your file, no space, use capital letters, with quotes:

```
S3_BUCKET="YOURS3BUCKET"
API_KEY="YOURSECRETKEYGOESHERE"
```

Then in your app.js code:

```js
require('dotenv').config()  //require it at the top
const apiKey= process.env.API_KEY;   //use it

```

## gitignore

A collection of `.gitignore` [templates](https://github.com/github/gitignore).

Here we are using the one for [Node](https://github.com/github/gitignore/blob/main/Node.gitignore).

For node projects, usually we are ignoring node modules folder and `.env` file.

In the root of your folder, `touch .gitignore`. Then copy the template for node into our `.gitignore`.




## Hacking Passwords 101

> - [Check if your password got hacked](https://haveibeenpwned.com)
> - [List_of_the_most_common_passwords](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords)
> - [Password Complexity Checker](http://password-checker.online-domain-tools.com)

❗️The longer the password, the time hacking will increase exponentially (recomended 12+ characters).
❗️Don't use words in dictionary.

For fun, you can use https://hackertyper.net to mess up with your friends, you can type anything but it will produce something seems realistic.


[Use werkzeug to hash and salt user's password.](https://werkzeug.palletsprojects.com/en/1.0.x/utils/#module-werkzeug.security)








































