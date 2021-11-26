import { loadJson, miniUrl } from "../libr/Jack/Web.js";
import { splitFlap } from "../libr/Valva/Valva.js";

import { getStoredData, registerData, registerThreadVisit } from "./NxMemory.js";
import { resetLogs, validMap } from "../utils/NxStamper.js";
import { getTxt, setUserSelectedLang } from "../utils/NxTranslate.js";


/*
import { loadJson, miniUrl } from "../NxJackBundle.js";
import { splitFlap } from "../NxValvaBundle.js";
import { getTxt, setUserSelectedLang,resetLogs, validMap }  from "../NxUtilsBundle.js";
import { getStoredData, registerData, registerThreadVisit} from "./NxMemory.js";
import { addErrMsg, logEvent } from "./NxInstance.js";*/

const bufferTime = 800;
var currentState = {
  dataUrl: null,
  srcData: null,
  threadId: "/",
  threadIndex: -1,
  lastEvent:null
};

var translStore = {};
var updateStore = { onChange: [], onSrcChange: [] };
var updateRunning = false;
var useBrowserHistory = false;

function registerBrowserEvent() {
    window.onpopstate = (event) => {
      if (event.state && event.state.src && event.state.id && event.state.ix && event.state.ev) {
        var newState = event.state;
        newState.srcData = getStoredData(event.state.src);
        triggerUpdate(newState, false);
      }
    };
  }
  
function updateBrowserHistory() {
  var ref = { id: currentState.threadId, src: currentState.dataUrl, ix:currentState.threadIndex, ev:currentState.lastEvent };
  history.replaceState(ref, "");
  history.pushState(ref, "");
}

function triggerCallbacks(srcChanged) {
  var ks = ["onChange"];
  if (srcChanged) {
    ks.push("onSrcChange");
  }

  ks.forEach((k) => {
    if (updateStore[k].length) {
      updateStore[k].forEach((callback) => {
        callback(currentState);
      });
    }
  });
}

function updateTimeout() {
  setTimeout(
    function () {
      updateRunning = false;
    }.bind(this),
    bufferTime
  );
}

function updateTextElm(elm, textkey) {
  splitFlap(elm, getTxt(textkey), 50);
}


function setDataHelpers(data) {
  data.index = [];

  data.threads.map((it) => {
    data.index.push(it.id);
  });

  data.author.miniUrl = miniUrl(data.author.url);
}
function resolveData(dataUrl) {
  var data = getStoredData(dataUrl);
  if (data !== null) {
      if(Number.isInteger(data)){
        return Promise.reject(data);
      }
    return Promise.resolve(data);
  }
  return loadSrcFile(dataUrl);
}


function loadSrcFile(dataUrl) {
  return loadJson(dataUrl).then((data) => {
    resetLogs();
    data = validMap(data);
    if (data) {
      setDataHelpers(data);
      registerData(dataUrl, data);
      return data;
    }
    registerData(dataUrl, 400);
    logEvent(getLogs());
    addErrMsg("Invalid source");
    return Promise.reject(400);
  }).catch((err) => {
    logEvent(err);
    registerData(dataUrl, 404);
    addErrMsg("No response");
    throw 404;
  });
}

export function activateBrowserHistory(){
  if(!useBrowserHistory){
      useBrowserHistory = true;
      registerBrowserEvent();
  }
}


export function resolveState(dataUrl, threadId) {
  return resolveData(dataUrl).then((data) => {
    var state = {
      dataUrl: dataUrl,
      threadId: threadId,
      srcData: data,
      threadIndex: data.index.indexOf(threadId),
      lastEvent:"read"
    };

    if (state.threadIndex === -1 && threadId !== "/") {
      state.threadId = "/";
    }
    return state;
  });
}

export function registerTranslElm(elm, textkey) {
  if (!translStore[textkey]) {
    translStore[textkey] = [];
  }
  translStore[textkey].push(elm);
}

export function registerUpdateEvt(callback, onSrcChange = false) {
  var k = "onChange";
  if (onSrcChange) {
    k = "onSrcChange";
  }
  updateStore[k].push(callback);
}

export function triggerUpdate(state, skipHistoryUpdate = false) {
  if (!updateRunning) {
    var srcChanged = state.dataUrl != currentState.dataUrl;
    if (srcChanged || state.threadId != currentState.threadId) {
      updateRunning = true;
      if (!skipHistoryUpdate) {
        registerThreadVisit(currentState);
        if (useBrowserHistory) {
          updateBrowserHistory();
        }
      }
      currentState = state;

      triggerCallbacks(srcChanged);
      updateTimeout();
    }
  }
}

export function triggerTranslate(lang) {

  if (setUserSelectedLang(lang)) {

    for (let [textkey, elms] of Object.entries(translStore)) {
      elms.forEach((elm) => {
        updateTextElm(elm, textkey);
      });
    }
  }
}

export function getCurrentState() {
  return currentState;
}



export function setOriginState(state){
    if(!currentState.dataUrl){
        currentState = state;
        return true;
    }
    addErrMsg("Origin state already set");
    return false;
}

