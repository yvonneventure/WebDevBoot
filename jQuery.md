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

> ✅❗️ The rule of Thumb is to **use HTML to manage contents, use CSS to manage styles, and use JavaScript to manage behaviors.**

<br>

What we can do instead is to have a class styled in css and use jQuery to add the class to the element.

<br>

```javascript
$("h1").addClass("pressed");   

 setTimeout(function() {
    $("h1").removeClass("pressed");   // remove class after 100 milliseconds
  }, 100);

```


### Manipulate Text

```javascript
$("button").text("Don't click me");  // set/update the pure text on the button

$("button").text(); // get the current text on the button

$("button").html("<strong>something</strong>"); // add html element within the button tags

```

### Manipulate Attributes

Attributes are the ones inside the open tag. Ex.` <img src=":>` or `<a href="">`
```javascript

$("img").attr("src","images/a.png");  //set attribute value
$("a").attr("href","www.google.com");  

$("img").attr("src");   //get attribute src value

$("h1").attr("class");   // get all the class applied on h1

```

### Add Event Listener

```javascript

$(".drum").click(function(){     //mouseclick
  var buttonText=$(this).text();    // this refers to the button being clicked

  makeSound(buttonText);
  buttonAnimation(buttonText);

});
```

<br>

```javascript
$(document).keypress(function() {    //keypress
  if (!game_on) {
    $("#level-title").text("Level " + level);
    nextSequence();
    game_on = true;
  }
});



$(document).keypress(function(event) {   // event is just a name, can be anything you wish to call
  console.log(event.key);  // wchich key being pressed
  makeSound(event.key);

  buttonAnimation(event.key);

});

```

### Adding or removing html elements

```javascript
$("h1").before("<button>New</button>");  //add a button before the h1 element (outside h1 tags)
$("h1").after("<button>New</button>");   //add a button after the h1 element(outside h1 tags)


$("h1").prepend("<button>New</button>"); //add a button before the h1 element (within h1 tags)
$("h1").append("<button>New</button>"); //add a button after the h1 element (within h1 tags)
```


### Add Animation

```
//animations can be chained
$("h1").fadeIn(100).fadeOut(100).fadeIn(100);

$("h1").hide();
$("h1").show();
$("h1").slideUp();
$("h1").slideDown();

$("h1").animate({opacity : 0.5});  // .animate can only be used on css styles that can be numerically mesured, % need to be put inside quotes
$("h1").animate({margin: "50%"}); 

```


















