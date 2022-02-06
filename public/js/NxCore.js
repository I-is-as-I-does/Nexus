/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
"use strict";
(self["webpackChunknexus"] = self["webpackChunknexus"] || []).push([["NxCore"],{

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


/***/ })

}]);
//# sourceMappingURL=NxCore.js.map