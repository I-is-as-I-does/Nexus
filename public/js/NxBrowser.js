"use strict";
(self["webpackChunknexus"] = self["webpackChunknexus"] || []).push([["NxBrowser"],{

/***/ "./src/browser/NxAppDefaults.js":
/*!**************************************!*\
  !*** ./src/browser/NxAppDefaults.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appIO": () => (/* binding */ appIO),
/* harmony export */   "appDefaultCss": () => (/* binding */ appDefaultCss)
/* harmony export */ });
const appIO = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/js/NxIO.js'
const appDefaultCss = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NexusI.min.css'

/***/ }),

/***/ "./src/browser/NxStart.js":
/*!********************************!*\
  !*** ./src/browser/NxStart.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxInit.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxInit.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../viewer/NxViewer.js */ "./src/viewer/NxViewer.js");
/* harmony import */ var _viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../viewer/NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _NxAppDefaults_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NxAppDefaults.js */ "./src/browser/NxAppDefaults.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */





// import { editorElms } from "./editor/NxEditor.js";





function mountApp(nxElm, appElm){
    var host = document.createElement('DIV');
    host.className = "nx";
    host.append(appElm)
    nxElm.append(host)
}

function init(){
    (0,_i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__.initAll)({appDefaultLang: 'en', appDefaultCss: _NxAppDefaults_js__WEBPACK_IMPORTED_MODULE_7__.appDefaultCss}).then(seed => {
        (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_2__.setOriginLang)(seed.request.lang)
        seed.state = (0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.dataToState)(seed.request.url, seed.request.id, seed.nxdata)
        ;(0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.setOriginState)(seed.state)
        var elm;
        seed.editMode = false
        if((0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__.getQuery)("edit") || (0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__.getQuery)("new")){
         // elms = editorElms(state);
         seed.editMode = true
         elm = (0,_viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_5__.viewerElms)(seed);
        } else {
         elm = (0,_viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_5__.viewerElms)(seed);
        }

      mountApp(seed.nxelm, (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_6__.instanceWrap)(elm))

    }).catch((err)=> {
      console.log(err)
        ;(0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_3__.logErr)(err.message);
        mountApp((0,_i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__.retrieveNxElm)(), (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_6__.errorPrgr)())
      })
}

/***/ }),

/***/ "./src/browser/NxState.js":
/*!********************************!*\
  !*** ./src/browser/NxState.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatSrc": () => (/* binding */ concatSrc),
/* harmony export */   "getTimestamp": () => (/* binding */ getTimestamp),
/* harmony export */   "isStateUnseen": () => (/* binding */ isStateUnseen),
/* harmony export */   "dataToState": () => (/* binding */ dataToState),
/* harmony export */   "setDefaultThread": () => (/* binding */ setDefaultThread),
/* harmony export */   "resolveState": () => (/* binding */ resolveState),
/* harmony export */   "registerUpdateEvt": () => (/* binding */ registerUpdateEvt),
/* harmony export */   "triggerUpdate": () => (/* binding */ triggerUpdate),
/* harmony export */   "getCurrentState": () => (/* binding */ getCurrentState),
/* harmony export */   "setOriginState": () => (/* binding */ setOriginState),
/* harmony export */   "getBuffertime": () => (/* binding */ getBuffertime)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */




const bufferTime = 400;
var currentState = {
      dataUrl: null,
      srcData: null,
      threadId: "/",
      threadIndex: -1
    };
    
var updateStore = { onChange: [], onSrcChange: [] };
var updateRunning = false;

function triggerCallbacks(state,triggerAll) {
  var ks = ["onChange"];
  if (triggerAll) {
    ks.push("onSrcChange");
  }

  ks.forEach((k) => {
    if (updateStore[k].length) {
     updateStore[k].forEach((callback) => {
        callback(state);
      });
    }
  });
}

function updateTimeout() {
  setTimeout(
    function () {
      updateRunning = false;
    },
    bufferTime
  );
}

function concatSrc(state){
  var src = state.dataUrl
  if(state.threadId !== '/'){
    src += '#'+state.threadId
  }
 return src
}

function getTimestamp(state){
  if (state.threadIndex !== -1) {
return state.srcData.threads[state.threadIndex].content.timestamp
  }
  return null
}

function isStateUnseen(state){
  if (state.threadId !== '/') {
    return (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.isThreadContentUnseen)(concatSrc(state), getTimestamp(state))
  }
  return false
}

function dataToState(dataUrl, threadId, data){
  data.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_0__.getThreadsList)(data)
    var state = {
      dataUrl: dataUrl,
      threadId: threadId,
      srcData: data,
      threadIndex: data.index.indexOf(threadId)
    };

    if (state.threadIndex === -1) {
      setDefaultThread(state)
    }
    return state;
}

function setDefaultThread(state){
  state.threadIndex = 0
  state.threadId = state.srcData.index[0]
}

function resolveState(dataUrl, threadId) {
  return (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_0__.getSrcData)(dataUrl).then((data) => {
  return dataToState(dataUrl, threadId, data)
  });
}

function registerUpdateEvt(callback, onSrcChange = false) {
  var k = "onChange";
  if (onSrcChange) {
    k = "onSrcChange";
  }
  updateStore[k].push(callback);
}

function triggerUpdate(state, skipHistoryUpdate = false, forceTrigger = false) {
  if (!updateRunning) {
    var srcChanged = state.dataUrl != currentState.dataUrl;
    if(state.threadId === '/'){
      setDefaultThread(state)
    }

    if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {
      updateRunning = true;
      if (!skipHistoryUpdate) {
        (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_1__.registerThreadVisit)(concatSrc(currentState), getTimestamp(currentState));
      }
    
      var resetIndex = srcChanged || forceTrigger;
      currentState = Object.assign({},state);

      triggerCallbacks(state, resetIndex);
      updateTimeout();
    }
  }
}

function getCurrentState() {
  return currentState;
}

function setOriginState(state) {
  if (!currentState.dataUrl) {
    currentState = state;
    return true;
  }
  return false;
}

function getBuffertime(){
  return bufferTime;
}




/***/ }),

/***/ "./src/viewer/NxCommons.js":
/*!*********************************!*\
  !*** ./src/viewer/NxCommons.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getElm": () => (/* binding */ getElm),
/* harmony export */   "instanceWrap": () => (/* binding */ instanceWrap),
/* harmony export */   "serviceWrap": () => (/* binding */ serviceWrap),
/* harmony export */   "blockWrap": () => (/* binding */ blockWrap),
/* harmony export */   "landmarkElm": () => (/* binding */ landmarkElm),
/* harmony export */   "errorPrgr": () => (/* binding */ errorPrgr),
/* harmony export */   "toggleNavEnd": () => (/* binding */ toggleNavEnd),
/* harmony export */   "setHistoryControls": () => (/* binding */ setHistoryControls),
/* harmony export */   "selectDropDown": () => (/* binding */ selectDropDown),
/* harmony export */   "setToggleOnDisplay": () => (/* binding */ setToggleOnDisplay),
/* harmony export */   "baseViewLink": () => (/* binding */ baseViewLink),
/* harmony export */   "threadTitleElm": () => (/* binding */ threadTitleElm),
/* harmony export */   "viewerInstance": () => (/* binding */ viewerInstance),
/* harmony export */   "lines": () => (/* binding */ lines),
/* harmony export */   "spinContainer": () => (/* binding */ spinContainer)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxStyle.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/legacy/Valva-v1.js */ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */









function resolveThreadTitle(state) {
  var threadTitle = "/";
  if (state.threadId && state.threadId != "/") {
    threadTitle = state.srcData.threads[state.threadIndex].title;
  }
  return threadTitle;
}


function toggleOnDisplay(viewlk, givenState, newState) {
  if (newState.dataUrl && givenState.dataUrl == newState.dataUrl && givenState.threadId == newState.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}


function appHeader() {
  var header = getElm('HEADER');
  header.append(appLink());
  return header;
}


function appLink() {
  var link = getElm("A", "nx-app-link nx-external-link");
  link.target = "_blank";
  link.href = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_5__.appUrl;
  link.title = "Nexus";
  link.textContent = "Nexus";
  return link;
}


function appMain(serviceElms){
var main = getElm('MAIN');
main.append(...serviceElms);
return main;
}

function getElm(tag, classList) {
  var elm = document.createElement(tag);
  if (classList) {
    elm.className = classList; 
  }
  return elm;
}

function instanceWrap(serviceElms){
  var inst = getElm("DIV", "nx-instance");
  inst.append(appHeader(), appMain(serviceElms));
  return inst;
}

function serviceWrap
(navElms, mainElms, footerElms = [], service = 'viewer') {
  var wrap = getElm("DIV", "nx-"+service);
  var nav = getElm("NAV");
  nav.append(...navElms);
  var bd = getElm("SECTION");
  bd.append(...mainElms);
  wrap.append(nav, bd);
  if(footerElms.length){
    var footer = getElm("FOOTER");
    footer.append(...footerElms);
    wrap.append(footer);
  }
  return wrap;
}

// @todo update, no use of headers nor landmark ?
function blockWrap(
  blockName,
  headerElms = null,
  contentElms = null,
  landmark = false
) {
  var dv = getElm("DIV", "nx-" + blockName + " nx-block");
  if (landmark) {
    dv.append(landmark);
  }
  if (headerElms) {
    var header = getElm("DIV","nx-thread-header");
    header.append(...headerElms);
    dv.append(header);
  }
  if (contentElms) {
    dv.append(...contentElms);
  }
  return dv;
}

function landmarkElm(name) {
  var lndmrk = getElm("SPAN", "nx-landmark nx-landmark-"+name.replace(" ", "-"));
  lndmrk.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_4__.getTxt)(name);
(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__.registerTranslElm)(lndmrk, name);
  return lndmrk;
}

function errorPrgr() {

    var errMsgs = (0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_0__.getErr)();
    if(!errMsgs.length){
      errMsgs = ["Init failed"];
    }
  var p = getElm("P");
  if ((0,_i_is_as_i_does_nexus_core_src_load_NxStyle_js__WEBPACK_IMPORTED_MODULE_1__.isCssLoaded)()) {
    p.className = "nx-error";
  } else {
    p.style.margin = "0 auto";
    p.style.fontFamily = '"Courier New", Courier, monospace';
    p.style.fontSize = "13px";
  }

    var br = getElm('BR');
    var sp1 = getElm("SPAN");
    sp1.textContent = "—/ — ";
    p.append(sp1, br);
    errMsgs.forEach((msg) => {
      var spx = getElm("SPAN");
      spx.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_4__.getTxt)(msg);
    (0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__.registerTranslElm)(spx, msg);
      p.append(spx, br.cloneNode());
    });
  
  return p;
}


function toggleNavEnd(map) {

  if (map.position > 0) {
    map.ctrls["prev"].elm.classList.remove("nx-nav-end");
  } else {
    map.ctrls["prev"].elm.classList.add("nx-nav-end");
  }
  if (map.position < map.count-1) {
    map.ctrls["next"].elm.classList.remove("nx-nav-end");
  } else {
    map.ctrls["next"].elm.classList.add("nx-nav-end");
  }
}


function setHistoryControls(map, triggerCallback){
  Object.keys(map.ctrls).forEach((ctrl) => {
    map.ctrls[ctrl].elm = getElm("A", "nx-nav-ctrl nx-nav-end");
    map.ctrls[ctrl].elm.textContent = map.ctrls[ctrl].symbol;
    map.ctrls[ctrl].elm.addEventListener("click", function () {
      if (!map.ctrls[ctrl].elm.classList.contains("nx-nav-end")) {
        if (ctrl == "next") {
          map.position++;
        } else {
          map.position--;
        }
        triggerCallback(ctrl);
        toggleNavEnd(map);
      }
    });
  });
}

function selectDropDown(list, toggleElm, actionCallback = null, switchClass = null){
  var selectedClass = "nx-selected";
  toggleElm.classList.add('nx-select-toggle');
  var isInput = toggleElm.tagName == 'INPUT';
  var firstValue;
  if(isInput){
    toggleElm.setAttribute("autocomplete","off");
    firstValue = toggleElm.value;
  } else {
    firstValue = toggleElm.textContent;
  }


  var drp = getElm("UL", "nx-select-list");
  
  var swtch = getElm("DIV", "nx-select");
  if(switchClass){
    swtch.classList.add(switchClass);
  }
  swtch.append(toggleElm, drp);

  toggleElm.addEventListener("click", () => {
    var styl = "none";
    if (drp.style.display == styl) {
      styl = "block";
    }
    drp.style.display = styl;
  });
  
  list.forEach((itm) => {

    var li = getElm("LI");
    li.textContent = itm;
    li.dataset.item = itm;
    if (itm == firstValue) {
      li.classList.add(selectedClass);
    }
    
    drp.append(li);
    li.addEventListener("click", () => {   
      var nitm = li.textContent;
      var currVal;
      if(isInput){
        currVal = toggleElm.value;
       } else {
        currVal = toggleElm.textContent;
       }
       if(currVal != nitm){
        if(!li.classList.contains(selectedClass)){      
          var prev = drp.querySelector("." + selectedClass);
          if(prev){
            prev.classList.remove(selectedClass);
          }         
          li.classList.add(selectedClass);
        }
        if(isInput){
          toggleElm.value = nitm;
         } else {
         toggleElm.textContent = nitm;
         }
         toggleElm.dispatchEvent(new window.Event('change'));
        if (typeof actionCallback === "function") {
          actionCallback(nitm);
        }
       }

      drp.style.display = "none";
    });

  });
  drp.style.display = "none";

  return swtch;
}

function setToggleOnDisplay(viewlk, state) {

  toggleOnDisplay(viewlk, state, (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentState)());
 (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__.registerUpdateEvt)(function (newState) {
    toggleOnDisplay(viewlk, state, newState);
  });
}

function baseViewLink(state, update = false) {
  var viewlk = getElm("A", "nx-view-link");
  viewlk.append(threadTitleElm(state, update));
  return viewlk;
}

function threadTitleElm(state, update = false) {
  var sp = getElm("SPAN", "nx-thread-title");
  sp.textContent = resolveThreadTitle(state);
  if (update) {
    (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__.registerUpdateEvt)(function (newState) {
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_7__.splitFlap)(sp, resolveThreadTitle(newState), 15)
    });
  }

  return sp;
}


function viewerInstance(state){
  var indexPart = getElm("DIV");
  indexPart.append(indexBlock(state));
  var threadPart = getElm("DIV");
  threadPart.append(...threadBlocks(state));
  
  return serviceWrap
([appBlock(), historyBlock(state)], [
   indexPart,
   threadPart
   ], [sourceBlock(state)]);
}

function lines(text) {
  var dv = getElm("DIV", "nx-lines");
  if(text){   
    var sp = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_6__.splitOnLineBreaks)(text)
    var ln = []
    sp.forEach(l => {
      var p = getElm('P')
      p.textContent = l
      ln.push(p)
    })
    dv.append(...ln);
}
  return dv;
}
function spinContainer() {
  var container = getElm("DIV", "nx-loading");
  return container
}

/***/ }),

/***/ "./src/viewer/NxHistory.js":
/*!*********************************!*\
  !*** ./src/viewer/NxHistory.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "historyBlock": () => (/* binding */ historyBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/legacy/Valva-v1.js */ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxIdent.js */ "./src/viewer/NxIdent.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Style.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Style.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */






const historyMax = 100;
var isHistoryEvent = false;
var historyList = null;
var historyElm = null;

var historyState = {
  dataUrl: null,
  srcData: null,
  threadId: "/",
  threadIndex: -1
};

var histCtrls = {
  "ctrls":{
    "prev": {"symbol":"<", "elm":null},
    "next": {"symbol":">", "elm":null}
  },
   position:0,
   count:1
 }


function historyNav() {
  var wrp = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-history-nav");
  (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setHistoryControls)(histCtrls, function(ctrl){
    var postn = histCtrls.position;
    if(ctrl == 'prev'){
      postn += 1;
    }
    var target =
    historyList.children[postn].querySelector(
      ".nx-thread-title"
    );
  target.click();
  });
  wrp.append(histCtrls.ctrls["prev"].elm,historyToggleElm(),histCtrls.ctrls["next"].elm);
  return wrp;
}
function historyToggleElm() {
  var tggl = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("A", "nx-history-toggle");
  tggl.textContent = "≚";
  tggl.addEventListener("click", () => {
    if (tggl.textContent == "≙") {
      tggl.textContent = "≚";
      tggl.classList.remove("nx-active");
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.easeOut)(historyElm, 200);
    } else {
      tggl.textContent = "≙";
      tggl.classList.add("nx-active");
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.easeIn)(historyElm, 200);
      (0,_i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__.autoScrollToBottom)(historyList);
    }
  });
  return tggl;
}

function setHistoryListElm(state) {

  historyList = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-history-list");
  var first = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("LI");
  first.textContent = "...";
  historyList.append(first);
  if(state && state.srcData){
  historyState = state;
  historyList.append(historyItm(state));
}
  historyElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-history-drawer");
  historyElm.append(historyList);
  historyElm.style.display = "none";
 (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (newState) {
    historyEvent(newState);
  });

}


function historyEvent(state) {

  if (!isHistoryEvent && (state.dataUrl != historyState.dataUrl || state.threadId != historyState.threadId)) {
    historyState = state;
    if (histCtrls.count > historyMax) {
      historyList.children[1].remove();      
    } else {
      histCtrls.count++;
    }

    histCtrls.position = histCtrls.count-1;
    var itm = historyItm(state);
    (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.insertDiversion)(historyList, itm, false, true, 200, function () {
      (0,_i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__.autoScrollToBottom)(historyList);
    });

    (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.toggleNavEnd)(histCtrls);
  }
}

function viewElms(state){
return [(0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorIndexLink)(state, false),
  (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorUrl)(state, false),
  historyViewLink(state, false)];
}

function historyItm(state) {

  var itm = document.createElement("LI");
    itm.append(...viewElms(state));
  return itm;
}

function historyViewLink(state) {
  var viewlk = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.baseViewLink)(state, false);
  (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setToggleOnDisplay)(viewlk, state);

  viewlk.addEventListener("click", () => {
    isHistoryEvent = true;
    (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.triggerUpdate)(state, true);
    isHistoryEvent = false;
  });
  return viewlk;
}


function historyBlock(state) {
  setHistoryListElm(state);
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("history", null, [historyNav(), historyElm], false);
}


/***/ }),

/***/ "./src/viewer/NxIdent.js":
/*!*******************************!*\
  !*** ./src/viewer/NxIdent.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authorHandle": () => (/* binding */ authorHandle),
/* harmony export */   "authorUrl": () => (/* binding */ authorUrl),
/* harmony export */   "setToggleUnseen": () => (/* binding */ setToggleUnseen),
/* harmony export */   "viewLink": () => (/* binding */ viewLink),
/* harmony export */   "authorIndexLink": () => (/* binding */ authorIndexLink)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/transitions */ "./node_modules/@i-is-as-i-does/valva/src/modules/transitions.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxStorage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxStorage.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxStorage.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Web_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Web.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Web.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */






var urlStore = {}

function authorMiniUrl(authorUrl) {
  var url = (0,_i_is_as_i_does_nexus_core_src_storg_NxStorage_js__WEBPACK_IMPORTED_MODULE_3__.getStoredItem)(authorUrl,"local",urlStore, false);
  if(!url){
    url = (0,_i_is_as_i_does_jack_js_src_modules_Web_js__WEBPACK_IMPORTED_MODULE_4__.miniUrl)(authorUrl);
    (0,_i_is_as_i_does_nexus_core_src_storg_NxStorage_js__WEBPACK_IMPORTED_MODULE_3__.storeItem)(authorUrl, url, "local", urlStore,false);
  }
  return url;
}


function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains("nx-on-display")) {
    viewlk.classList.remove("nx-unseen");
    viewlk.lastChild.textContent = "";
  } else if ((0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.isStateUnseen)(state)) {
    viewlk.classList.add("nx-unseen");
    viewlk.lastChild.textContent = "*";
  }
}

function authorHandle(state, update = false) {
  var hnd = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", "nx-handle");
  if(state.srcData){
  hnd.textContent = state.srcData.author.handle;
}
  if (update) {
   (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
      (0,_i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_0__.vSplitFlap)(hnd, newState.srcData.author.handle, 25);
    }, true);
  }
  return hnd;
}

function authorUrl(state, update = false) {

  var authorlksp = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN","nx-author-url");
 
  var urlBrck = [];
  ["[", "]"].forEach((bracket) => {
    var brsp = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", "nx-author-url-brackets");
    brsp.textContent = bracket;
    urlBrck.push(brsp);
  });
  var urla = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("A", "nx-external-link");
  urla.target = "_blank";
  var hrf = '';
  if(state.srcData){
 hrf = state.srcData.author.url;
  }
  urla.href =hrf;
  
  if(state.srcData){
    urla.textContent = authorMiniUrl(state.srcData.author.url);
  }
  
  authorlksp.append(urlBrck[0], urla, urlBrck[1]);

  if (update) {
   (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
      urla.href = newState.srcData.author.url;
      (0,_i_is_as_i_does_valva_src_modules_transitions__WEBPACK_IMPORTED_MODULE_0__.vSplitFlap)(urla, authorMiniUrl(newState.srcData.author.url), 25);
    }, true);
  }
  return authorlksp;
}


function setToggleUnseen(viewlk, state) {
  viewlk.append((0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", "nx-new-tag"));
  toggleUnseen(viewlk, state);
 (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function () {
    toggleUnseen(viewlk, state);
  });
}

function viewLink(state, update = false) {
  var viewlk = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.baseViewLink)(state, update);
  if (state.threadId != "/") {
    (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.setToggleOnDisplay)(viewlk, state);
    setToggleUnseen(viewlk, state);
  }

  viewlk.addEventListener("click", () => {
 
    (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.triggerUpdate)(state);
  });
  return viewlk;
}

function authorIndexLink(state, update = false) {
  var auth = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("A", "nx-author-link");
  auth.append(authorHandle(state, update));

  var newState = {
    dataUrl: state.dataUrl,
    srcData: state.srcData,
    threadId: "/",
    threadIndex: -1
  };
  auth.addEventListener("click", function () {
(0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.triggerUpdate)(newState, "/");
  });

  return auth;
}


/***/ }),

/***/ "./src/viewer/NxIndex.js":
/*!*******************************!*\
  !*** ./src/viewer/NxIndex.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mainIndexBlock": () => (/* binding */ mainIndexBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/legacy/Valva-v1.js */ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxIdent.js */ "./src/viewer/NxIdent.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */





var indexList = null;

function aboutElm(state) {
  var ab = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("DIV", "nx-about-author");

  ab.append(aboutLines(state));
 (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
    (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiversion)(ab.firstChild, aboutLines(newState));
  }, true);
  return ab;
}

function aboutLines(state) {
  var text = null
if(state.srcData && state.srcData.author.about){
text = state.srcData.author.about
}
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.lines)(text);
}

function setIndexList(state) {
  indexList = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("UL");
  if(state.srcData){
  var items = state.srcData.index;

  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      indexList.append(indexLi(state, items[i], i));
    }
  }
}
 (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {

    changeThreadsList(newState);
  }, true);

}

function indexLi(state, id, index) {
  var altState = Object.assign({}, state);

  altState.threadId = id;
  altState.threadIndex = index;

  var li = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("LI");
  li.append((0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.viewLink)(altState, false));
  return li;
}

function changeThreadsList(state) {

  var childr = indexList.childNodes;
  var items = state.srcData.index;
  var nwlen = items.length;

  var chlen = childr.length;

  var count = 0;
  if (chlen) {
    var rmv = function (child) {
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.easeOut)(child, 200, function () {
        child.remove();
      });
    };
    for (var x = 0; x < chlen; x++) {
      if (nwlen > x) {
        var nlink = indexLi(state, items[x], x);
        (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiversion)(childr[x], nlink);
        count++;
      } else {
        rmv(childr[x]);
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_0__.insertDiversion)(indexList, indexLi(state, items[y], y), false, true, 200);
    }
  }
}

function indexHeader(state){
  var header = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('DIV','nx-index-header')
  header.append((0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorHandle)(state, true), (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorUrl)(state, true), aboutElm(state))
  return header
}

function indexBlock(state){
  setIndexList(state);
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.blockWrap)("threads-list", null, [indexList]);
}

function mainIndexBlock(state) {

  var mainBlock = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)('DIV', 'nx-main-block nx-index')
  var blocks = [indexHeader(state), indexBlock(state)];
  mainBlock.append(...blocks)
  return mainBlock
}


/***/ }),

/***/ "./src/viewer/NxMedia.js":
/*!*******************************!*\
  !*** ./src/viewer/NxMedia.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mediaElm": () => (/* binding */ mediaElm)
/* harmony export */ });
/* harmony import */ var _NxThread_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxThread.js */ "./src/viewer/NxThread.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxMedia_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxMedia.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxMedia.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */





function threadMediaElm(threadData, countReady) {
  var  mediaContainer = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", 'nx-media');

  var mediaWrap = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV");
  mediaContainer.append(mediaWrap)

  var captionElm = null
  if(threadData.content.media.caption){
    captionElm = (0,_NxThread_js__WEBPACK_IMPORTED_MODULE_0__.threadTextElm)(threadData, ["content", "media", "caption"])
    mediaContainer.append(captionElm)
  }

  mediaWrap.addEventListener('mediaReady', function(){
      if(mediaWrap.firstChild.tagName === 'A' && threadData.content.media.type !== 'page'){
        threadData.content.media.type = 'page';
      }
      mediaWrap.className = "nx-" + threadData.content.media.type + "-media";
      if(countReady !== null){
        countReady()
      }
    })
   ;(0,_i_is_as_i_does_nexus_core_src_data_NxMedia_js__WEBPACK_IMPORTED_MODULE_2__.resolveMedia)(threadData.content.media.url, threadData.content.media.type, mediaWrap)
  return mediaContainer
}

function mediaElm(threadData, countReady = null) {
  var mediadiv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-content-media");
    mediadiv.append(threadMediaElm(threadData, countReady));
  return mediadiv;
}


/***/ }),

/***/ "./src/viewer/NxSource.js":
/*!********************************!*\
  !*** ./src/viewer/NxSource.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sourceBlock": () => (/* binding */ sourceBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Stock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Stock.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Stock.js");
/* harmony import */ var _i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/legacy/Valva-v1.js */ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxSnippet_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxSnippet.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSnippet.js");
/* harmony import */ var _browser_NxAppDefaults_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../browser/NxAppDefaults.js */ "./src/browser/NxAppDefaults.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */









var drawerElm = null;
var editMode = false;
var currentStyle = null

function actionLink(action, text) {
  var lk = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("A", "nx-source-" + action);
  lk.textContent = text;
  return lk;
}

function resolveSrc(state){
  var src
  if(editMode){
    src = "#temp";
  } else  {
    src = (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.concatSrc)(state)
  }
  return src;
}

function linkContent(state) {
  if(state.dataUrl){
  return resolveSrc(state)
}
return "";
}

function toolTip(className, text) {
  var tooltip = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", className);
  tooltip.textContent = text;
  tooltip.style.opacity = 0;
  tooltip.hidden = true;
  (0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__.registerTranslElm)(tooltip, text);
  return tooltip;
}

function toggleLink() {
  var text = "</>";
  var altText = "< />";
  var lk = actionLink("snippets", text);

  lk.addEventListener("click", () => {
    if (lk.textContent == altText) {
      lk.textContent = text;
      lk.classList.remove("nx-active");
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.easeOut)(drawerElm, 200);
    } else {
      lk.textContent = altText;
      lk.classList.add("nx-active");
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.easeIn)(drawerElm, 100, function () {
        drawerElm.scrollIntoView({
          block: "end",
          behavior: "smooth",
          inline: "nearest",
        });
      });
    }
  });
  return lk;
}

function linkSource(state){
  return codeElm("json", textAreaElm(state, linkContent));
}

function snippetsBundle(state) {
  drawerElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV", "nx-source-drawer");
  drawerElm.append(linkSource(state), embedSnippet(state));
  drawerElm.style.display = "none";

  var tgg = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV", "nx-source-toggle");
  var snippetLink = toggleLink();
  tgg.append(snippetLink);

  return [tgg, drawerElm];
}

function textAreaElm(state, callback) {
  var snpInp = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("TEXTAREA");
  snpInp.spellcheck = false;
  snpInp.textContent = callback(state);

 (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (newState) {
    snpInp.textContent = callback(newState);
  });
  return snpInp;
}

function copyLink(snpElm) {
  var copyLk = actionLink("copy", "⧉");
  var copyTooltip = toolTip("nx-source-copy-tooltip",'c/c');
  copyLk.append(copyTooltip);

  copyLk.addEventListener("click", () =>
    (0,_i_is_as_i_does_jack_js_src_modules_Stock_js__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)(snpElm.textContent, () => {
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.timedFadeToggle)(copyTooltip, 1000);
    })
  );
  return copyLk;
}

function codeElm(name, elm) {
  var snp = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV", "nx-" + name + "-snippet");
  snp.append(elm, copyLink(elm));
  return snp;
}

function embedSnippet(state) {
  return codeElm("embed", textAreaElm(state, embedContent));
}

function embedContent(state) {

  if(state.dataUrl){
    return (0,_i_is_as_i_does_nexus_core_src_data_NxSnippet_js__WEBPACK_IMPORTED_MODULE_6__.getSnippet)(resolveSrc(state), currentStyle, _browser_NxAppDefaults_js__WEBPACK_IMPORTED_MODULE_7__.appIO, (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__.getLang)())
  }
  return "";
}

function sourceBlock(state, currentStyleUrl, editionSource = false) {
  if(editionSource){
    editMode = true;
  }
  if(currentStyleUrl !== _browser_NxAppDefaults_js__WEBPACK_IMPORTED_MODULE_7__.appDefaultCss){
    currentStyle = currentStyleUrl
  }
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.blockWrap)("source", null, snippetsBundle(state), false);
}


/***/ }),

/***/ "./src/viewer/NxThread.js":
/*!********************************!*\
  !*** ./src/viewer/NxThread.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "threadTextElm": () => (/* binding */ threadTextElm),
/* harmony export */   "mainThreadBlock": () => (/* binding */ mainThreadBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Check.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js");
/* harmony import */ var _i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/legacy/Valva-v1.js */ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxIdent.js */ "./src/viewer/NxIdent.js");
/* harmony import */ var _NxMedia_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxMedia.js */ "./src/viewer/NxMedia.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxSpin_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxSpin.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxSpin.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */










var threadBlocks

var currentElm;
var descrpElm;
var contentElm;
var distantNav;

var slider;
var linked = [];

var spinElm;
var spinner;
var ready = 0

var linkedCtrls = {
  "ctrls":{
    "prev": {"symbol":"⊼", "elm":null},
    "next": {"symbol":"⊻", "elm":null}
  },
   position:0,
   count:0
 }

 var distantLandmark;

 function setDistantLandmark(){
  distantLandmark = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.landmarkElm)("distant");
  distantLandmark.style.display ="none";
 }

 function setSpinner(){
 spinElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.spinContainer)()
 spinner = new _i_is_as_i_does_nexus_core_src_data_NxSpin_js__WEBPACK_IMPORTED_MODULE_8__.Spinner(spinElm)
 }

function countReady(){
  ready++
if(ready === 2){
  spinner.endSpin()
  spinElm.style.display = 'none'
    if(linked.length){
      linkedCtrls.count = linked.length;
      (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls); 
      setFirstDistantContent(linked.length > 1);
    }
    (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.easeIn)(threadBlocks, 150)
}
}

function updateThreadBlocks(state) {
  ready = 0
  spinner.startSpin()

  ;(0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.easeOut)(threadBlocks, 150, function(){
    spinElm.style.display = 'block'

    var newThreadData = resolveThreadData(state);
    resetDistantLinks(newThreadData);
  
    var newContent = threadContent(newThreadData, false);
    var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
    descrpElm.firstChild.replaceWith(newDescrpTxt)
    contentElm.firstChild.replaceWith(newContent)
  })
}

function descriptionElm(threadData) {
  descrpElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-thread-description");
  descrpElm.append(threadTextElm(threadData, ["description"]));
  return descrpElm
}

function resolveThreadData(state) {
  var threadData = null;
  if (state.threadId && state.threadId != "/") {
    threadData = state.srcData.threads[state.threadIndex];
  }
  return threadData;
}
function distantThreadBlock(threadData) {
  setDistantLandmark();
  setDistantSlider();
  resolveLinkedThreads(threadData)
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.blockWrap)("distant", null, [slider], distantLandmark);
}

function localThreadBlock(threadData) {
  setContentElm(threadData);
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.blockWrap)("local", null, [contentElm], (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.landmarkElm)("local"));
}

function setContentElm(threadData) {
  contentElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-local-content");
  contentElm.append(threadContent(threadData, false));
}

function showDistantNav(){
  distantNav.style.visibility = 'visible'
}


function hideDistantNav(){
  distantNav.style.visibility = 'hidden'
}

function resetDistantLinks(threadData){

  hideDistantNav()
  toggleDistantLandmark(false)
  removeDistantContent(false);

   linked = [];
   linkedCtrls.position = 0;
   linkedCtrls.count = 0;
  (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls);

  resolveLinkedThreads(threadData)
}

function resolveLinkedThreads(threadData){
  if (threadData && threadData.linked.length) {  
    setLinkedItems(threadData);
    } else {
      countReady()
    }
}

function removeDistantContent(transition = false){
  var prevElm = currentElm.firstChild;
  if(prevElm){
    if(transition){
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.easeOut)(prevElm,150,function(){
        prevElm.remove();
      });
    } else {
      prevElm.remove();
    }

  }
}

function setFirstDistantContent(showNav = false){
  /*  var callb = function(){
      toggleDistantLandmark(true)
      if(showNav){
        showDistantNav()
      }      
    }
  insertDiversion(currentElm, linked[0], false, true, 200, callb);*/
  toggleDistantLandmark(true)
      if(showNav){
        showDistantNav()
      }      
  currentElm.append(linked[0])
}

function setCurrentLink(){
  if(linked.length){
   var nw = linked[linkedCtrls.position];

  if(currentElm.firstChild){
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.replaceDiversion)(currentElm.firstChild, nw)
  } else {
    (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_1__.insertDiversion)(currentElm, nw, false, true, 150, callb);
  }
} else {
  removeDistantContent(true);
}
}

function distantNavElm(){
  distantNav = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('NAV', 'nx-distant-nav')
  distantNav.append(linkedCtrls.ctrls["prev"].elm, currentElm, linkedCtrls.ctrls["next"].elm)
  hideDistantNav()
  return distantNav
}

function setDistantSlider(){
slider = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV");
 currentElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV","nx-distant-link");
 (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.setHistoryControls)(linkedCtrls, setCurrentLink);
 (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls);
 slider.append(distantNavElm(), currentElm);

}
function linkedElm(distantState){
  
  var linkedAuthor = [
    (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_3__.authorIndexLink)(distantState, false),
    (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_3__.authorUrl)(distantState, false),
    (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_3__.viewLink)(distantState, false),
  ];
  var elm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV");
  elm.append(...linkedAuthor);
  return elm;
}

function toggleDistantLandmark(hasLinks){
  var hidden = distantLandmark.style.display === "none";
  if(hasLinks && hidden){
    distantLandmark.style.display = 'block'
  }else if(!hasLinks && !hidden){
    distantLandmark.style.display = 'none'
  }
}
function setLinkedItems(threadData) {

    var indexes = [];
    var done = [];
    var promises = [];
    threadData.linked.forEach((url) => {
      if(url){
        var extract = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_7__.splitUrlAndId)(url);
         var prc = (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__.resolveState)(extract.url, extract.id).then((distantState) => {
            var key = distantState.dataUrl+"#"+distantState.threadId;
    
            if(!done.includes(key)){
              done.push(key);
              var elm = linkedElm(distantState);
            if (distantState.threadId == "/") {                 
              indexes.push(elm);
            } else {
              elm.append(threadContent(resolveThreadData(distantState), true));
              linked.push(elm);
            }
          }
          }).catch(err => {
            (0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_6__.logErr)(err.message);
          });
          promises.push(prc);
    }
    });
   Promise.all(promises).then(()=>{
      if(indexes.length){
        linked = linked.concat(indexes);
      }  
      countReady()   
    });
}

function threadContent(threadData, isDistant = false) {
  var dv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-content");
  if (threadData) {
  var elms = [dateElm(threadData), contentBody(threadData)]
  if (threadData.content.media && threadData.content.media.url) {
    var callb = null
    if(!isDistant){
      callb = countReady
    }
    elms.push((0,_NxMedia_js__WEBPACK_IMPORTED_MODULE_4__.mediaElm)(threadData, callb))
  } else if(!isDistant) {
    countReady()
  }
  dv.append(...elms);
}
  return dv;
}

function contentBody(threadData) {
  var bodydiv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-content-body");
  bodydiv.append(
    threadTextElm(threadData, ["content", "main"]),
    threadTextElm(threadData, ["content", "aside"])
  );
  return bodydiv;
}

function dateElm(threadData) {
  var datediv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-content-meta");
  var rdate = threadTextElm(threadData, ["content", "timestamp"]);
  datediv.append(rdate);
  return datediv;
}

function threadFieldText(threadData, ref = []) {
  if (threadData) {
    var data = Object.assign({}, threadData);
    for (var r = 0; r < ref.length; r++) {
      data = data[ref[r]];
    }
    if ((0,_i_is_as_i_does_jack_js_src_modules_Check_js__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyStr)(data)) {
     
      if(ref.includes("timestamp") && data.includes('T')){
data = data.replace('T'," ");
      }else if(["description", "main", "aside", "caption"].includes(ref[ref.length-1])){
        data = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.lines)(data)
      }
      return data;
    }
  }
  return "";
}

function threadHeader(state, threadData){
  var header = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-thread-header')
  header.append((0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.threadTitleElm)(state, true), descriptionElm(threadData))
  return header
}

function localAndDistantBlocks(threadData){

  threadBlocks = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-thread-blocks')
  threadBlocks.style.display = 'none'
  threadBlocks.append(localThreadBlock(threadData),  distantThreadBlock(threadData))

  return threadBlocks
}

function threadTextElm(threadData, ref) {
  var dv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-" + ref.join("-"));
  dv.append(threadFieldText(threadData, ref));
  return dv;
}

function mainThreadBlock(state) {
  var threadData = resolveThreadData(state);
  var mainBlock = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)('DIV', 'nx-main-block nx-thread')
 
  setSpinner()
  spinner.startSpin()
  
  var blocks = [
    threadHeader(state, threadData),
    spinElm, 
    localAndDistantBlocks(threadData)
  ];

  mainBlock.append(...blocks)

;(0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_2__.registerUpdateEvt)(function (newState) {
    updateThreadBlocks(newState);
  });

  return mainBlock;
}


/***/ }),

/***/ "./src/viewer/NxViewer.js":
/*!********************************!*\
  !*** ./src/viewer/NxViewer.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "viewerElms": () => (/* binding */ viewerElms)
/* harmony export */ });
/* harmony import */ var _NxHistory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NxHistory.js */ "./src/viewer/NxHistory.js");
/* harmony import */ var _NxIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxIndex.js */ "./src/viewer/NxIndex.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _NxSource_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxSource.js */ "./src/viewer/NxSource.js");
/* harmony import */ var _NxThread_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxThread.js */ "./src/viewer/NxThread.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */








function viewerElms(seed){

    return [(0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.serviceWrap)
   ([(0,_NxHistory_js__WEBPACK_IMPORTED_MODULE_0__.historyBlock)(seed.state)], [
    (0,_NxIndex_js__WEBPACK_IMPORTED_MODULE_1__.mainIndexBlock)(seed.state),
    (0,_NxThread_js__WEBPACK_IMPORTED_MODULE_4__.mainThreadBlock)(seed.state)
     ], [(0,_NxSource_js__WEBPACK_IMPORTED_MODULE_3__.sourceBlock)(seed.state, seed.styleUrl, seed.editMode)])];
}

/***/ })

}]);
//# sourceMappingURL=NxBrowser.js.map