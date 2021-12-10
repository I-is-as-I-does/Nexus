/* Vâlvă | (c) 2021 I-is-as-I-does | MIT License */

export function slideUp(elm, duration = 200, callback = null) {
  elm.style.transitionProperty = "height, margin, padding";
  elm.style.transitionDuration = duration + "ms";
  elm.style.boxSizing = "border-box";
  elm.style.height = elm.offsetHeight + "px";
  elm.offsetHeight;
  elm.style.overflow = "hidden";
  elm.style.height = 0;
  elm.style.paddingTop = 0;
  elm.style.paddingBottom = 0;
  elm.style.marginTop = 0;
  elm.style.marginBottom = 0;
  window.setTimeout(() => {
    elm.style.display = "none";
    elm.style.removeProperty("height");
    elm.style.removeProperty("padding-top");
    elm.style.removeProperty("padding-bottom");
    elm.style.removeProperty("margin-top");
    elm.style.removeProperty("margin-bottom");
    elm.style.removeProperty("overflow");
    elm.style.removeProperty("transition-duration");
    elm.style.removeProperty("transition-property");
    if (typeof callback === "function") {
      callback();
    }
  }, duration);
}

export function slideDown(elm, duration = 200, callback = null) {
  resetDisplay(elm);
  let height = elm.offsetHeight;
  elm.style.overflow = "hidden";
  elm.style.height = 0;
  elm.style.paddingTop = 0;
  elm.style.paddingBottom = 0;
  elm.style.marginTop = 0;
  elm.style.marginBottom = 0;
  elm.offsetHeight;
  elm.style.boxSizing = "border-box";
  elm.style.transitionProperty = "height, margin, padding";
  elm.style.transitionDuration = duration + "ms";
  elm.style.height = height + "px";
  elm.style.removeProperty("padding-top");
  elm.style.removeProperty("padding-bottom");
  elm.style.removeProperty("margin-top");
  elm.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    elm.style.removeProperty("height");
    elm.style.removeProperty("overflow");
    elm.style.removeProperty("transition-duration");
    elm.style.removeProperty("transition-property");
    if (typeof callback === "function") {
      callback();
    }
  }, duration);
}

export function slideToggle(elm, duration = 200, callback = null) {
  if (elmIsHidden(elm)) {
    return slideDown(elm, duration, callback);
  } else {
    return slideUp(elm, duration, callback);
  }
}
export function timedSlideToggle(
  elm,
  duration = 200,
  delay = 200,
  callback = null
) {
  var methods = [slideUp, slideDown];
  if (elmIsHidden(elm)) {
    methods.reverse();
  }
  var transcallback = function () {
    if (typeof callback === "function") {
      callback();
    }
    window.setTimeout(() => {
      methods[1](elm, duration);
    }, delay);
  };

  methods[0](elm, duration, transcallback);
}

export function fadeOut(elm, callback = null) {
  elm.style.opacity = 1;
  (function fade() {
    if ((elm.style.opacity -= 0.1) < 0) {
      elm.style.display = "none";
      elm.style.opacity = 1;
      if (typeof callback === "function") {
        callback();
      }
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

export function fadeIn(elm, callback = null) {
  elm.style.opacity = 0;
  resetDisplay(elm);

  (function fade() {
    var val = parseFloat(elm.style.opacity);
    if (!((val += 0.1) > 1)) {
      elm.style.opacity = val;
      requestAnimationFrame(fade);
    } else if (typeof callback === "function") {
      callback();
    }
  })();
}

export function fadeToggle(elm, callback = null) {
  if (elmIsHidden(elm)) {
    fadeIn(elm, callback);
  } else {
    fadeOut(elm, callback);
  }
}
export function timedFadeToggle(elm, delay = 200, callback = null) {
  var methods = [fadeOut, fadeIn];
  if (elmIsHidden(elm)) {
    methods.reverse();
  }
  var transcallback = function () {
    if (typeof callback === "function") {
      callback();
    }
    window.setTimeout(() => {
      methods[1](elm);
    }, delay);
  };
  methods[0](elm, transcallback);
}
export function easeOut(elm, duration = 200, callback = null) {
  fadeOut(elm);
  slideUp(elm, duration, callback);
}
export function easeIn(elm, duration = 200, callback = null) {
  elm.style.opacity = 0;
  var timer = duration - 200;
  if (timer < 200) {
    timer = 200;
  }
  setTimeout(function () {
    fadeIn(elm, callback);
  }, timer);
  slideDown(elm, duration, callback);
}
export function easeToggle(elm, duration = 200, callback = null) {
  if (elmIsHidden(elm)) {
    return easeIn(elm, duration, callback);
  } else {
    return easeOut(elm, duration, callback);
  }
}
export function timedEaseToggle(
  elm,
  duration = 200,
  delay = 200,
  callback = null
) {
  var methods = [easeOut, easeIn];
  if (elmIsHidden(elm)) {
    methods.reverse();
  }
  var transcallback = function () {
    if (typeof callback === "function") {
      callback();
    }
    window.setTimeout(() => {
      methods[1](elm, duration);
    }, delay);
  };
  methods[0](elm, duration, transcallback);
}
export function splitFlap(elm, text, speed = 20) {
  var ntext = elm.textContent.split("");
  var stext = text.split("");
  var prevLen = ntext.length;
  var newLen = stext.length;

  var l;
  var stop;
  var solve;
  if (prevLen > newLen) {
    l = prevLen;
    stop = 0;
    solve = function () {
      if (l > newLen) {
        ntext.pop();
      } else {
        ntext[l - 1] = stext[l - 1];
      }
      l--;
    };
  } else {
    l = 0;
    stop = newLen;
    solve = function () {
      if (l < prevLen) {
        ntext[l] = stext[l];
      } else {
        ntext.push(stext[l]);
      }
      l++;
    };
  }
  var repl = setInterval(function () {
    solve();
    elm.textContent = ntext.join("");
    if (l == stop) {
      clearInterval(repl);
    }
  }, speed);
}
export function diversionToggle(
  elm,
  callback,
  ease = true,
  duration1 = 200,
  duration2 = 200,
  reverse = false
) {
  if (typeof callback !== "function") {
    callback = function () {};
  }
  var methods = [easeOut, easeIn];
  if (!ease) {
    methods = [slideUp, slideDown];
  }
  if (reverse) {
    methods.reverse();
  }
  methods[0](elm, duration1, function () {
    Promise.resolve(callback()).then(() => methods[1](elm, duration2));
  });
}
export function insertDiversion(
  parent,
  child,
  prepend = false,
  ease = true,
  duration = 200,
  callback = null
) {
  child.style.display = "none";
  var displayMethod;
  var placeAction;
  if (ease) {
    child.style.opacity = 0;
    displayMethod = easeIn;
  } else {
    displayMethod = slideDown;
  }
  if (prepend) {
    placeAction = function () {
      parent.prepend(child);
    };
  } else {
    placeAction = function () {
      parent.append(child);
    };
  }
  var placeCallback = function () {
    displayMethod(child, duration, callback);
  };
  return mutationPromise(parent, child, placeAction, placeCallback);
}
export function heightBasedDisplay(elm, preHeight, newHeight, callback = null){
  if (preHeight === newHeight) {
    fadeIn(elm, callback);
  } else {
    easeIn(elm, 200, callback);
  }
}
export function replaceDiversion(oldElm, newElm, callback = null) {
  newElm.style.opacity = 0;

  var parent = oldElm.parentNode;
  var preh = oldElm.offsetHeight;
  var placeAction = function () {
    oldElm.replaceWith(newElm);
  };
  var placeCallback = function () {
    var newh = newElm.offsetHeight;
    heightBasedDisplay(newElm, preh, newh, callback);
  };
  var transcallback = function () {
    mutationPromise(parent, newElm, placeAction, placeCallback);
  };

  fadeOut(oldElm, transcallback);
}
export function mutationPromise(parent, child, placeAction, callback = null) {
  if (!(parent instanceof Element)) {
    parent = document.body;
  }

  var tmpclass = "m" + Math.random().toString(20).substring(2);
  child.classList.add(tmpclass);

  return new Promise((resolve) => {
    var observer = new MutationObserver(() => {
      if (parent.querySelector("." + tmpclass)) {
        child.classList.remove(tmpclass);
        observer.disconnect();
        if (typeof callback === "function") {
          callback();
        }
        resolve(true);
      }
    });

    observer.observe(parent, {
      childList: true,
    });

    placeAction();
  });
}

export function resetDisplay(elm) {
  elm.style.removeProperty("display");
  let display = window.getComputedStyle(elm).display;
  if (display === "none") display = "block";
  elm.style.display = display;
}

export function elmIsHidden(elm) {
  if (!elm) return false;
  do {
    if (!(elm instanceof Element)) continue;
    if (elm.hidden || !elm.offsetHeight) {
      return true;
    }
    var style = window.getComputedStyle(elm);
    if (
      style.width == "0" ||
      style.height == "0" ||
      style.opacity == "0" ||
      style.display == "none" ||
      style.visibility == "hidden"
    ) {
      return true;
    }
  } while ((elm = elm.parentNode));
  return false;
}
