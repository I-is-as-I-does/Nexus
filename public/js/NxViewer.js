/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
"use strict";
(self["webpackChunknexus"] = self["webpackChunknexus"] || []).push([["NxViewer"],{

/***/ "./src/NxStart.js":
/*!************************!*\
  !*** ./src/NxStart.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxInit.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxInit.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxState.js */ "./src/NxState.js");
/* harmony import */ var _viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./viewer/NxViewer.js */ "./src/viewer/NxViewer.js");
/* harmony import */ var _viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewer/NxCommons.js */ "./src/viewer/NxCommons.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */





// import { editorElms } from "./editor/NxEditor.js";



const appDefaultCss = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NexusI.min.css'

function mountApp(nxElm, appElm){
    var host = document.createElement('DIV');
    host.className = "nx";
    host.append(appElm)
    nxElm.append(host)
}

function init(){
    (0,_i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__.initAll)({appDefaultLang: 'en', appDefaultCss: appDefaultCss}).then(seed => {
        (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_2__.setOriginLang)(seed.request.lang)
        var state = (0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.dataToState)(seed.request.url, seed.request.id, seed.nxdata)
        ;(0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.setOriginState)(state)
        var elm;
        if((0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_1__.getQuery)("edit")){
         // elms = editorElms(state);
         elm = (0,_viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_5__.viewerElms)(state);
        } else {
         // elms = viewerElms(state);
         elm = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_6__.errorPrgr)()
        }

      // mountApp(seed.nxelm, instanceWrap(elm))
      mountApp(seed.nxelm, elm)
    }).catch((err)=> {
        (0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_3__.logErr)(err.message);
        mountApp((0,_i_is_as_i_does_nexus_core_src_load_NxInit_js__WEBPACK_IMPORTED_MODULE_0__.retrieveNxElm)(), (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_6__.errorPrgr)())
      })
}

/***/ }),

/***/ "./src/NxState.js":
/*!************************!*\
  !*** ./src/NxState.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "concatSrc": () => (/* binding */ concatSrc),
/* harmony export */   "getTimestamp": () => (/* binding */ getTimestamp),
/* harmony export */   "isStateUnseen": () => (/* binding */ isStateUnseen),
/* harmony export */   "dataToState": () => (/* binding */ dataToState),
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

    if (state.threadIndex === -1 && threadId !== "/") {
      state.threadId = "/";
    }
    return state;
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

    if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {
      updateRunning = true;
      if (!skipHistoryUpdate && currentState.threadId !== '/') {
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
/* harmony export */   "convertLineBreaks": () => (/* binding */ convertLineBreaks),
/* harmony export */   "setToggleOnDisplay": () => (/* binding */ setToggleOnDisplay),
/* harmony export */   "baseViewLink": () => (/* binding */ baseViewLink),
/* harmony export */   "threadTitleElm": () => (/* binding */ threadTitleElm),
/* harmony export */   "viewerInstance": () => (/* binding */ viewerInstance)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxStyle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxStyle.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxStyle.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../NxState.js */ "./src/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
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
  link.href = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_6__.appUrl;
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
  lndmrk.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__.getTxt)(name);
(0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_4__.registerTranslElm)(lndmrk, name);
  return lndmrk;
}

function errorPrgr() {

    var errMsgs = (0,_i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_1__.getErr)();
    if(!errMsgs.length){
      errMsgs = ["Init failed"];
    }
  var p = getElm("P");
  if ((0,_i_is_as_i_does_nexus_core_src_load_NxStyle_js__WEBPACK_IMPORTED_MODULE_2__.isCssLoaded)()) {
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
      spx.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__.getTxt)(msg);
    (0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_4__.registerTranslElm)(spx, msg);
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

function convertLineBreaks(text){
  return text.replace(/(\r\n|\n|\r)/gm, "<br>");
}

function setToggleOnDisplay(viewlk, state) {

  toggleOnDisplay(viewlk, state, (0,_NxState_js__WEBPACK_IMPORTED_MODULE_3__.getCurrentState)());
 (0,_NxState_js__WEBPACK_IMPORTED_MODULE_3__.registerUpdateEvt)(function (newState) {
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
    (0,_NxState_js__WEBPACK_IMPORTED_MODULE_3__.registerUpdateEvt)(function (newState) {
      var newThreadTitle = resolveThreadTitle(newState);
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.splitFlap)(sp, newThreadTitle, 15);
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
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxIdent.js */ "./src/viewer/NxIdent.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Style_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Style.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Style.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../NxState.js */ "./src/NxState.js");
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
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.easeOut)(historyElm, 200);
    } else {
      tggl.textContent = "≙";
      tggl.classList.add("nx-active");
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.easeIn)(historyElm, 200);
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
 (0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (newState) {
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
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.insertDiversion)(historyList, itm, false, true, 200, function () {
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
    (0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.triggerUpdate)(state, true);
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
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NxState.js */ "./src/NxState.js");
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
  } else if ((0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.isStateUnseen)(state)) {
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
   (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.splitFlap)(hnd, newState.srcData.author.handle, 20);
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
   (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
      urla.href = newState.srcData.author.url;
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.splitFlap)(urla, authorMiniUrl(newState.srcData.author.url), 20);
    }, true);
  }
  return authorlksp;
}


function setToggleUnseen(viewlk, state) {
  viewlk.append((0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", "nx-new-tag"));
  toggleUnseen(viewlk, state);
 (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function () {
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
 
    (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.triggerUpdate)(state);
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
(0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.triggerUpdate)(newState, "/");
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
/* harmony export */   "indexBlock": () => (/* binding */ indexBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../NxState.js */ "./src/NxState.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxIdent.js */ "./src/viewer/NxIdent.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */





var indexList = null;

function aboutElm(state) {
  var ab = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("DIV", "nx-about-author");

  ab.append(aboutParagraph(state));
 (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiversion)(ab.firstChild, aboutParagraph(newState));
  }, true);
  return ab;
}

function aboutParagraph(state) {
  var p = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.getElm)("P");
  if(state.srcData){
  p.textContent = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.convertLineBreaks)(state.srcData.author.about);
}
  return p;
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
 (0,_NxState_js__WEBPACK_IMPORTED_MODULE_1__.registerUpdateEvt)(function (newState) {

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
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.easeOut)(child, 200, function () {
        child.remove();
      });
    };
    for (var x = 0; x < chlen; x++) {
      if (nwlen > x) {
        var nlink = indexLi(state, items[x], x);
        (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiversion)(childr[x], nlink);
        count++;
      } else {
        rmv(childr[x]);
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.insertDiversion)(indexList, indexLi(state, items[y], y), false, true, 200);
    }
  }
}

function indexBlock(state) {
  setIndexList(state);
  var headerElms = [(0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorHandle)(state, true), (0,_NxIdent_js__WEBPACK_IMPORTED_MODULE_2__.authorUrl)(state, true)];
  var contentElms = [aboutElm(state), indexList];
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.blockWrap)("index", headerElms, contentElms, (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_3__.landmarkElm)("index"));
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
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxThread_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NxThread.js */ "./src/viewer/NxThread.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_data_NxMedia_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/data/NxMedia.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/data/NxMedia.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */





function threadMediaCaption(threadData) {
  return (0,_NxThread_js__WEBPACK_IMPORTED_MODULE_1__.threadTextElm)(threadData, ["content", "media", "caption"]);
}

function setThreadMedia(mediaWrap, threadData) {
  mediaWrap.style.display = 'none'
  if (threadData && threadData.content.media.type) {   
    mediaWrap.addEventListener('mediaReady', function(){
      if(mediaWrap.firstChild.tagName === 'A' && threadData.content.media.type !== 'page'){
        threadData.content.media.type = 'page';
      }
      mediaWrap.className = "nx-" + threadData.content.media.type + "-media";
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_0__.easeIn)(mediaWrap, 200)
    })
   ;(0,_i_is_as_i_does_nexus_core_src_data_NxMedia_js__WEBPACK_IMPORTED_MODULE_3__.resolveMedia)(threadData.content.media.url, threadData.content.media.type, mediaWrap)
  }
}

function mediaElm(mediaWrap, threadData) {
  var mediadiv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV", "nx-content-media");
  mediaWrap = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV");
  setThreadMedia(threadData);
  mediadiv.append(mediaWrap, threadMediaCaption(threadData));

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
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../NxState.js */ "./src/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */







var drawerElm = null;
var editMode = false;

function actionLink(action, text) {
  var lk = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("A", "nx-source-" + action);
  lk.textContent = text;
  return lk;
}


function toolTip(className, text) {
  var tooltip = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", className);
  tooltip.textContent = text;
  tooltip.style.opacity = 0;
  tooltip.hidden = true;
  (0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_3__.registerTranslElm)(tooltip, text);
  return tooltip;
}

function resolveSrc(state){
  var src = state.dataUrl;
  if(editMode){
    src = "edit";
  }
  if(state.threadId !== "/"){
    src += "#"+state.threadId;
  }
  
  return src;
}
function instanceUrl(state){
  var elm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("INPUT", "nx-instance-url");
  elm.type="text";
  elm.value = resolveSrc(state);

(0,_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (newState) {
  elm.value = resolveSrc(newState);
  });
  return elm;
}


function toggleLink() {
  var text = "</>";
  var altText = "< />";
  var lk = actionLink("drawer", text);

  lk.addEventListener("click", () => {
    if (lk.textContent == altText) {
      lk.textContent = text;
      lk.classList.remove("nx-active");
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.easeOut)(drawerElm, 200);
    } else {
      lk.textContent = altText;
      lk.classList.add("nx-active");
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.easeIn)(drawerElm, 100, function () {
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



function linkBundle(state) {
  drawerElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV", "nx-source-drawer");
  var url = instanceUrl(state);
  var copylk = copyLink(url);
    drawerElm.append(url, copylk);

  drawerElm.style.display = "none";

  var tgg = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV", "nx-source-toggle");
  var snippetLink = toggleLink();
  tgg.append(snippetLink);

  return [tgg, drawerElm];
}


function copyLink(elm) {
  var copyLk = actionLink("copy", "⧉");
  var copyTooltip = toolTip("nx-source-copy-tooltip",(0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__.getTxt)("copied"));
  copyLk.append(copyTooltip);

  copyLk.addEventListener("click", () =>
    (0,_i_is_as_i_does_jack_js_src_modules_Stock_js__WEBPACK_IMPORTED_MODULE_0__.copyToClipboard)(elm.textContent, () => {
      (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.timedFadeToggle)(copyTooltip, 1000);
    })
  );
  return copyLk;
}


function sourceBlock(state, editionSource = false) {
  if(editionSource){
    editMode = true;
  }
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.blockWrap)("source", null, linkBundle(state), false);
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
/* harmony export */   "threadBlocks": () => (/* binding */ threadBlocks)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Check_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Check.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Check.js");
/* harmony import */ var _i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/modules/aliases.js */ "./node_modules/@i-is-as-i-does/valva/src/modules/aliases.js");
/* harmony import */ var _NxState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../NxState.js */ "./src/NxState.js");
/* harmony import */ var _NxIdent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NxIdent.js */ "./src/viewer/NxIdent.js");
/* harmony import */ var _NxMedia_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NxMedia.js */ "./src/viewer/NxMedia.js");
/* harmony import */ var _NxCommons_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */









var currentElm;
var descrpElm;
var contentElm;

var slider;

var linked = [];

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


function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state);

  var newContent = threadContent(newThreadData);
  var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
  (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.replaceDiversion)(descrpElm.firstChild, newDescrpTxt);
  (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.replaceDiversion)(contentElm.firstChild, newContent);

  resetDistantLinks(newThreadData);
}

function setDescriptionElm(threadData) {
  descrpElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-thread-description");
  descrpElm.append(threadTextElm(threadData, ["description"]));
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
  setLinkedItems(threadData);
  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.blockWrap)("distant", null, [slider], distantLandmark);
}

function localThreadBlock(state, threadData) {
  var headerElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.threadTitleElm)(state, true);
  setDescriptionElm(threadData);
  setContentElm(threadData);

  return (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.blockWrap)("local", [headerElm], [descrpElm, contentElm], (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.landmarkElm)("local"));
}

function setContentElm(threadData) {
  contentElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-local-content");
  contentElm.append(threadContent(threadData));
}

function hideDistantNav(){
  (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls);
 
  linkedCtrls.ctrls["next"].elm.style.visibility = 'hidden';
  linkedCtrls.ctrls["prev"].elm.style.visibility = 'hidden';
}

function resetDistantLinks(threadData){

  linked = [];
   linkedCtrls.position = 0;
  linkedCtrls.count = 0;

  hideDistantNav();
  removeDistantContent();
  toggleDistantLandmark(false);
  setLinkedItems(threadData);
}

function setPrevCtrlVisb(){
  if(linkedCtrls.position === 0){
    linkedCtrls.ctrls["prev"].elm.style.visibility = 'hidden';
  } else if(linkedCtrls.position === 1) {
    linkedCtrls.ctrls["prev"].elm.style.visibility = 'visible';
  }

}

function nextCtrlCallb(){
  linkedCtrls.ctrls["next"].elm.style.visibility = 'hidden';
    return restr;
  
}

function restr(){
  if((linkedCtrls.position + 1) !== linkedCtrls.count){
  linkedCtrls.ctrls["next"].elm.style.visibility = 'visible';
  }
}

function removeDistantContent(){
  var prevElm = currentElm.firstChild;
  if(prevElm){
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.easeOut)(prevElm,200,function(){
      prevElm.remove();
    });

  }
}

function setFirstDistantContent(){
  toggleDistantLandmark(true);
  (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.insertDiversion)(currentElm, linked[0], false, true, 200, restr);
}

function setCurrentLink(){
  setPrevCtrlVisb();
  var restr = nextCtrlCallb();

  if(linked.length){
   var  nw = linked[linkedCtrls.position];

  if(currentElm.firstChild){
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.replaceDiversion)(currentElm.firstChild, nw, restr);
  } else {
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.insertDiversion)(currentElm, nw, false, true, 200, restr);
  }
} else {
  removeDistantContent();
}
}

function setDistantSlider(){
slider = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV");
 currentElm = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV","nx-distant-link");
 (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.setHistoryControls)(linkedCtrls, setCurrentLink);
 hideDistantNav();
 slider.append(linkedCtrls.ctrls["prev"].elm, currentElm, linkedCtrls.ctrls["next"].elm);

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

  var hidden = distantLandmark.style.display == "none";
  if(hasLinks && hidden){
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.fadeIn)(distantLandmark);
  }else if(!hasLinks && !hidden){
    (0,_i_is_as_i_does_valva_src_modules_aliases_js__WEBPACK_IMPORTED_MODULE_1__.fadeOut)(distantLandmark);
  }
}
function setLinkedItems(threadData) {


  if (threadData != null && threadData.linked.length) {
    var indexes = [];
    var done = [];
    var promises = [];
    threadData.linked.forEach((url) => {
      if(url){
        var extract = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_7__.splitUrlAndId)(url);
         var prc = (0,_NxState_js__WEBPACK_IMPORTED_MODULE_2__.resolveState)(extract.url, extract.id).then((distantState) => {
            var key = distantState.dataUrl+"#"+distantState.threadId;
    
            if(!done.includes(key)){
              done.push(key);
              var elm = linkedElm(distantState);
            if (distantState.threadId == "/") {                 
              indexes.push(elm);
            } else {
              elm.append(threadContent(resolveThreadData(distantState)));
              linked.push(elm);


              if(linkedCtrls.count === 0){
            setFirstDistantContent();
              }
              linkedCtrls.count++;
              (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls); 
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
        if(linkedCtrls.count === 0){
          setFirstDistantContent();
        }
        linkedCtrls.count = linked.length;
        (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.toggleNavEnd)(linkedCtrls); 
      } 
     
    });
  
  }
}


function threadContent(threadData) {
  var dv = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("DIV", "nx-content");
  dv.append(dateElm(threadData), contentBody(threadData), (0,_NxMedia_js__WEBPACK_IMPORTED_MODULE_4__.mediaElm)(threadData));
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
        data = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.convertLineBreaks)(data);
      }
      return data;
    }
  }
  return "";
}

function threadTextElm(threadData, ref) {
  var p = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_5__.getElm)("P", "nx-" + ref.join("-"));
  p.textContent = threadFieldText(threadData, ref);
  return p;
}

function threadBlocks(state) {
  var threadData = resolveThreadData(state);
  var blocks = [
    localThreadBlock(state, threadData),
    distantThreadBlock(threadData),
  ];

(0,_NxState_js__WEBPACK_IMPORTED_MODULE_2__.registerUpdateEvt)(function (newState) {
    updateThreadBlocks(newState);
  });

  return blocks;
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








function viewerElms(state){

    var indexPart = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV");
    indexPart.append((0,_NxIndex_js__WEBPACK_IMPORTED_MODULE_1__.indexBlock)(state));
    var threadPart = (0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("DIV");
    threadPart.append(...(0,_NxThread_js__WEBPACK_IMPORTED_MODULE_4__.threadBlocks)(state));
    
    return [(0,_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.serviceWrap)
([(0,_NxHistory_js__WEBPACK_IMPORTED_MODULE_0__.historyBlock)(state)], [
     indexPart,
     threadPart
     ], [(0,_NxSource_js__WEBPACK_IMPORTED_MODULE_3__.sourceBlock)(state)])];
}

/***/ })

}]);
//# sourceMappingURL=NxViewer.js.map