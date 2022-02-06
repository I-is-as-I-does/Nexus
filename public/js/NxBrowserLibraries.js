"use strict";
(self["webpackChunknexus"] = self["webpackChunknexus"] || []).push([["NxBrowserLibraries"],{

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js":
/*!************************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultIO": () => (/* binding */ defaultIO),
/* harmony export */   "defaultStyle": () => (/* binding */ defaultStyle),
/* harmony export */   "defaultSignatureRule": () => (/* binding */ defaultSignatureRule),
/* harmony export */   "defaultElmId": () => (/* binding */ defaultElmId),
/* harmony export */   "defaultLang": () => (/* binding */ defaultLang)
/* harmony export */ });
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
const defaultIO = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxIO.js'
const defaultStyle = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NexusI.min.css'
const defaultSignatureRule = '.nx-instance'
const defaultElmId = '#Nexus'
const defaultLang = 'en'


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js":
/*!********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentUrl": () => (/* binding */ currentUrl),
/* harmony export */   "baseCurrentUrl": () => (/* binding */ baseCurrentUrl),
/* harmony export */   "splitCurrentUrl": () => (/* binding */ splitCurrentUrl),
/* harmony export */   "queries": () => (/* binding */ queries),
/* harmony export */   "getQuery": () => (/* binding */ getQuery),
/* harmony export */   "getAbsoluteUrl": () => (/* binding */ getAbsoluteUrl)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */




const currentUrl = window.location.href
const baseCurrentUrl = (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.toLastSlash)(currentUrl)
const splitCurrentUrl = (0,_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_1__.splitUrlAndId)(currentUrl)
const queries = new URLSearchParams(window.location.search.slice(1))

function getQuery (key) {
  return queries.has(key)
}
function getAbsoluteUrl (url) {
  if (url.length && url.substring(0, 4) !== 'http') {
    return baseCurrentUrl + url.replace(/^\.?\/?/, '')
  }
  return url
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxRequest.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/base/NxRequest.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRequest": () => (/* binding */ getRequest)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxDefaults.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js");
/* harmony import */ var _NxHost_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */





function getRequest (NxElm, appDefaultCss = null, appDefaultLang = null) {
  if(!appDefaultCss){
    appDefaultCss = _NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultStyle
  }
  if(!appDefaultLang){
    appDefaultLang = _NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultLang
  }
  var request = {
    url: null,
    id: '',
    style: appDefaultCss,
    lang: appDefaultLang
  }

  if (NxElm && NxElm.dataset) {
    if (NxElm.dataset.src) {
      var split = (0,_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_1__.splitUrlAndId)((0,_NxHost_js__WEBPACK_IMPORTED_MODULE_3__.getAbsoluteUrl)(NxElm.dataset.src))

      if (split.url) {
        request.url = split.url
        request.id = split.id
      }
    }
    if (NxElm.dataset.id && (0,_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_1__.isValidId)(NxElm.dataset.id)) {
      request.id = NxElm.dataset.id // @doc: id specified in data-id trumps id contained in src url
    }
    if (NxElm.dataset.style) {
      var cssUrl = (0,_NxHost_js__WEBPACK_IMPORTED_MODULE_3__.getAbsoluteUrl)(NxElm.dataset.style)
      if ((0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.isValidHttpUrl)(cssUrl)) {
        request.style = cssUrl
      }
    }
    if (NxElm.dataset.lang) {
      request.lang = NxElm.dataset.lang
    }
  }
  if (_NxHost_js__WEBPACK_IMPORTED_MODULE_3__.splitCurrentUrl.id) {
    request.id = _NxHost_js__WEBPACK_IMPORTED_MODULE_3__.splitCurrentUrl.id // @doc: id specified in url trumps all
  }
  return request
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxMedia.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxMedia.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dispatchMediaReady": () => (/* binding */ dispatchMediaReady),
/* harmony export */   "placeMedia": () => (/* binding */ placeMedia),
/* harmony export */   "setMediaUrl": () => (/* binding */ setMediaUrl),
/* harmony export */   "pageElm": () => (/* binding */ pageElm),
/* harmony export */   "videoElm": () => (/* binding */ videoElm),
/* harmony export */   "audioElm": () => (/* binding */ audioElm),
/* harmony export */   "imgElm": () => (/* binding */ imgElm),
/* harmony export */   "iframeElm": () => (/* binding */ iframeElm),
/* harmony export */   "mediaElm": () => (/* binding */ mediaElm),
/* harmony export */   "resolveEmbedMediaData": () => (/* binding */ resolveEmbedMediaData),
/* harmony export */   "resolveEmbedMedia": () => (/* binding */ resolveEmbedMedia),
/* harmony export */   "resolveMedia": () => (/* binding */ resolveMedia),
/* harmony export */   "preResolveViewMedia": () => (/* binding */ preResolveViewMedia)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _logs_NxLog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logs/NxLog */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _storg_NxMemory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storg/NxMemory */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _validt_NxSpecs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../validt/NxSpecs */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */







const mediaReadyEvent = new Event('mediaReady')

function dispatchMediaReady (resolvedElm, parentElm) {
  ;(0,_i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_1__.waitForElmInDOM)(resolvedElm.tagName, parentElm).then(() => {
    parentElm.dispatchEvent(mediaReadyEvent)
  })
}

function placeMedia (url, parentElm, mediaElm) {
  if (mediaElm.tagName !== 'A') {
    var loadEvent = 'load'
    var srcElm = mediaElm
    if (['VIDEO', 'AUDIO'].includes(mediaElm.tagName)) {
      loadEvent = 'loadedmetadata'
      if (mediaElm.tagName === 'VIDEO ') {
        srcElm = mediaElm.firstChild
      }
    }
    mediaElm.addEventListener(loadEvent, function () {
      dispatchMediaReady(mediaElm, parentElm)
    })
    srcElm.addEventListener('error', function () {
      ;(0,_logs_NxLog__WEBPACK_IMPORTED_MODULE_2__.logErr)('Unable to load requested media', url)
      var fallback = pageElm(url)
      mediaElm.replaceWith(fallback)
      dispatchMediaReady(fallback, parentElm)
    })
    srcElm.src = url
  } else {
    if(!mediaElm.textContent){
      mediaElm.textContent = (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.conciseUrl)(url, true)
    }
    dispatchMediaReady(mediaElm, parentElm)
    mediaElm.href = url
  }
  parentElm.append(mediaElm)
}

function setMediaUrl (srcElm, attrb = 'src', url = null) {
  if (url) {
    srcElm.setAttribute(attrb, url)
  }
}

function pageElm (url = null) {
  var mediaElm = document.createElement('A')
  mediaElm.target = '_blank'
  if(url){
    mediaElm.textContent = (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.conciseUrl)(url, true)
    mediaElm.setAttribute('href', url)
  }
  return mediaElm
}

function videoElm (url = null) {
  var mediaElm = document.createElement('VIDEO')
  mediaElm.setAttribute('controls', true)
  var srcElm = document.createElement('SOURCE')
  mediaElm.append(srcElm)
  setMediaUrl(srcElm, 'src', url)
  return mediaElm
}

function audioElm (url = null) {
  var mediaElm = document.createElement('AUDIO')
  mediaElm.setAttribute('controls', true)
  setMediaUrl(mediaElm, 'src', url)
  return mediaElm
}

function imgElm (url = null) {
  var mediaElm = document.createElement('IMG')
  setMediaUrl(mediaElm, 'src', url)
  return mediaElm
}

function iframeElm (url = null) {
  var mediaElm = document.createElement('IFRAME')
  mediaElm.scrolling = 'no'
  mediaElm.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
  mediaElm.allowfullscreen = true
  setMediaUrl(mediaElm, 'src', url)
  return mediaElm
}

function mediaElm (type, url = null) {
  if (_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_4__.supportedOembedMedia.includes(type)) {
    type = 'iframe'
  }
  var f
  switch (type) {
    case 'image':
      f = imgElm
      break
    case 'video':
      f = videoElm
      break
    case 'audio':
      f = audioElm
      break
    case 'iframe':
      f = iframeElm
      break
    default:
      f = pageElm
  }
  return f(url)
}

function resolveEmbedMediaData (url, type) {
  var iframeUrl = (0,_storg_NxMemory__WEBPACK_IMPORTED_MODULE_3__.getStoredOembedResponse)(url)
  var success = function () {
    return { type: type, url: iframeUrl }
  }
  var fallback = function () {
    return { type: 'page', url: url }
  }
  if (iframeUrl) {
    return Promise.resolve(success())
  }
  var link = (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.oembedLink)(url, type, 720)
  if (!link) {
    return Promise.resolve(fallback())
  }
  return (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.oembedResponse)(link).then(response => {
    iframeUrl = response.html.split('src="')[1].split('"')[0]
    ;(0,_storg_NxMemory__WEBPACK_IMPORTED_MODULE_3__.registerOembedResponse)(url, iframeUrl)
    return success()
  }).catch((err) => {
    (0,_logs_NxLog__WEBPACK_IMPORTED_MODULE_2__.logErr)('Failed to resolved oembed media', { url: url, err: err.message })
    return fallback()
  })
}

function resolveEmbedMedia (url, type, parentElm) {
  resolveEmbedMediaData(url, type).then(result => {
    placeMedia(result.url, parentElm, mediaElm(result.type))
  })
}

function resolveMedia (url, type, parentElm) {
  if (_validt_NxSpecs__WEBPACK_IMPORTED_MODULE_4__.supportedOembedMedia.includes(type)) {
    resolveEmbedMedia(url, type, parentElm)
  } else {
    placeMedia(url, parentElm, mediaElm(type))
  }
}

function preResolveViewMedia (view) {
  if(view.data.content.media.type === 'page'){
    view.resolved.media = true
    return Promise.resolve(view)
  }
  var host = document.createElement('DIV')
  host.style.display = 'none'
  document.body.append(host)
  var handleResult = function () {
    if (host.firstChild.tagName === 'A' && view.data.content.media.type !== 'page') {
      view.data.content.media.type = 'page'
    } else if (host.firstChild.tagName === 'IFRAME') {
      view.data.content.media.url = host.firstChild.src
    }
    host.remove()
    view.resolved.media = true
    return view
  }
  var promise = new Promise(function (resolve) {
    host.addEventListener('mediaReady', resolve)
  }).then(handleResult)
  resolveMedia(view.data.content.media.url, view.data.content.media.type, host)
  return promise
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSnippet.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSnippet.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSnippet": () => (/* binding */ getSnippet)
/* harmony export */ });
/* harmony import */ var _base_NxDefaults__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/NxDefaults */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */


function getSnippet (src, style = null, scriptSrc = null, lang = null) {
  // @doc does NOT validate arguments;
  var datalang = ''
  if (lang) {
    datalang = ' data-lang="' + lang + '"'
  }
  var datastyle = ''
  if (style) {
    datastyle = ' data-style="' + style + '"'
  }
  if (!scriptSrc) {
    scriptSrc = _base_NxDefaults__WEBPACK_IMPORTED_MODULE_0__.defaultIO
  }
  return `<div id="Nexus" data-src="${src}"${datastyle}${datalang}></div>
<script src="${scriptSrc}"></script>`
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSpin.js":
/*!********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSpin.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spinner": () => (/* binding */ Spinner)
/* harmony export */ });
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
class Spinner {
  constructor(spinContainer, spinStates = [], speed = 150) {
    this.spinContainer = spinContainer
    if(!spinStates.length){
        spinStates = ["", "/", "–", "\\", "|"]
    } else if(spinStates.length[0] !== ''){
        spinStates.unshift('')
    }
    this.spinStates = spinStates
    this.speed = speed
    this.spinPosition = -1
  }

  endSpin() {
    this.spinPosition = -1
  }
  
  startSpin() {
    this.spinPosition = 0
    var f = window.setInterval(function(){
        if (this.spinPosition === -1) {
            clearInterval(f)
          } else {
            this.spinContainer.textContent = this.spinStates[this.spinPosition]
            if (this.spinPosition === this.spinStates.length) {
              this.spinPosition = 1
            } else {
              this.spinPosition++
            }
          }
    }.bind(this), this.speed)
  }
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxInit.js":
/*!********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/load/NxInit.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultInitOptions": () => (/* binding */ defaultInitOptions),
/* harmony export */   "setCookie": () => (/* binding */ setCookie),
/* harmony export */   "initLogger": () => (/* binding */ initLogger),
/* harmony export */   "retrieveNxElm": () => (/* binding */ retrieveNxElm),
/* harmony export */   "resolveTheme": () => (/* binding */ resolveTheme),
/* harmony export */   "resolveData": () => (/* binding */ resolveData),
/* harmony export */   "initAll": () => (/* binding */ initAll)
/* harmony export */ });
/* harmony import */ var _NxStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxStyle.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js");
/* harmony import */ var _logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _base_NxRequest_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/NxRequest.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxRequest.js");
/* harmony import */ var _base_NxHost_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _NxSrc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxSrc.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../base/NxDefaults.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */








const defaultInitOptions = {
  customSelector: null,
  forceLog: false,
  forceStyle: null,
  customSignatureRule: null,
  appDefaultCss: null, 
  appDefaultLang: null
}

function setCookie () {
  document.cookie = 'Nx=Instance; SameSite=None; Secure'
}

function initLogger (forceLog = false) {
  if (forceLog || (0,_base_NxHost_js__WEBPACK_IMPORTED_MODULE_3__.getQuery)('log')) {
    (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.setConsoleLog)(true)
  }
}

function retrieveNxElm (customSelector = null) {
  var selectors = [_base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_5__.defaultElmId]
  if (customSelector && customSelector !== _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_5__.defaultElmId) {
    selectors.unshift(customSelector)
  }
  var elm
  for (var s = 0; s < 2; s++) {
    elm = document.querySelector(selectors[s])
    if (elm) {
      return elm
    }
  }
  elm = document.createElement('DIV')
  elm.id = _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_5__.defaultElmId

  return elm
}

function resolveTheme (request, fallbackCssUrl = null, forceStyle = null, customSignatureRule = null) {
  var url = request.style
  if (forceStyle) {
    url = forceStyle
    if(!fallbackCssUrl || fallbackCssUrl === forceStyle){
      fallbackCssUrl = request.style
    } 
  } else if(fallbackCssUrl === url){
    fallbackCssUrl = null
  }
  return (0,_NxStyle_js__WEBPACK_IMPORTED_MODULE_0__.loadAppCss)(url, customSignatureRule, fallbackCssUrl)
}

function resolveData (request) {
  if (request.url) {
    return (0,_NxSrc_js__WEBPACK_IMPORTED_MODULE_4__.getSrcData)(request.url).then(nxdata => {
      return nxdata
    })
  }
  return Promise.reject(new Error(0))
}

function initAll (options = {}) {
  var seed = {}
  seed.options = Object.assign({}, defaultInitOptions, options)
  setCookie()
  initLogger(seed.options.forceLog)
  seed.nxelm = retrieveNxElm(seed.options.customSelector)
  seed.request = (0,_base_NxRequest_js__WEBPACK_IMPORTED_MODULE_2__.getRequest)(seed.nxelm, seed.options.appDefaultCss, seed.options.appDefaultLang)
    return resolveTheme(seed.request, seed.options.appDefaultCss, seed.options.forceStyle, seed.options.customSignatureRule)
    .then((styleUrl) => {
      seed.styleUrl = styleUrl
      return resolveData(seed.request)
    }).then(nxdata => {
      seed.nxdata = nxdata
      return seed
    }).catch(err => {
      var msg = err.message
      if (!Number.isInteger(msg)) {
        (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('Nexus Init Failed', msg)
        msg = 400
      }
      throw new Error(msg)
    })
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getThreadsList": () => (/* binding */ getThreadsList),
/* harmony export */   "loadSrc": () => (/* binding */ loadSrc),
/* harmony export */   "prcFileSrc": () => (/* binding */ prcFileSrc),
/* harmony export */   "loadSrcFile": () => (/* binding */ loadSrcFile),
/* harmony export */   "getSrcData": () => (/* binding */ getSrcData)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storg/NxMemory.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */





function getThreadsList (nxdata) {
  var list = []
  nxdata.threads.forEach((thread) => {
    list.push(thread.id)
  })
  return list
}

function loadSrc (url) {
  // @doc: src should not contain #id
  return (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.loadJson)(url)

    .then((nxdata) => {
      nxdata = (0,_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_3__.validData)(nxdata)

      if (nxdata) {
        (0,_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_2__.registerData)(url, nxdata)
        return nxdata
      }
      (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('Invalid source', url)
      return Promise.reject(new Error(400))
    })
    .catch((err) => {
      var code = 400
      if (err.message !== 400) {
        code = 404
        ;(0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('No response', err.message)
      }
      (0,_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_2__.registerData)(url, code)
      return Promise.reject(new Error(code))
    })
}

function prcFileSrc (readerEvent) {
  var nxdata = JSON.parse(readerEvent.target.result)
  if (nxdata) {
    nxdata = (0,_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_3__.validData)(nxdata)
    if (nxdata) {
      return nxdata
    }
  }
  return false
}

function loadSrcFile (inputEvt) {
  if (inputEvt.target.files.length) {
    if (inputEvt.target.files[0].type === 'application/json') {
      return new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onload = function (event) {
          var nxdata = prcFileSrc(event)
          if (nxdata) {
            resolve(nxdata)
          } else {
            (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('Invalid source', inputEvt.target.files[0])
            reject(new Error(400))
          }
        }
        return reader.readAsText(inputEvt.target.files[0])
      })
    }
    (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('Invalid file type', inputEvt.target.files[0])
    return Promise.reject(new Error(400))
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('No file selected')
  return Promise.reject(new Error(400))
}

function getSrcData (url) {
  // @doc: url should not contain #id
  var nxdata = (0,_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_2__.getStoredData)(url)
  if (nxdata !== null) {
    if (Number.isInteger(nxdata)) {
      return Promise.reject(new Error(nxdata))
    }
    return Promise.resolve(nxdata)
  }
  return loadSrc(url)
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadAppCss": () => (/* binding */ loadAppCss),
/* harmony export */   "isCssLoaded": () => (/* binding */ isCssLoaded)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../base/NxDefaults.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxDefaults.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */




function loadAppCss (url = null, signatureRule = null, fallbackUrl = null) {
  if (!url) {
    url = _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultStyle
  }
  if (!signatureRule) {
    signatureRule = _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultSignatureRule
  }
  if (!fallbackUrl && url !== _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultStyle) {
    fallbackUrl = _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultStyle
  }
  return (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.loadCss)(signatureRule, url)
    .then(() => {
      return Promise.resolve(url)
    }).catch((err) => {
      (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.logErr)('Theme not found', err.message)
      if (fallbackUrl) {
        return loadAppCss(fallbackUrl)
      } else {
        return Promise.reject(new Error(404))
      }
    })
}

function isCssLoaded (url = null, signatureRule = null) {
  if (!url) {
    url = _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultStyle
  }
  if (!signatureRule) {
    signatureRule = _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultSignatureRule
  }
  return (0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_0__.pageHasSheet)(signatureRule, _base_NxDefaults_js__WEBPACK_IMPORTED_MODULE_2__.defaultStyle)
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setConsoleLog": () => (/* binding */ setConsoleLog),
/* harmony export */   "clearErr": () => (/* binding */ clearErr),
/* harmony export */   "logErr": () => (/* binding */ logErr),
/* harmony export */   "getErr": () => (/* binding */ getErr)
/* harmony export */ });
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */

var errors = []
var consoleLog = false

function setConsoleLog (bool = true) {
  consoleLog = bool
}
function clearErr () {
  errors = []
}

function logErr (msg, detail = null) {
  var entry = { msg: msg }
  if (detail) {
    entry.detail = detail
  }
  errors.push(entry)
  if (consoleLog) {
    console.log('Nexus/Error: ' + JSON.stringify(entry))
  }
}

function getErr () {
  return errors
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registerEditData": () => (/* binding */ registerEditData),
/* harmony export */   "getStoredEditData": () => (/* binding */ getStoredEditData),
/* harmony export */   "registerThreadVisit": () => (/* binding */ registerThreadVisit),
/* harmony export */   "isThreadContentUnseen": () => (/* binding */ isThreadContentUnseen),
/* harmony export */   "clearData": () => (/* binding */ clearData),
/* harmony export */   "registerData": () => (/* binding */ registerData),
/* harmony export */   "registerLinkedMaps": () => (/* binding */ registerLinkedMaps),
/* harmony export */   "getStoredLinkedMaps": () => (/* binding */ getStoredLinkedMaps),
/* harmony export */   "getStoredData": () => (/* binding */ getStoredData),
/* harmony export */   "registerOembedResponse": () => (/* binding */ registerOembedResponse),
/* harmony export */   "getStoredOembedResponse": () => (/* binding */ getStoredOembedResponse),
/* harmony export */   "setStoredLang": () => (/* binding */ setStoredLang),
/* harmony export */   "getStoredLang": () => (/* binding */ getStoredLang)
/* harmony export */ });
/* harmony import */ var _NxStorage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxStorage.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxStorage.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */



var visitStore = {}
var dataStore = {}
var linkedStore = {}

var oembedStore = {}
const editpsrcix = 'nx-edit#'

function threadLastSeenDate (src) {
  return (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.getStoredItem)(src, 'local', visitStore)
}

function registerEditData (url, nxdata) {
  (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.storeItem)(editpsrcix + url, nxdata, 'local')
}

function getStoredEditData (url) {
  return (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.getStoredItem)(editpsrcix + url, 'local')
}

function registerThreadVisit (src, timestamp) {
  if (!Object.prototype.hasOwnProperty.call(visitStore, src)) {
    (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.storeItem)(src, timestamp, 'local', visitStore)
  }
}

function isThreadContentUnseen (src, timestamp) {
  var lastKnownDate = threadLastSeenDate(src)

  if (!lastKnownDate) {
    return true
  }
  if (timestamp && lastKnownDate !== timestamp) {
    return true
  }
  return false
}

function clearData (url) {
  (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.removeItem)(url, 'session', dataStore)
}

function registerData (url, nxdata) {
  (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.storeItem)(url, nxdata, 'session', dataStore)
}

function registerLinkedMaps (src, map) {
  (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.storeItem)(src + ':linked', map, 'session', linkedStore)
}

function getStoredLinkedMaps (src) {
  return (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.getStoredItem)(src + ':linked', 'session', linkedStore)
}

function getStoredData (url) {
  return (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.getStoredItem)(url, 'session', dataStore)
}

function registerOembedResponse (givenUrl, response) {
  (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.storeItem)(givenUrl, response, 'local', oembedStore)
}

function getStoredOembedResponse (givenUrl) {
  return (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.getStoredItem)(givenUrl, 'local', oembedStore)
}

function setStoredLang (lang) {
  (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.storeItem)('nx-lang', lang, 'local')
}
function getStoredLang () {
  return (0,_NxStorage_js__WEBPACK_IMPORTED_MODULE_0__.getStoredItem)('nx-lang', 'local')
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxStorage.js":
/*!************************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxStorage.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "storeItem": () => (/* binding */ storeItem),
/* harmony export */   "getStoredItem": () => (/* binding */ getStoredItem),
/* harmony export */   "removeItem": () => (/* binding */ removeItem),
/* harmony export */   "clearCache": () => (/* binding */ clearCache)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Stock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Stock */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Stock.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */


const locStorag = (0,_i_is_as_i_does_jack_js_src_modules_Stock__WEBPACK_IMPORTED_MODULE_0__.getLocalStorage)()
const sesStorag = (0,_i_is_as_i_does_jack_js_src_modules_Stock__WEBPACK_IMPORTED_MODULE_0__.getSessionStorage)()

function setStorageAvailability (store) {
  if (store && !store.getItem('available')) {
    store.setItem('available', 5000)
  }
}

function resolveStore (storage) {
  if (storage === 'session') {
    return sesStorag
  }
  return locStorag
}

setStorageAvailability(locStorag)
setStorageAvailability(sesStorag)

function storeItem (key, data, storage = 'session', instanceStore = null) {
  var sdata = JSON.stringify(data)
  if (instanceStore) {
    instanceStore[key] = sdata
  }
  var store = resolveStore(storage)
  if (store != null) {
    var datasize = (0,_i_is_as_i_does_jack_js_src_modules_Stock__WEBPACK_IMPORTED_MODULE_0__.jsonSize)(sdata, true, true)
    if (datasize > 2000) {
      return
    }

    var avail = store.getItem('available')
    if (avail < 1000) {
      avail = 5000 - (0,_i_is_as_i_does_jack_js_src_modules_Stock__WEBPACK_IMPORTED_MODULE_0__.clearPartialStorage)(store, 2000)
    }
    avail -= datasize
    store.setItem(key, sdata)
    store.setItem('available', Math.ceil(avail))
  }
}

function getStoredItem (key, storage = 'session', instanceStore = null) {
  if (instanceStore !== null && Object.prototype.hasOwnProperty.call(instanceStore, key)) {
    return JSON.parse(instanceStore[key])
  }
  var store = resolveStore(storage)
  if (store) {
    var sdata = store.getItem(key)
    if (sdata) {
      if (instanceStore) {
        instanceStore[key] = sdata
      }
      return JSON.parse(sdata)
    }
  }
  return null
}

function removeItem (key, storage = 'session', instanceStore = null) {
  if (instanceStore & Object.prototype.hasOwnProperty.call(instanceStore, key)) {
    delete instanceStore[key]
  }
  var store = resolveStore(storage)
  if (store) {
    store.removeItem(key)
  }
}
function clearCache () {
  [sesStorag, locStorag].forEach(store => {
    if (store) {
      store.clear()
    }
  })
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setOriginLang": () => (/* binding */ setOriginLang),
/* harmony export */   "setAdtTranslations": () => (/* binding */ setAdtTranslations),
/* harmony export */   "langIsAvailable": () => (/* binding */ langIsAvailable),
/* harmony export */   "setUserSelectedLang": () => (/* binding */ setUserSelectedLang),
/* harmony export */   "getAvailableLangs": () => (/* binding */ getAvailableLangs),
/* harmony export */   "getLang": () => (/* binding */ getLang),
/* harmony export */   "getTxt": () => (/* binding */ getTxt)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Check */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js");
/* harmony import */ var _storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storg/NxMemory.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _NxTranslations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxTranslations.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxTranslations.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */




var txts = _NxTranslations_js__WEBPACK_IMPORTED_MODULE_2__.NxTranslations
var availableLangs = Object.keys(txts)

var storedLang = (0,_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.getStoredLang)()
if (storedLang != null && !langIsAvailable(storedLang)) {
  storedLang = null
  ;(0,_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.setStoredLang)(null)
}

var currentLang = null
if (storedLang) {
  currentLang = storedLang
} else {
  currentLang = document.querySelector('html').lang
  if (!langIsAvailable(currentLang)) {
    currentLang = 'en'
  }
}

function updateStorage (lang) {
  if (storedLang !== lang) {
    (0,_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.setStoredLang)(lang)
    storedLang = lang
  }
}

function setOriginLang (lang) {
  // @doc lang should be seed.request.lang from NxInit, or custom one
  if (!storedLang) {
    setUserSelectedLang(lang)
  }
}

function setAdtTranslations (translObj) {
  if ((0,_i_is_as_i_does_jack_js_src_modules_Check__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyObj)(translObj)) {
    Object.assign(txts, translObj) // @todo: test if works as expected from nested props
    availableLangs.push(
      ...Object.keys(txts).filter(
        (item) => availableLangs.indexOf(item) < 0
      )
    )
    return true
  }
  return false
}

function langIsAvailable (lang) {
  return (0,_i_is_as_i_does_jack_js_src_modules_Check__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyStr)(lang) && availableLangs.includes(lang)
}

function setUserSelectedLang (lang) {
  if (langIsAvailable(lang) && lang !== currentLang) {
    currentLang = lang
    updateStorage(lang)
    return true
  }
  return false
}

function getAvailableLangs () {
  return availableLangs
}

function getLang () {
  return currentLang
}

function getTxt (key) {
  var text = key
  if (currentLang !== 'en' && txts[currentLang][key]) {
    text = txts[currentLang][key]
  }
  return text
}

/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateTextElm": () => (/* binding */ updateTextElm),
/* harmony export */   "triggerTranslate": () => (/* binding */ triggerTranslate),
/* harmony export */   "registerTranslElm": () => (/* binding */ registerTranslElm)
/* harmony export */ });
/* harmony import */ var _NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */



var translStore = {}

function updateTextElm (elm, textkey) {
  ;(0,_i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_1__.vSplitFlap)(elm, (0,_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__.getTxt)(textkey), 50)
}

function triggerTranslate (lang) {
  if ((0,_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__.setUserSelectedLang)(lang)) {
    for (const [textkey, elms] of Object.entries(translStore)) {
      elms.forEach((elm) => {
        updateTextElm(elm, textkey)
      })
    }
  }
}

function registerTranslElm (elm, textkey) {
  if (!translStore[textkey]) {
    translStore[textkey] = []
  }
  translStore[textkey].push(elm)
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxTranslations.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxTranslations.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NxTranslations": () => (/* binding */ NxTranslations)
/* harmony export */ });
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */

const NxTranslations = {
  fr: {
    author: 'auteur·e',
    handle: 'pseudonyme',
    about: 'à propos',
    url: 'url',
    id: 'id',
    title: 'titre',
    description: 'description',
    timestamp: 'date',
    main: 'corps',
    aside: 'aparté',
    media: 'média',
    type: 'type',
    caption: 'légende',
    index: 'index',
    distant: 'distant',
    local: 'local',
    threads: 'fils',
    linked: 'liés',
    content: 'contenu',
    history: 'historique',
    copied: 'copié',
    embed: 'intégré',
    source: 'source',
    saved: 'sauvegardé',
    'local thread': 'fil local',
    'linked threads': 'fils liés',
    'No valid thread': 'Aucun fil valide',
    'Duplicate thread id': 'Identifiant du fil en double',
    'Duplicate linked thread': 'Fil lié en double',
    'Invalid linked thread': 'Fil lié non valide',
    'Invalid url': 'Url non valide',
    'Invalid thread id': 'Identifiant de fil non valide',
    'Invalid length': 'Longueur non valide',
    'Invalid min length': 'Longueur minimale non valide',
    'Invalid max length': 'Longueur maximale non valide',
    'Unable to cut string': 'Impossible de raccourcir le texte',
    'Invalid timestamp': 'Horodatage non valide',
    'Unknown field': 'Champ inconnu',
    'Invalid field type': 'Type de champ non valide',
    'Field is empty': 'Le champ est vide',
    'Unable to extend string': 'Impossible de prolonger le texte',
    'Unknown characters limits category':
    'Catégorie de limite de caractères inconnue',
    'Unknown items limits category': "Catégorie de limite d'éléments inconnue",
    'Invalid media type': 'Type de media non valide',
    'Invalid app url': "Url de l'application non valide",
    'Too many linked threads': 'Trop de fils liés',
    'Too many threads': 'Trop de fils',
    'Init failed': "L'initialisation a échoué",
    'Theme not found': 'Thème non trouvé',
    'No response': 'Aucune réponse',
    'Invalid source': 'Source non valide',
    'Invalid Nexus data': 'Données Nexus non valides'
  }
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appUrl": () => (/* binding */ appUrl),
/* harmony export */   "typesMap": () => (/* binding */ typesMap),
/* harmony export */   "required": () => (/* binding */ required),
/* harmony export */   "charMinMax": () => (/* binding */ charMinMax),
/* harmony export */   "itemsMinMax": () => (/* binding */ itemsMinMax),
/* harmony export */   "supportedOembedMedia": () => (/* binding */ supportedOembedMedia),
/* harmony export */   "supportedBaseMedia": () => (/* binding */ supportedBaseMedia),
/* harmony export */   "supportedMediaTypes": () => (/* binding */ supportedMediaTypes),
/* harmony export */   "timestampPattern": () => (/* binding */ timestampPattern),
/* harmony export */   "idPattern": () => (/* binding */ idPattern),
/* harmony export */   "urlPattern": () => (/* binding */ urlPattern)
/* harmony export */ });
/* eslint-disable no-useless-escape */
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
const appUrl = 'https://nexus-dock.github.io/'
const typesMap = {
  nxdata: 'Object',
  nexus: 'String',
  author: 'Object',
  handle: 'String',
  about: 'String',
  url: 'String',
  threads: 'Array',
  'threads.item': 'Object',
  id: 'String',
  title: 'String',
  description: 'String',
  content: 'Object',
  timestamp: 'String',
  main: 'String',
  aside: 'String',
  media: 'Object',
  type: 'String',
  caption: 'String',
  linked: 'Array',
  'linked.item': 'String'
}
const required = ['nexus', 'author', 'threads', 'handle', 'url', 'id', 'title', 'content', 'timestamp', 'main', 'type']
const charMinMax = {
  handle: [3, 30],
  about: [0, 400],
  title: [3, 30],
  description: [0, 400],
  main: [1, 1000],
  aside: [0, 400],
  caption: [0, 200]
}
const itemsMinMax = {
  threads: [1, 100],
  linked: [0, 100]
}
const supportedOembedMedia = [
  'youtube',
  'vimeo',
  'soundcloud'
]
const supportedBaseMedia = [
  'page',
  'video',
  'image',
  'audio'
]
const supportedMediaTypes = supportedBaseMedia.concat(supportedOembedMedia)
const timestampPattern =
    '^[0-9]{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?((T|\s)(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]))?)?$'
const idPattern = '^[a-zA-Z0-9-]{3,36}$'
const urlPattern = '^https?:\/\/.*'


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "charLimits": () => (/* binding */ charLimits),
/* harmony export */   "itmLimits": () => (/* binding */ itmLimits),
/* harmony export */   "isValidMediaType": () => (/* binding */ isValidMediaType),
/* harmony export */   "extendString": () => (/* binding */ extendString),
/* harmony export */   "validLenghtStr": () => (/* binding */ validLenghtStr),
/* harmony export */   "hasValidType": () => (/* binding */ hasValidType),
/* harmony export */   "validMedia": () => (/* binding */ validMedia),
/* harmony export */   "isValidTimestamp": () => (/* binding */ isValidTimestamp),
/* harmony export */   "validContent": () => (/* binding */ validContent),
/* harmony export */   "cutString": () => (/* binding */ cutString),
/* harmony export */   "strHasValidMaxLength": () => (/* binding */ strHasValidMaxLength),
/* harmony export */   "strHasValidMinLength": () => (/* binding */ strHasValidMinLength),
/* harmony export */   "hasValidLength": () => (/* binding */ hasValidLength),
/* harmony export */   "splitUrlAndId": () => (/* binding */ splitUrlAndId),
/* harmony export */   "isValidId": () => (/* binding */ isValidId),
/* harmony export */   "isValidUrl": () => (/* binding */ isValidUrl),
/* harmony export */   "isValidLinkItm": () => (/* binding */ isValidLinkItm),
/* harmony export */   "getValidSrcUrl": () => (/* binding */ getValidSrcUrl),
/* harmony export */   "validLinks": () => (/* binding */ validLinks),
/* harmony export */   "validThread": () => (/* binding */ validThread),
/* harmony export */   "validThreads": () => (/* binding */ validThreads),
/* harmony export */   "validAuthor": () => (/* binding */ validAuthor),
/* harmony export */   "isValidAppUrl": () => (/* binding */ isValidAppUrl),
/* harmony export */   "validAppUrl": () => (/* binding */ validAppUrl),
/* harmony export */   "validData": () => (/* binding */ validData)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Check__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Check */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/* harmony import */ var _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _base_NxHost_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */








function charLimits (catg) {
  if (Object.prototype.hasOwnProperty.call(_NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.charMinMax, catg)) {
    return _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.charMinMax[catg]
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Unknown characters limits category', catg)
  return false
}

function itmLimits (catg) {
  if (Object.prototype.hasOwnProperty.call(_NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.itemsMinMax, catg)) {
    return _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.itemsMinMax[catg]
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Unknown items limits category', catg)
  return false
}

function isValidMediaType (mediaType) {
  if (
    hasValidType(mediaType, 'type', true) &&
      _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.supportedMediaTypes.includes(mediaType)
  ) {
    return true
  }

  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid media type', mediaType)
  return false
}

function extendString (str, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    var diff = limits[0] - str.length
    if (diff > 0) {
      var placeholder = '-'
      str = placeholder.repeat(diff) + str
    }
    return str
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Unable to extend string', catg)
  return null
}

function validLenghtStr (str, catg, nonEmpty = true) {
  if (!hasValidType(str, catg, nonEmpty)) {
    str = ''
  }
  if (!strHasValidMinLength(str, catg)) {
    str = extendString(str, catg)
  } else if (!strHasValidMaxLength(str, catg)) {
    str = cutString(str, catg)
  }
  return str
}

function hasValidType (item, field, nonEmpty = true) {
  if (Object.prototype.hasOwnProperty.call(_NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.typesMap, field)) {
    var type = _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.typesMap[field]
    if (
      typeof item !== 'undefined' &&
        item !== null &&
        item.constructor.name === type
    ) {
      if (!nonEmpty || !(0,_i_is_as_i_does_jack_js_src_modules_Check__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(item)) {
        return true
      }
      (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Field is empty', field)
    } else {
      (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid field type', field)
    }
  } else {
    (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Unknown field', field)
  }

  return false
}

function validMedia (mediaObj) {
  if (
    hasValidType(mediaObj, 'media', true) &&
      isValidUrl(mediaObj.url) &&
      isValidMediaType(mediaObj.type)
  ) {
    var m = {}
    m.url = mediaObj.url
    m.type = mediaObj.type
    m.caption = ''
    if (mediaObj.caption) {
      m.caption = validLenghtStr(mediaObj.caption, 'caption', false)
    }
    return m
  }
  return { url: '', type: '', caption: '' }
}

function isValidTimestamp (timestamp, strict = false) {
  if (
    hasValidType(timestamp, 'timestamp', true) &&
      (timestamp.match(_NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.timestampPattern) ||
        (!strict && (0,_i_is_as_i_does_jack_js_src_modules_Check__WEBPACK_IMPORTED_MODULE_0__.seemsLikeValidDate)(timestamp)))
  ) {
    return true
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid timestamp', timestamp)
  return false
}

function validContent (content) {
  if (
    hasValidType(content, 'content', true) &&
      isValidTimestamp(content.timestamp) &&
      hasValidType(content.main, 'main', true)
  ) {
    var main = validLenghtStr(content.main, 'main')

    if (main) {
      var c = {}
      c.timestamp = content.timestamp
      c.main = main
      c.aside = ''
      if (content.aside) {
        c.aside = validLenghtStr(content.aside, 'aside', false)
      }
      c.media = validMedia(content.media)
      return c
    }
  }

  return null
}

function cutString (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    return (0,_i_is_as_i_does_jack_js_src_modules_Help__WEBPACK_IMPORTED_MODULE_1__.charCut)(item, limits[1])
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Unable to cut string', catg)
  return ''
}

function strHasValidMaxLength (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    if (item.length <= limits[1]) {
      return true
    }
    (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid max length', catg)
  }
  return false
}
function strHasValidMinLength (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    if (item.length >= limits[0]) {
      return true
    }
    (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid min length', catg)
  }
  return false
}

function hasValidLength (item, catg) {
  var limits = charLimits(catg)
  if (limits !== false) {
    if (item.length >= limits[0] && item.length <= limits[1]) {
      return true
    }
    (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid length', catg)
  }
  return false
}

function splitUrlAndId (url) {
  var rt = {
    url: null,
    id: ''
  }
  if ((0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_2__.isValidHttpUrl)(url)) {
    rt.url = url

    if (url.includes('#')) {
      var sp = url.split('#')
      var id = sp.pop()
      rt.url = sp.join('#')
      if (id && isValidId(id)) {
        rt.id = id
      }
    }
  }

  return rt
}

function isValidId (id) {
  if (hasValidType(id, 'id', true) && id.match(_NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.idPattern)) {
    return true
  }

  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid thread id', id)
  return false
}

function isValidUrl (url) {
  if ((0,_i_is_as_i_does_jack_js_src_modules_Web__WEBPACK_IMPORTED_MODULE_2__.isValidHttpUrl)(url)) {
    return true
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid url', url)
  return false
}

function isValidLinkItm (link) {
  if (
    hasValidType(link, 'linked.item', true) &&
      isValidUrl(link)
  ) {
    return true
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid linked thread')
  return false
}

function getValidSrcUrl (url, id) {
  url = (0,_base_NxHost_js__WEBPACK_IMPORTED_MODULE_5__.getAbsoluteUrl)(url)
  if (isValidLinkItm(url)) {
    if (id && isValidId(id)) {
      url += '#' + id
    }
    return url
  }
  return ''
}

function validLinks (linked) {
  var vlinked = []
  if (hasValidType(linked, 'linked', false)) {
    var len = linked.length
    var limit = itmLimits('linked')[1]
    if (len > limit) {
      (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Too many linked threads', len + ' /' + limit)
      len = limit
    }
    for (var i = 0; i < len; i++) {
      if (isValidLinkItm(linked[i])) {
        var split = splitUrlAndId(linked[i])
        var url = split.url
        if (split.id) {
          url += '#' + split.id
        }

        if (!vlinked.includes(url)) {
          vlinked.push(url)
          continue
        }
        (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Duplicate linked thread', linked[i])
      }
    }
  }
  return vlinked
}

function validThread (thread) {
  if (
    hasValidType(thread, 'threads.item', true) &&
      isValidId(thread.id)
  ) {
    var content = validContent(thread.content)
    if (content != null) {
      var t = {}
      t.id = thread.id
      t.title = validLenghtStr(thread.title, 'title')
      t.description = ''
      if (thread.description) {
        t.description = validLenghtStr(
          thread.description,
          'description', false
        )
      }

      t.content = content
      t.linked = validLinks(thread.linked)
      return t
    }
  }
  return null
}

function validThreads (threads) {
  var vthreads = []

  if (hasValidType(threads, 'threads', true)) {
    var len = threads.length
    var limit = itmLimits('threads')[1]
    if (len > limit) {
      (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Too many threads', len + ' /' + limit)
      len = limit
    }
    var ids = []
    for (var i = 0; i < len; i++) {
      var thread = validThread(threads[i])

      if (thread !== null) {
        if (!ids.includes(thread.id)) {
          ids.push(thread.id)
          vthreads.push(thread)
          continue
        }
        (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Duplicate thread id', thread.id)
      }
    }

    if (vthreads.length) {
      return vthreads
    }
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('No valid thread')
  return []
}

function validAuthor (author) {
  if (
    hasValidType(author, 'author', true) &&
      isValidUrl(author.url)
  ) {
    var handle = validLenghtStr(author.handle, 'handle')
    if (handle) {
      var a = {}
      a.handle = handle
      a.about = ''
      if (author.about) {
        a.about = validLenghtStr(author.about, 'about', false)
      }
      a.url = author.url
      return a
    }
  }
  return null
}
function isValidAppUrl (url) {
  if (isValidUrl(url) && url === _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.appUrl) {
    return true
  }
  (0,_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_4__.logErr)('Invalid app url')
  return false
}
function validAppUrl (url) {
  if (!isValidAppUrl(url)) {
    url = _NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__.appUrl
  }
  return url
}

function validData (nxdata) {
  if (hasValidType(nxdata, 'nxdata', true)) {
    var d = {}
    d.nexus = validAppUrl(nxdata.nexus)
    d.author = validAuthor(nxdata.author)
    if (d.author) {
      d.threads = validThreads(nxdata.threads)
      if (d.threads.length) {
        return d
      }
    }
  }
  return null
}


/***/ }),

/***/ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "slideUp": () => (/* binding */ slideUp),
/* harmony export */   "slideDown": () => (/* binding */ slideDown),
/* harmony export */   "slideToggle": () => (/* binding */ slideToggle),
/* harmony export */   "timedSlideToggle": () => (/* binding */ timedSlideToggle),
/* harmony export */   "fadeOut": () => (/* binding */ fadeOut),
/* harmony export */   "fadeIn": () => (/* binding */ fadeIn),
/* harmony export */   "fadeToggle": () => (/* binding */ fadeToggle),
/* harmony export */   "timedFadeToggle": () => (/* binding */ timedFadeToggle),
/* harmony export */   "easeOut": () => (/* binding */ easeOut),
/* harmony export */   "easeIn": () => (/* binding */ easeIn),
/* harmony export */   "easeToggle": () => (/* binding */ easeToggle),
/* harmony export */   "timedEaseToggle": () => (/* binding */ timedEaseToggle),
/* harmony export */   "splitFlap": () => (/* binding */ splitFlap),
/* harmony export */   "diversionToggle": () => (/* binding */ diversionToggle),
/* harmony export */   "insertDiversion": () => (/* binding */ insertDiversion),
/* harmony export */   "heightBasedDisplay": () => (/* binding */ heightBasedDisplay),
/* harmony export */   "replaceDiversion": () => (/* binding */ replaceDiversion),
/* harmony export */   "mutationPromise": () => (/* binding */ mutationPromise),
/* harmony export */   "resetDisplay": () => (/* binding */ resetDisplay),
/* harmony export */   "elmIsHidden": () => (/* binding */ elmIsHidden)
/* harmony export */ });
/* Vâlvă | (c) 2021 I-is-as-I-does | MIT License */

function slideUp(elm, duration = 200, callback = null) {
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

function slideDown(elm, duration = 200, callback = null) {
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

function slideToggle(elm, duration = 200, callback = null) {
  if (elmIsHidden(elm)) {
    return slideDown(elm, duration, callback);
  } else {
    return slideUp(elm, duration, callback);
  }
}
function timedSlideToggle(
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

function fadeOut(elm, callback = null) {
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

function fadeIn(elm, callback = null) {
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

function fadeToggle(elm, callback = null) {
  if (elmIsHidden(elm)) {
    fadeIn(elm, callback);
  } else {
    fadeOut(elm, callback);
  }
}
function timedFadeToggle(elm, delay = 200, callback = null) {
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
function easeOut(elm, duration = 200, callback = null) {
  fadeOut(elm);
  slideUp(elm, duration, callback);
}
function easeIn(elm, duration = 200, callback = null) {
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
function easeToggle(elm, duration = 200, callback = null) {
  if (elmIsHidden(elm)) {
    return easeIn(elm, duration, callback);
  } else {
    return easeOut(elm, duration, callback);
  }
}
function timedEaseToggle(
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
function splitFlap(elm, text, speed = 20) {
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
function diversionToggle(
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
function insertDiversion(
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
function heightBasedDisplay(elm, preHeight, newHeight, callback = null){
  if (preHeight === newHeight) {
    fadeIn(elm, callback);
  } else {
    easeIn(elm, 200, callback);
  }
}
function replaceDiversion(oldElm, newElm, callback = null) {
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
function mutationPromise(parent, child, placeAction, callback = null) {
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

function resetDisplay(elm) {
  elm.style.removeProperty("display");
  let display = window.getComputedStyle(elm).display;
  if (display === "none") display = "block";
  elm.style.display = display;
}

function elmIsHidden(elm) {
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
//# sourceMappingURL=NxBrowserLibraries.js.map