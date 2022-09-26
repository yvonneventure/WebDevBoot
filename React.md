# React & JSX

[**React**](https://reactjs.org/docs/getting-started.html) is a JavaScript library for building user interfaces.



### Project 

> - [emojipedia](https://txd2bb.csb.app/)
> - [to-do list](https://m2dz8v.csb.app/)
> - [Keeper App](https://ot0qmd.csb.app/)


### Intro to JSX


Use jsx elements in `index.js`.

```js
import React from "react";
import ReactDOM from "react-dom";

// render jsx
ReactDOM.render(
  <div>
    <h1>My Favourite Foods</h1>
    <ul>
      <li>Bacon</li>
      <li>Noodles</li>
      <li>Jamon</li>
    </ul>
  </div>,
  document.getElementById("root")
);
```

`index.html` will be like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>JSX</title>
    
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div id="root"></div>
    <script src="../src/index.js" type="text/JSX"></script>
  </body>
</html>
```

### To use JavaScript in JSX

Can only use Javascript expression, not statements (if/else, while...), needs to be in `{}`.

```js
import React from "react";
import ReactDOM from "react-dom";

const fName = "Yvonne";
const lName = "Something";
const num = 7;

ReactDOM.render(
  <div>
    <h1>Hello {fName + " " + lName}!</h1>
    <p>Your lucky number is {num}</p>
  </div>,
  document.getElementById("root")
);

```

### JSX attributes

```js
import React from "react";
import ReactDOM from "react-dom";

const img = "https://picsum.photos/200";

ReactDOM.render(
  <div>
  // in jsx, all css/html attributes need to use camel case like "className"
    <h1 className="heading">My Favourite Foods</h1>
    <img alt="random" src={img + "?grayscale"} />

    <img
      className="food-img"
      alt="bacon"
      src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190621-air-fryer-bacon-0035-landscape-pf-1567632709.jpg?crop=0.645xw:0.967xh;0.170xw,0.0204xh&resize=480:*"
    />
   
  </div>,
  document.getElementById("root")
);
```

#### In-line Sytling in jsx

```js
import React from "react";
import ReactDOM from "react-dom";

const customStyle = {
  color: "red",
  fontSize: "20px",
  border: "1px solid black"
};

customStyle.color = "blue";

ReactDOM.render(
  <h1 style={customStyle}>Hello World!</h1>,
  document.getElementById("root")
);
```

### React Components

In `index.js` only render `<App />` component.

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));
```

Then in `App.jsx" is like a component tree, and the entire structure.

```js
import React from "react";
import Heading from "./Heading";
import List from "./List";

function App() {
  return (
    <div>
      <Heading />
      <List />
      <List />
    </div>
  );
}

export default App;

```

In `Heading.jsx` create heading component.

```
import React from "react";

function Heading() {
  return <h1>My Favourite Foods</h1>;
}

export default Heading;
```

In `List.jsx` create list component.

```js
import React from "react";

function List() {
  return (
    <ul>
      <li>Bacon</li>
      <li>Jamon</li>
      <li>Noodles</li>
    </ul>
  );
}

export default List;

```

### ES6 Import & Export

In Index.js 

```js
import React from "react";
import ReactDOM from "react-dom";

//as pi is default export, we can named it anything like "PI" or even "*"
// non-default export, however, has to have the exact same name when they export

import PI, { doublePi, triplePi } from "./math.js";

ReactDOM.render(
  <ul>
    <li>{PI}</li>
    <li>{doublePi()}</li>
    <li>{triplePi()}</li>
  </ul>,
  document.getElementById("root")
);

```

in `math.js` export

```js
const pi = 3.1415962;

function doublePi() {
  return pi * 2;
}

function triplePi() {
  return pi * 3;
}

//default export 
export default pi;
// use {} to export more than 1
export { doublePi, triplePi };

```

### React Props

Use **props** to pass over information to the component.

Create one component (or like a template), by passing different info, it can display the different info but has the same layout.

```js
import React from "react";
import ReactDOM from "react-dom";

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.img} alt="avatar_img" />
      <p>{props.tel}</p>
      <p>{props.email}</p>
    </div>
  );
}

ReactDOM.render(
  <div>
    <h1>My Contacts</h1>
    <Card
      name="Beyonce"
      img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
      tel="+123 456 789"
      email="b@beyonce.com"
    />
    <Card
      name="Jack Bauer"
      img="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg"
      tel="+7387384587"
      email="jack@nowhere.com"
    />
  </div>,
  document.getElementById("root")
);
```
  
## Javascript ES6 Map/Filter/Reduce


Map

```js
var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.

function double(x) {
  return x * 2;
}
const newNumbers = numbers.map(double);

// can be simplified like below
const newNumbers = numbers.map(function (x) {
  return x * 2;
});

// to achieve the same thing use forEach
var newNumbers = [];
numbers.forEach(function (x) {
  newNumbers.push(x * 2);
});
console.log(newNumbers);
```

Filter:
```js
//Filter - Create a new array by keeping the items that return true.
// num is the item in the array
const newNumbers = numbers.filter(function(num) {
  return num < 10;
});
```

Reduce

```js
//Reduce - Accumulate a value by doing something to each item in an array.

var newNumber = numbers.reduce(function (accumulator, currentNumber) {
  //console.log("accumulator = " + accumulator);    // starting point
  //console.log("currentNumber = " + currentNumber);  // something to be added
    return accumulator + currentNumber;
})

// achieve the same thing by using forEach
var newNumber = 0;
numbers.forEach(function (currentNumber) {
  newNumber += currentNumber
})
```

Find

```js
//Find - find the first item that matches from an array.

const newNumber = numbers.find(function (num) {
  return num > 10;
})

```

Find Index

```js
//FindIndex - find the index of the first item that matches.

const newNumber = numbers.findIndex(function (num) {
  return num > 10;
})
```

### Javascript ES6 Arrow functions

`{ return }` can be ignored.

```js
//Map -Create a new array by doing something with each item in an array.
// const newNumbers = numbers.map( x => x * 2);

////Filter - Create a new array by keeping the items that return true.
// const newNumbers = numbers.filter(num => num < 10);

//Reduce - Accumulate a value by doing something to each item in an array.
//more than one input, use (), otherwise () can be ignored
//const newNumber = numbers.reduce((accumulator, currentNumber) => accumulator + currentNumber);

//Find - find the first item that matches from an array.
// const newNumber = numbers.find(num => num > 10);

//FindIndex - find the index of the first item that matches.
// const newNumber = numbers.findIndex(num => num > 10);
```

### React Conditional Rendering with the Ternary Operator (condition?if true: if false) or use && - AND Operator)

Ternary Operator (condition?if true: if false).

If we only care about the condition is true, can use `&&`. Or, you can use null as the expression for condition is false.(condition?if true: null).


```js
import React from "react";
import Login from "./Login";

var isLoggedIn = false;

const currentTime = new Date(2019, 11, 1, 9).getHours();
console.log(currentTime);

function App() {
  return (
    <div className="container">
      {/*Ternary Operator*/}
      {isLoggedIn ? <h1>Hello</h1> : <Login />}
      {/*AND Operator*/}
      {currentTime > 12 && <h1>Why are you still working?</h1>}
    </div>
  );
}

export default App;
```

## React State

### React Hooks - [useState](https://reactjs.org/docs/hooks-reference.html#usestate)





















## Reference

> - Use [Code Sandbox](http://codesandbox.io/) for online React development.
> - [Chrome React Developer Tool](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
> - [Standard HTML attributes](https://www.w3schools.com/tags/ref_standardattributes.asp)
> - [CSS Property List](https://www.w3schools.com/cssref/)
> - [Airbnb Style Guide for React](https://github.com/airbnb/javascript/tree/master/react)
> - [MUI Core: like bootstrap, offers react component that ready to go](https://mui.com/material-ui/getting-started/overview/)


### For Design/Fun

> - [Transparent Textures](https://www.transparenttextures.com)
> - [Emoji Meanings](https://www.emojimeanings.net)
> - [Streamline : Get Icons & illustrations](https://www.streamlinehq.com)
> - [Flat UI colors Palette](https://flatuicolors.com)
> - [Social buttons for Bootstrap](https://lipis.github.io/bootstrap-social/)
> - [Lorem Picsum: The Lorem Ipsum for photos](https://picsum.photos)





































