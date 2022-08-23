# jQuery

The most used JavaScript library.

- [jQuery Website](https://jquery.com)
- [jQuery API Documentaiton](https://api.jquery.com) 

### Incorporate jQuery

In HTML, add below lines right before the closing tag of `</boby>`
```html
  
//jQuery CDN link
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
//actual jQuery/javascript codes goes into index.js
<script src="index.js" charset="utf-8"></script>

  ```

### Minification to Reduce File Size

To minify, use https://www.minifier.org

Minification is simply to remove all the indentation and spaces.

### Select Elements

Rather than using a long line in DOM, we can now simply use `$("h1")` to select elements, also follow css selector rules.

This will select all the elements at the same time, so that we don't need to do a for loop anymore.

### Manipulate styles of elements

We can change css styles like below, but this is not recommentded.❌

```javascript

$("h1").css("color","red");  // change color property to red


$("h1").css("color"); // Get the value of current color

```

✅ The rule of Thumb is to use HTML to manage contents, use CSS to manage styles, and use JavaScript to manage behaviors.

What we can do instead is to have a class styled in css and use jQuery to add the class to the element.
























