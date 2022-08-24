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

### To Use External Modules

#### Use NPM (Node Package Manager)

> npm by default is installed with node.js, but npm initiation has to be done in every project


- In command line `npm init` to initiate npm, then below lines will show up in Terminal, just press "Enter".

<img width="536" alt="Screen Shot 2022-08-24 at 14 31 29" src="https://user-images.githubusercontent.com/103771536/186495963-5d16fb10-5f58-4775-b029-ed4c6e4ee0ce.png">


- Once done, in your working direcotry, your will find a file called "package.json"
- Then use npm to install external package `npm install superheroes`.
- Once installed, go to "package.json", your installed package will show up in `dependencies`.
- Then to use external package, similar to internal ones: `const superheroes = require('superheroes');`



## Express

Express is the most used framework in Node.js and it's like a external package.

Installation in command line: `npm install express `























