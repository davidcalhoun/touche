# Touché
Mouse event to touch event mapping for testing touch interfaces with desktop browsers.  This means that touchstart, touchmove, and touchend are hooked up to mousedown, mousemove, and mouseend, respectively.  This is generally recommended for testing purposes.

Inspired by Phantom Limb (https://github.com/brian-c/phantom-limb), but seeking less bloat (no graphics) and more conformance to the properties of actual touch objects (test with http://frontendstuff.com/javascript/examples/touch.html), and much more minimal code.

# Examples

## Hook me up!
You hook up events just like you would on a device (libraries will use the same methods):

````javascript
document.addEventListener('touchstart', function(e){}, false);
document.addEventListener('touchmove', function(e){}, false);
document.addEventListener('touchend', function(e){}, false);
````

## Interacting with the touch events
The main difference with touch events are the touch event arrays, which Touché gladly simulates for you:

1. touchstart has e.touches
1. touchmove has e.touches and e.changedTouches
1. touchend has e.changedTouches

Because a mouse cursor is representative of just one finger, these simulated arrays will only contain one element (i.e. e.touches[0]) corresponding to one touch.

Example:

````javascript
document.addEventListener('touchstart', function(e){
	e.touches[0].target;   // example: "[object HTMLPreElement]"
	e.touches[0].screenX;
	e.touches[0].screenY;
}, false);
````

(see http://frontendstuff.com/javascript/examples/touch.html for more information on the event properties)

# Support
Works on Chrome 13 and Safari 5.1 (and possibly others)