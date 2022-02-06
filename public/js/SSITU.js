/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
"use strict";
(self["webpackChunknexus"] = self["webpackChunknexus"] || []).push([["SSITU"],{

/***/ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "easeOut": () => (/* binding */ easeOut),
/* harmony export */   "easeIn": () => (/* binding */ easeIn),
/* harmony export */   "easeToggle": () => (/* binding */ easeToggle),
/* harmony export */   "timedEaseToggle": () => (/* binding */ timedEaseToggle),
/* harmony export */   "slideUp": () => (/* binding */ slideUp),
/* harmony export */   "slideDown": () => (/* binding */ slideDown),
/* harmony export */   "slideToggle": () => (/* binding */ slideToggle),
/* harmony export */   "timedSlideToggle": () => (/* binding */ timedSlideToggle),
/* harmony export */   "fadeOut": () => (/* binding */ fadeOut),
/* harmony export */   "fadeIn": () => (/* binding */ fadeIn),
/* harmony export */   "fadeToggle": () => (/* binding */ fadeToggle),
/* harmony export */   "timedFadeToggle": () => (/* binding */ timedFadeToggle),
/* harmony export */   "diversionToggle": () => (/* binding */ diversionToggle),
/* harmony export */   "insertDiversion": () => (/* binding */ insertDiversion),
/* harmony export */   "replaceDiversion": () => (/* binding */ replaceDiversion),
/* harmony export */   "splitFlap": () => (/* binding */ splitFlap),
/* harmony export */   "vHide": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide),
/* harmony export */   "vPlace": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vPlace),
/* harmony export */   "vReplace": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vReplace),
/* harmony export */   "vShow": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow),
/* harmony export */   "vShowAdapt": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShowAdapt),
/* harmony export */   "vSplitFlap": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vSplitFlap),
/* harmony export */   "vTempToggle": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vTempToggle),
/* harmony export */   "vToggle": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vToggle),
/* harmony export */   "vToggleResolve": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_0__.vToggleResolve)
/* harmony export */ });
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitions.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/constants.js");
/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */




// @doc: Valva v.1 support

function easeOut(elm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(elm, 'ease', duration, callback, timing)
}
function easeIn(elm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow)(elm, 'ease', duration, callback, timing)
}
function easeToggle(elm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vToggle)(elm, 'ease', duration, callback, timing)
}
function timedEaseToggle(elm, delay = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.delay, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vTempToggle)(elm, 'ease', delay, duration, callback, timing)
}



function slideUp(elm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(elm, 'slide', duration, callback, timing)
}
function slideDown(elm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow)(elm, 'slide', duration, callback, timing)
}
function slideToggle(elm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vToggle)(elm, 'slide', duration, callback, timing)
}
function timedSlideToggle(elm, delay = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.delay, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vTempToggle)(elm, 'slide', delay, duration, callback, timing)
}



function fadeOut(elm, callback = null, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vHide)(elm, 'fade', duration, callback, timing)
}
function fadeIn(elm, callback = null, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vShow)(elm, 'fade', duration, callback, timing)
}
function fadeToggle(elm, callback = null, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vToggle)(elm, 'fade', duration, callback, timing)
}
function timedFadeToggle(elm, delay = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.delay, callback = null, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vTempToggle)(elm, 'fade', delay, duration, callback, timing)
}


function diversionToggle(elm, callback = null, ease = true, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, reverse = false, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    var t = ease ? 'ease' : 'slide'
    ;(0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vToggleResolve)(elm, callback, t, duration, timing, reverse)
}

function insertDiversion(parent, child, prepend = false, ease = true, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    var t = ease ? 'ease' : 'slide'
    ;(0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vPlace)(parent, child, prepend, t, duration, callback, timing)
}

function replaceDiversion(oldElm, newElm, callback, duration = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.duration, timing = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.timing) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vReplace)(oldElm, newElm, duration, callback, timing)
}

function splitFlap(elm, text, speed = _constants_js__WEBPACK_IMPORTED_MODULE_1__.deflt.speed) {
    (0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.vSplitFlap)(elm, text, speed)
}




/***/ }),

/***/ "./node_modules/@i-is-as-i-does/valva/src/modules/constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/valva/src/modules/constants.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "profl": () => (/* binding */ profl),
/* harmony export */   "deflt": () => (/* binding */ deflt)
/* harmony export */ });
/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */
const props = {
    spacing: ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom'],
    transitions: ['transition-duration', 'transition-timing-function', 'transition-property'],
    heights: ['height', 'overflow']
}

const slide = {
    target: 'height, margin, padding',
    toReset: ['height'].concat(props.spacing),
    removeInFirst: props.spacing,
    removeInThen: props.heights.concat(props.transitions),
    removeOut: props.heights.concat(props.spacing, props.transitions)
}

const fade = {
    target: 'opacity',
    toReset: ['opacity'],
    removeInFirst: ['opacity'],
    removeInThen: props.transitions,
    removeOut: ['opacity'].concat(props.transitions)
}
const ease = {
    target: slide.target + ', ' + fade.target,
    toReset: ['opacity'].concat(slide.toReset),
    removeInFirst: props.spacing.concat(['opacity']),
    removeInThen: slide.removeInThen,
    removeOut: ['opacity'].concat(slide.removeOut)
}

const profl = {
    slide: slide,
    fade: fade,
    ease: ease
}

const deflt = {
    type: 'ease',
    duration: 300,
    callback: null,
    timing: 'ease-in-out',
    delay: 1000, // vTempToggle
    reverse: false, // vToggleResolve
    prepend: false // vPlace
}

/***/ }),

/***/ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vHide": () => (/* binding */ vHide),
/* harmony export */   "vShow": () => (/* binding */ vShow),
/* harmony export */   "vToggle": () => (/* binding */ vToggle),
/* harmony export */   "vTempToggle": () => (/* binding */ vTempToggle),
/* harmony export */   "vToggleResolve": () => (/* binding */ vToggleResolve),
/* harmony export */   "vPlace": () => (/* binding */ vPlace),
/* harmony export */   "vReplace": () => (/* binding */ vReplace),
/* harmony export */   "vShowAdapt": () => (/* binding */ vShowAdapt),
/* harmony export */   "vSplitFlap": () => (/* binding */ vSplitFlap)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/constants.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/utils.js");

/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */
/* eslint-disable no-unused-expressions */




function setTransition(elm, type, duration, timing) {
  elm.style.setProperty('transition-property', _constants_js__WEBPACK_IMPORTED_MODULE_0__.profl[type].target)
  elm.style.setProperty('transition-timing-function', timing)
  elm.style.setProperty('transition-duration', duration + 'ms')
}

function resetStyle(elm, type) {
  _constants_js__WEBPACK_IMPORTED_MODULE_0__.profl[type].toReset.forEach(p => {
    elm.style.setProperty(p, 0)
  })
}

function removeProp(elm, type, key) {

  _constants_js__WEBPACK_IMPORTED_MODULE_0__.profl[type][key].forEach(p => {
    elm.style.removeProperty(p)
  })
}


function changeThenAct(parent, child, placeAction, placeCallBack) {
  if (!(parent instanceof Element)) {
    parent = document.body
  }

  var tmpclass = 'm' + Math.random().toString(20).substring(2)
  child.classList.add(tmpclass)

  return new Promise((resolve) => {
    var observer = new MutationObserver(() => {
      if (parent.querySelector('.' + tmpclass)) {
        child.classList.remove(tmpclass)
        observer.disconnect()
        placeCallBack()
        resolve(true)
      }
    })
    observer.observe(parent, {
      childList: true
    })
    placeAction()
  })
}


function vHide(elm, type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.type, duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing) {
  setTransition(elm, type, duration, timing)
  if (type !== 'fade') {
    elm.style.setProperty('box-sizing', 'border-box')
    elm.style.setProperty('height', elm.offsetHeight + 'px')
    elm.offsetHeight
    elm.style.setProperty('overflow', 'hidden')
  }
  resetStyle(elm, type)
  window.setTimeout(() => {
    elm.style.setProperty('display', 'none')
    removeProp(elm, type, 'removeOut')
    if (typeof callback === 'function') {
      callback()
    }
  }, duration)
}

function vShow(elm, type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.type, duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing) {
  if (type === 'fade') {
    resetStyle(elm, 'fade')
    ;(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resetDisplay)(elm)
    setTransition(elm, 'fade', duration, timing)
  } else {
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resetDisplay)(elm)
    var height = elm.offsetHeight
    elm.style.setProperty('overflow', 'hidden')
    resetStyle(elm, type)
    elm.offsetHeight
    elm.style.setProperty('box-sizing', 'border-box')
    setTransition(elm, type, duration, timing)
    elm.style.setProperty('height', height + 'px')
  }
  removeProp(elm, type, 'removeInFirst')
  window.setTimeout(() => {
    removeProp(elm, type, 'removeInThen')
    if (typeof callback === 'function') {
      callback()
    }
  }, duration)
}

function vToggle(elm, type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.type, duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing) {
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isHidden)(elm)) {
    vShow(elm, type, duration, callback, timing)
  } else {
    vHide(elm, type, duration, callback, timing)
  }
}
function vTempToggle(elm, type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.type, delay = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.delay, duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing) {
  var methods = [vHide, vShow]
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.isHidden)(elm)) {
    methods.reverse()
  }
  var transcallback = function () {
    if (typeof callback === 'function') {
      callback()
    }
    window.setTimeout(() => {
      methods[1](elm, type, duration, callback, timing)
    }, delay)
  }

  methods[0](elm, type, duration, transcallback, timing)
}

function vToggleResolve(
  elm,
  callback = null,
  type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.type,
  duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration,
  timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing,
  reverse = false
) {
  if (typeof callback !== 'function') {
    callback = function () { }
  }
  var methods = [vHide, vShow]
  if (reverse) {
    methods.reverse()
  }
  methods[0](elm, type, duration, function () {
    Promise.resolve(callback()).then(() => methods[1](elm, type, duration, null, timing))
  }, timing)
}

function vPlace(
  parent,
  child,
  prepend = false,
  type = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.type,
  duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration,
  callback = null,
  timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing
) {
  child.style.setProperty('display', 'none')
  var placeAction
  if (prepend) {
    placeAction = function () {
      parent.prepend(child)
    }
  } else {
    placeAction = function () {
      parent.append(child)
    }
  }

  var placeCallback = function () {
    vShow(child, type, duration, callback, timing)
  }
  changeThenAct(parent, child, placeAction, placeCallback)
}


function vReplace(oldElm, newElm, duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing) {
  newElm.style.opacity = 0

  var parent = oldElm.parentNode
  var preh = oldElm.offsetHeight
  var placeAction = function () {
    oldElm.replaceWith(newElm)
  }
  var placeCallback = function () {
    vShowAdapt(newElm, preh, duration, callback, timing)
  }
  var transcallback = function () {
    changeThenAct(parent, newElm, placeAction, placeCallback)
  }
  vHide(oldElm, 'fade', duration, transcallback, timing)
}

function vShowAdapt(elm, prevHeight, duration = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.duration, callback = null, timing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.deflt.timing) {
  var type = 'ease'
  if (elm.offsetHeight === prevHeight) {
    type = 'fade'
  }
  vShow(elm, type, duration, callback, timing)
}


function vSplitFlap(elm, text, speed = 20) {
  var ntext = elm.textContent.split('')
  var stext = text.split('')
  var prevLen = ntext.length
  var newLen = stext.length

  var l
  var stop
  var solve
  if (prevLen > newLen) {
    l = prevLen
    stop = 0
    solve = function () {
      if (l > newLen) {
        ntext.pop()
      } else {
        ntext[l - 1] = stext[l - 1]
      }
      l--
    }
  } else {
    l = 0
    stop = newLen
    solve = function () {
      if (l < prevLen) {
        ntext[l] = stext[l]
      } else {
        ntext.push(stext[l])
      }
      l++
    }
  }
  var repl = setInterval(function () {
    solve()
    elm.textContent = ntext.join('')
    if (l === stop) {
      clearInterval(repl)
    }
  }, speed)
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/valva/src/modules/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/valva/src/modules/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isHidden": () => (/* binding */ isHidden),
/* harmony export */   "resetDisplay": () => (/* binding */ resetDisplay)
/* harmony export */ });
/* Vâlvă | (c) 2021-22 I-is-as-I-does | MIT License */

function isHidden(elm) {
  if (!elm) return false
  do {
    if (!(elm instanceof Element)) continue
    if (elm.hidden || !elm.offsetHeight) {
      return true
    }
    var style = window.getComputedStyle(elm)
    if (
      style.width === '0' ||
      style.height === '0' ||
      style.opacity === '0' ||
      style.display === 'none' ||
      style.visibility === 'hidden'
    ) {
      return true
    }
  } while ((elm = elm.parentNode))
  return false
}


function resetDisplay(elm) {
  elm.style.removeProperty('display')
  let display = window.getComputedStyle(elm).display
  if (display === 'none') display = 'block'
  elm.style.display = display
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNonEmptyArr": () => (/* binding */ isNonEmptyArr),
/* harmony export */   "isNonEmptyObj": () => (/* binding */ isNonEmptyObj),
/* harmony export */   "isNonEmptyStr": () => (/* binding */ isNonEmptyStr),
/* harmony export */   "seemsLikeValidDate": () => (/* binding */ seemsLikeValidDate),
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty)
/* harmony export */ });
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function isNonEmptyArr (it) {
  return Array.isArray(it) && it.length
}
function isNonEmptyObj (it) {
  return it && it !== null && it.constructor.name === 'Object' && Object.keys(it).length
}
function isNonEmptyStr (it) {
  return (typeof it === 'string' || it instanceof String) && it.length
}
function seemsLikeValidDate (string) {
  return isNonEmptyStr(string) && !isNaN(new Date(string))
}
function isElement (Obj) {
  return Obj instanceof Element
}
function isEmpty (it) {
  if (typeof it === 'object') {
    return !Object.keys(it).length
  }
  return !it || !it.length
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js":
/*!******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ucFirst": () => (/* binding */ ucFirst),
/* harmony export */   "randomInt": () => (/* binding */ randomInt),
/* harmony export */   "charCut": () => (/* binding */ charCut),
/* harmony export */   "randomString": () => (/* binding */ randomString),
/* harmony export */   "waitForElmInDOM": () => (/* binding */ waitForElmInDOM),
/* harmony export */   "replaceDiacritics": () => (/* binding */ replaceDiacritics),
/* harmony export */   "escapeRegExp": () => (/* binding */ escapeRegExp),
/* harmony export */   "splitOnLineBreaks": () => (/* binding */ splitOnLineBreaks),
/* harmony export */   "deepCopy": () => (/* binding */ deepCopy)
/* harmony export */ });
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function ucFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function randomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function charCut (string, limit, cutAnywhere = false) {
  string = string.trimEnd()
  if (string.length <= limit) {
    return string
  }
    if(limit < 6){
      return '(...)'
    }

    if(cutAnywhere || !string.match(/\s/)){
     return string.substring(0, limit - 5) + '(...)'
    } 
      var sp = string.split(/\s/)
     for(var p = sp.length - 1; p > -1; p--){
      string = string.slice(0, - (sp[p].length + 1))
      if(string.length + 6 < limit){
          break;
      }     
     }
     string += ' (...)'
     return string
}

function randomString (length = 10) {
  var rpt = 1
  if (length > 10) {
    rpt += Math.ceil(length / 10)
  }
  var str = ''
  for (var i = 0; i < rpt; i++) {
    str += Math.random().toString(36).substring(2, 10)
  }
  return str.substring(0, length)
}

function waitForElmInDOM (elmSelector, parentElm = null) {
  if (!parentElm || !(parentElm instanceof Element)) {
    parentElm = document.body
  }
  return new Promise((resolve) => {
    var elm = parentElm.querySelector(elmSelector)
    if (elm) {
      return resolve(elm)
    }

    var observer = new MutationObserver(() => {
      elm = parentElm.querySelector(elmSelector)
      if (elm) {
        observer.disconnect()
        resolve(elm)
      }
    })

    observer.observe(parentElm, {
      childList: true,
      subtree: true
    })
  })
}

function replaceDiacritics (text) {
  if (text === '' || text.length === 0) {
    return ''
  }
  var diactricMap = {
    À: 'A',
    Á: 'A',
    Â: 'A',
    Ã: 'A',
    Ä: 'A',
    Å: 'A',
    à: 'a',
    á: 'a',
    â: 'a',
    ã: 'a',
    ä: 'a',
    å: 'a',
    ă: 'a',
    ą: 'a',
    Ò: 'O',
    Ó: 'O',
    Ô: 'O',
    Õ: 'O',
    Ö: 'O',
    Ø: 'O',
    ò: 'o',
    ó: 'o',
    ô: 'o',
    õ: 'o',
    ö: 'o',
    ø: 'o',
    È: 'E',
    É: 'E',
    Ê: 'E',
    Ë: 'E',
    è: 'e',
    é: 'e',
    ê: 'e',
    ë: 'e',
    ð: 'e',
    ę: 'e',
    Ç: 'C',
    ç: 'c',
    ć: 'c',
    č: 'c',
    Ð: 'D',
    đ: 'd',
    ğ: 'g',
    Ì: 'I',
    Í: 'I',
    Î: 'I',
    Ï: 'I',
    ì: 'i',
    í: 'i',
    î: 'i',
    ï: 'i',
    Ł: 'L',
    ł: 'l',
    Ñ: 'N',
    ñ: 'n',
    ń: 'n',
    Š: 'S',
    š: 's',
    Ù: 'U',
    Ú: 'U',
    Û: 'U',
    Ü: 'U',
    ù: 'u',
    ú: 'u',
    û: 'u',
    ü: 'u',
    Ÿ: 'Y',
    ÿ: 'y',
    ý: 'y',
    Ž: 'Z',
    ž: 'z',
    Ż: 'Z',
    ż: 'z',
    ɶ: 'oe',
    Œ: 'OE',
    æ: 'ae',
    Æ: 'AE',
    ß: 'ss'
  }
  var diactrics = Object.keys(diactricMap)
  for (var diactricIndex = 0; diactricIndex < diactrics.length; diactricIndex++) {
    var from = diactrics[diactricIndex]
    var to = diactricMap[from]
    text = text.replace(from, to)
  }
  return text
}

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()/|[\]\\]/g, '\\$&')
}

function splitOnLineBreaks (string) {
  return string.split(/(\r\n|\n|\r)/gm)
}

function deepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Stock.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/jack-js/src/modules/Stock.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "getSessionStorage": () => (/* binding */ getSessionStorage),
/* harmony export */   "sizeInBytes": () => (/* binding */ sizeInBytes),
/* harmony export */   "jsonSize": () => (/* binding */ jsonSize),
/* harmony export */   "clearPartialStorage": () => (/* binding */ clearPartialStorage),
/* harmony export */   "isStorageAvailable": () => (/* binding */ isStorageAvailable),
/* harmony export */   "copyToClipboard": () => (/* binding */ copyToClipboard)
/* harmony export */ });
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function getLocalStorage () {
  if (isStorageAvailable('localStorage')) {
    return localStorage
  }
  return null
}

function getSessionStorage () {
  if (isStorageAvailable('sessionStorage')) {
    return sessionStorage
  }
  return null
}

function sizeInBytes (s) {
  return new TextEncoder().encode(s).length
}

function jsonSize (obj, inKb = true) {
  var sz = sizeInBytes(JSON.stringify(obj))
  if (inKb) {
    sz = sz / 1000
  }
  return sz
}

function clearPartialStorage (store, threshold = 2000) {
  var currentKb = jsonSize(store, true)
  for (var i = 0; i < store.length; i++) {
    if (currentKb < threshold) {
      break
    }
    var itmkey = store.key(i)
    var itemsize = jsonSize(store.getItem(itmkey), true)
    store.removeItem(itmkey)
    currentKb -= itemsize
  }
  return currentKb
}

function isStorageAvailable (type) {
  var storage
  try {
    storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length !== 0
    )
  }
}

function copyToClipboard (content, callback) {
  navigator.clipboard.writeText(content).then(() => callback())
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Style.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/jack-js/src/modules/Style.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nonRenderedElmHeight": () => (/* binding */ nonRenderedElmHeight),
/* harmony export */   "elmHasStyle": () => (/* binding */ elmHasStyle),
/* harmony export */   "cssExtract": () => (/* binding */ cssExtract),
/* harmony export */   "autoScrollToBottom": () => (/* binding */ autoScrollToBottom),
/* harmony export */   "autoScrollToTop": () => (/* binding */ autoScrollToTop)
/* harmony export */ });
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function nonRenderedElmHeight (elm) {
  var clone = elm.cloneNode(true)
  clone.style.visibility = 'hidden'
  document.append(clone)
  var height = clone.offsetHeight
  document.removeChild(clone)
  return height
}

function elmHasStyle (elm, property) {
  if (
    elm.getAttribute('style') &&
    elm.getAttribute('style').indexOf(property + ':') !== -1
  ) {
    return true
  }
  return false
}

// @doc: strenghts = 1,2,3
function cssExtract (strength = 2) {
  var s = {
    tags: [],
    ids: [],
    classes: [],
    combos: []
  }
  var fs = ''
  var loopcall = function (elms, prev = ' ') {
    Array.from(elms).forEach((elm) => {
      var tag = elm.tagName.toLowerCase()
      var nprev
      if (strength > 2) {
        nprev = prev + tag
      }

      if (!s.tags.includes(tag)) {
        s.tags.push(tag)
      }
      if (strength > 2 && !s.tags.includes(nprev)) {
        s.tags.push(nprev)
      }
      if (elm.id) {
        s.ids.push('#' + elm.id)
      }
      if (elm.classList.length) {
        elm.classList.forEach((classn) => {
          if (!s.classes.includes('.' + classn)) {
            s.classes.push('.' + classn)
          }
          if (strength > 1 && !s.combos.includes(tag + '.' + classn)) {
            s.combos.push(tag + '.' + classn)
          }
          if (strength > 2 && !s.combos.includes(nprev + '.' + classn)) {
            s.combos.push(nprev + '.' + classn)
          }
          if (elm.id && !s.combos.includes('#' + elm.id + '.' + classn)) {
            s.combos.push('#' + elm.id + '.' + classn)
          }
        })
      }
      if (tag !== 'html' && elm.children.length) {
        loopcall(elm.children, tag + ' ')
      }
    })
  }

  setTimeout(function () {
    loopcall([document.querySelector('html'), document.body])
    for (const [k, v] of Object.entries(s)) {
      fs += '/*' + k + '*/\r\n'
      v.forEach((itm) => {
        fs += itm + ' {\r\n}\r\n'
      })
    }
    var outputElm = document.createElement('TEXTAREA')
    outputElm.textContent = fs
    document.body.append(outputElm)
  }, 3000)
}

function autoScrollToBottom (elm) {
  elm.scrollIntoView({
    block: 'end',
    behavior: 'smooth'
  })
}
function autoScrollToTop (elm) {
  elm.scrollIntoView({
    block: 'start',
    behavior: 'smooth'
  })
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadJs": () => (/* binding */ loadJs),
/* harmony export */   "isValidHttpUrl": () => (/* binding */ isValidHttpUrl),
/* harmony export */   "loadJson": () => (/* binding */ loadJson),
/* harmony export */   "oembedLink": () => (/* binding */ oembedLink),
/* harmony export */   "oembedResponse": () => (/* binding */ oembedResponse),
/* harmony export */   "oembedIframe": () => (/* binding */ oembedIframe),
/* harmony export */   "pathBasename": () => (/* binding */ pathBasename),
/* harmony export */   "pageHasSheet": () => (/* binding */ pageHasSheet),
/* harmony export */   "loadCss": () => (/* binding */ loadCss),
/* harmony export */   "loadPagePreviewImg": () => (/* binding */ loadPagePreviewImg),
/* harmony export */   "stripHttp": () => (/* binding */ stripHttp),
/* harmony export */   "stripLastSlash": () => (/* binding */ stripLastSlash),
/* harmony export */   "displayUrl": () => (/* binding */ displayUrl),
/* harmony export */   "conciseUrl": () => (/* binding */ conciseUrl),
/* harmony export */   "miniUrl": () => (/* binding */ miniUrl),
/* harmony export */   "searchUrlParam": () => (/* binding */ searchUrlParam),
/* harmony export */   "toLastSlash": () => (/* binding */ toLastSlash),
/* harmony export */   "addFinalSlash": () => (/* binding */ addFinalSlash)
/* harmony export */ });
/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

function loadJs (signatureVar, url) {
  if (!window[signatureVar]) {
    return new Promise((resolve, reject) => {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.onload = () => resolve(script)
      script.onerror = () => reject(new Error('unable to load ' + url))
      script.src = url
      document.body.append(script)
    })
  } else {
    return Promise.resolve(true)
  }
}

function isValidHttpUrl (string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

function loadJson (url) {
  return fetch(url).then((response) => response.json())
}

function oembedLink (url, provider, maxwidth = null, maxheight = null) {
  provider = provider.toLowerCase()
  var map = {
    youtube: 'https://youtube.com/oembed?url=',
    vimeo: 'https://vimeo.com/api/oembed.json?url=',
    soundcloud: 'https://soundcloud.com/oembed?format=json&url='
  }
  if (Object.prototype.hasOwnProperty.call(map, provider)) {
    url = map[provider] + encodeURIComponent(url)
    if (maxwidth != null) {
      url += '&maxwidth=' + maxwidth
    }
    if (maxheight != null) {
      url += '&maxheight=' + maxheight
    }
    return url
  }

  return false
}

function oembedResponse (oembedLink) {
  return loadJson(oembedLink).then((response) => {
    if (response && Object.prototype.hasOwnProperty.call(response, 'html')) {
      return response
    }

    throw new Error('invalid oembed response')
  })
}


function oembedIframe (oembedResponse) {
    // @doc: rebuilding iframe elm for super safe dom insertion
  var url = oembedResponse.html.split('src="')[1].split('"')[0]
  var iframe = document.createElement('IFRAME')
  iframe.width = oembedResponse.width
  iframe.height = oembedResponse.height
  iframe.frameborder = 'no'
  iframe.scrolling = 'no'
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  iframe.allowfullscreen = true
  iframe.title = oembedResponse.title
  iframe.src = url
  return iframe
}

function pathBasename (path) {
  return path.split(/[\\/]/).pop()
}

function pageHasSheet (signatureRule, url) {
  if (document.styleSheets.length) {
    var basename = pathBasename(url)
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheetUrl = document.styleSheets[i].href
      if (sheetUrl) {
        if (sheetUrl === url || pathBasename(sheetUrl) === basename) {
          return true
        }
        if (sheetUrl.startsWith(window.location.origin) && Object.prototype.hasOwnProperty.call(document.styleSheets[i], 'cssRules')) {
          var rules = document.styleSheets[i].cssRules

          for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText === signatureRule) {
              return true
            }
          }
        }
      }
    }
  }
  return false
}

function loadCss (signatureRule, url, shadowRootElm = null) {
  if (shadowRootElm || !pageHasSheet(signatureRule, url)) {
    return new Promise((resolve, reject) => {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.onload = resolve
      link.onerror = reject
      link.href = url
      if (shadowRootElm) {
        shadowRootElm.append(link)
      } else {
        document.head.append(link)
      }
    })
  } else {
    return Promise.resolve(true)
  }
}

function loadPagePreviewImg (url, useCache = true) {
  // @doc: this is SLOW and MUST be used with parcimony without an API key
  if (isValidHttpUrl(url)) {
    var callback = function (imgsrc) {
      var img = document.createElement('IMG')
      img.src = imgsrc
      return img
    }
    if (useCache) {
      var imgsrc = localStorage.getItem('preview-' + url)
      if (imgsrc) {
        return Promise.resolve(callback(imgsrc))
      }
    }
    return loadJson(
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' +
        url +
        '&screenshot=true'
    ).then((response) => {
      if (
        response.lighthouseResult &&
        response.lighthouseResult.audits &&
        response.lighthouseResult.audits['final-screenshot'] &&
        response.lighthouseResult.audits['final-screenshot'].details &&
        response.lighthouseResult.audits['final-screenshot'].details.data
      ) {
        var imgsrc =
          response.lighthouseResult.audits['final-screenshot'].details.data
        if (useCache) {
          localStorage.setItem('preview-' + url, imgsrc)
        }
        return callback(imgsrc)
      }
      return Promise.reject(new Error(404))
    })
  }
  return Promise.reject(new Error(400))
}

function stripHttp (url) {
  return url.replace(/^(https?:\/\/)?/, '')
}

function stripLastSlash (url) {
  return url.replace(/\/?$/, '')
}

function displayUrl (url) {
  return stripHttp(url).replace(/\/*$/, '')
}

function conciseUrl (string, withPath = true) {
  var base = stripHttp(string).split('/')
  if(!base[base.length -1]){
    base.pop()
  }
  string = base[0]
  if (withPath && base.length > 1) {
    if (base.length > 2) {
      string += '/...'
    }
    var last = base.pop()
    if (last.length > 18) {
      last = '...' + last.substring(-15)
    }
    string += '/' + last
  }
  return string
}

function miniUrl (string) {
  var parts = string
    .replace(/^(https?:\/\/)?(www.)?/, '')
    .split(':')[0]
    .split('/')[0]
    .split('.')

  for (var p = 0; p < parts.length; p++) {
    if (parts[p].includes('-')) {
      parts[p] = parts[p]
        .split('-')
        .map((p) => p[0])
        .join('-')
    } else {
      var strar = parts[p].split('')
      var pass = 0
      for (var i = 0; i < strar.length; i++) {
        if (['a', 'e', 'i', 'o', 'u', 'y'].includes(strar[i])) {
          if (pass !== 0 && i !== pass + 1) {
            strar[i] = ''
          } else {
            pass = i
          }
        }
      }
      parts[p] = strar.join('')
    }
  }
  return parts.join('.')
}

function searchUrlParam (name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(
    window.location.href
  )
  if (results == null) {
    return null
  } else {
    return results[1] || 0
  }
}

function toLastSlash (url) {
  if (url.lastIndexOf('/') < 8 && url.substring(0, 4) === 'http') {
    url += '/'
  }
  return url.substring(0, url.lastIndexOf('/') + 1)
}

function addFinalSlash (string) {
  if (string.slice(-1) !== '/') {
    string += '/'
  }
  return string
}


/***/ })

}]);
//# sourceMappingURL=SSITU.js.map