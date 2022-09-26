# React & JSX

[**React**](https://reactjs.org/docs/getting-started.html) is a JavaScript library for building user interfaces.



### Project 

> - [emojipedia](https://txd2bb.csb.app/)
> - [to-do list](https://6pzkmx.csb.app/)
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
    <script src="../src/index.js" type="text/javascript"></script>
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





















## Reference

> - Use [Code Sandbox](http://codesandbox.io/) for online React development.
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





































