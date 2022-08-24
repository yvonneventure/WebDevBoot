# Document Object Model (DOM)

> [DOM w3school](https://www.w3schools.com/js/js_htmldom.asp)

### DOM/Html Tree Structure

<img width="266" alt="Screen Shot 2022-08-24 at 16 39 05" src="https://user-images.githubusercontent.com/103771536/186518891-f833a8ff-b74e-4886-8336-5381c3557961.png">

- HTML DOM methods are actions you can perform (on HTML Elements).

- HTML DOM properties are values (of HTML Elements) that you can set or change.

```html
<html>
<body>

<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "Hello World!"; 
  <--changes the content (the innerHTML) of the <p> element with id="demo"-->
</script>

</body>
</html>
```

#### Finding HTML Elements

`document.getElementById(id)`	Find an element by element id
`document.getElementsByTagName(name)`	Find elements by tag name
`document.getElementsByClassName(name)`	Find elements by class name

#### Changing HTML Elements

`element.innerHTML =  new html content`	Change the inner HTML of an element
`element.attribute = new value`	Change the attribute value of an HTML element
`element.style.property = new style`	Change the style of an HTML element


`element.setAttribute("id", value)`	Change the attribute value of an HTML element

#### Adding and Deleting Elements

`document.createElement(element)	`Create an HTML element
`document.removeChild(element)`	Remove an HTML element
`document.appendChild(element)`	Add an HTML element
`document.replaceChild(new, old)`	Replace an HTML element
`document.write(text)`	Write into the HTML output stream

#### Add event handler

`document.getElementById(id).onclick = function(){code}`
`document.getElementById("myBtn").addEventListener("click", displayDate);`

#### Finding HTML Elements by CSS Selectors

`const x = document.querySelectorAll("p.intro");`


## Object/class


### Constructor Function

Object Name capitalize

### Initialize object




