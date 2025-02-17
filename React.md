# React & JSX

[**React**](https://reactjs.org/docs/getting-started.html) is a JavaScript library for building user interfaces.



### Project 

> - [emojipedia](https://txd2bb.csb.app/)
> - [to-do list](https://jgocot.csb.app/)
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

Use **props** to pass over information to the component. `props` are read-only, which means they cannot be updated.

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


### Javascript ES6 Object & Array Destructuring ｜ 

[Object & Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

```js
const animals = [
  {
    name: "cat",
    sound: "meow",
    feedingRequirements: {
      food: 2,
      water: 3
    }
  },
  { name: "dog", sound: "woof" }
];

function useAnimals(animal) {
  return [
    animal.name,
    function() {
      console.log(animal.sound);
    }
  ];
}

//Destructuring Arrays
// console.log(animals);
const [cat, dog] = animals;
// console.log(cat);

const [animal, makeSound] = useAnimals(cat);
console.log(animal);
makeSound();

//Destructuring Objects
const { name, sound} = cat;
const { name: catName, sound: catSound } = cat;
const { name = "Fluffy", sound = "Purr" } = cat;
const {feedingRequirements: {food, water} } = cat;
console.log(food);

// Spread Operator
const citrus = ["Lime", "Lemon", "Orange"];
const fruits = ["Apple", ...citrus, "Banana", "Coconut"];

const fullName = {
  fName: "James",
  lName: "Bond"
};

const user = {
  ...fullName,
  id: 1,
  username: "jamesbond007"
};

// same level object
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

State is similar to props, but it is private and fully controlled by the component. It means each component is independent.

```js
import React, { useState } from "react";
// counter 
function App() {

//useState with initial value count=0

  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  return (
    <div className="container">
      <h1>{count}</h1>
      //trigger state to change
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
    </div>
  );
}
```

### React Event Handling

> - [HTML Event Attributes](https://www.w3schools.com/tags/ref_eventattributes.asp)

```js
import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [isMousedOver, setMouseOver] = useState(false);
//each event trigger state change
  function handleClick() {
    setHeadingText("Submitted");
  }

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: isMousedOver ? "black" : "white" }}
        // different events
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Submit
      </button>
    </div>
  );
}
```

### React Forms

Rather than a `<div>` element, we are using `<form>` element.

```js
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");
  
//setting the state when input changed, so the variable name is updated to event.target.value
  function handleChange(event) {
    //console.log(event.target.value);
    setName(event.target.value);
  }
  
// only when submit is clicked, we are setting the heading text
  function handleClick(event) {
    setHeading(name);
//form by default is refreshed, below will disable the refresh
    event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {headingText}</h1>
      <form onSubmit={handleClick}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

### Changing Complex State

Use object set initial value and update state when needed.

```js
import React, { useState } from "react";

function App() {

// create object fullName with two keys, fName and lName
  const [fullName, setFullName] = useState({
    fName: "",
    lName: ""
  });

  function handleChange(event) {
  //name will be the key, value is value
    const { value, name } = event.target;
//set state with previous value of the object
    setFullName(prevValue => {
    // if key is fName then update fName in fullName
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lname: value
        };
      }
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form>
        <input
          name="fName"
          onChange={handleChange}
          placeholder="First Name"
          value={fullName.fName}
        />
        <input
          name="lName"
          onChange={handleChange}
          placeholder="Last Name"
          value={fullName.lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
```

### Manage Component Tree with States

- When pass over array info from App.jsx, you need a "key" field and "id" field
  - It's not recommended to use index as id, you should use [uuid](https://www.npmjs.com/package/uuid)
  - For the training purpose, we can use index 


- ❗️Executed on Click vs. Executed on Render

```js
// Executed on Click
function ToDoItem(props) {
  return (
    <div
    //pass over a function
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}

//Executed on Render

function ToDoItem(props) {
  return (
  // it's passed over as a prop
    <div onClick={props.onChecked(props.id)} >
      <li>{props.text}</li>
    </div>
  );
}
```

- `props` can also be used to call a funtion in app and pass over to the component => like pass the function/info out

- App is served as a central place for things that components need, and use props to pass over the info; State is usually within the component, so that the component is controling itself

➡️ check out code of project [**To Do List** ](https://github.com/yvonneventure/WebDevBootCamp/tree/main/React%20-%20todolist)















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





































