// Touché: bringing touch events to non-touch browsers https://github.com/davidcalhoun/touche
(function(){  // shouldn't need to wait DOM readiness (famous last words...)
  if('ontouchstart' in window) {
    // looks like touch events are already present, so return early
    return;
  }

  var isMouseDown = false, // so we don't fire touchmove when the mouse is up
      originator,
      fireTouch,
      mousedown,
      mousemove,
      mouseup;
  
  fireTouch = function(type, e) {
    var target,
        newEvent,
        touchesObj;

    target = originator || e.target;
    newEvent = document.createEvent('MouseEvent');  // trying to create an actual TouchEvent will create an error
    newEvent.initMouseEvent(type, true, true, window, e.detail,
                            e.screenX, e.screenY, e.clientX, e.clientY,
                            e.ctrlKey, e.shiftKey, e.altKey, e.metaKey,
                            e.button, e.relatedTarget);
    
    // touches/targetTouches/changedTouches emulation
    touchesObj = [{
      // identifier: unique id for the touch event (lazy.. just hooking it into the timestamp)
      // not using Date.now() just for greater support
      identifier: (new Date()).getTime(),
      pageX:      e.pageX,
      pageY:      e.pageY,
      clientX:    e.clientX,
      clientY:    e.clientY,
      target:     target,
      screenX:    e.screenX,
      screenY:    e.screenY
    }];

    switch(type) {
      case 'touchstart':  // e.touches and e.changedTouches and e.targetTouches
        originator = target;
        newEvent.touches = newEvent.changedTouches = newEvent.targetTouches = touchesObj;
      break;
      
      case 'touchmove':   // e.touches and e.changedTouches and e.targetTouches
        newEvent.touches = newEvent.changedTouches = newEvent.targetTouches = touchesObj;
      break;
      
      case 'touchend':    // e.changedTouches only
        originator = null;
        newEvent.changedTouches = touchesObj;
        newEvent.touches = newEvent.targetTouches = [];
      break;
      default:
      break;
    }
    
    // fire off the event!
    e.target.dispatchEvent(newEvent);
  }
  
  // hook up the mouse->touch mapped listeners
  mousedown = function(e) {
    isMouseDown = true;
    fireTouch('touchstart', e);
  }
  mousemove = function(e) {
    if(!isMouseDown) return;
    fireTouch('touchmove', e);
  }
  mouseup = function(e) {
    isMouseDown = false;
    fireTouch('touchend', e);
  }
  document.addEventListener('mousedown', mousedown, false);
  document.addEventListener('mousemove', mousemove, false);
  document.addEventListener('mouseup', mouseup, false);
  
  // old style handlers - only here to get around feature detection (comment if you need to)
  window.ontouchstart = mousedown;
  window.ontouchmove  = mousemove;
  window.ontouchend   = mouseup;

})();
