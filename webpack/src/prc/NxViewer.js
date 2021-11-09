import { viewerBlocks } from "../elm/NxMeta.js";
import { splitFlap } from "../lib/Valva/Valva.js";
import { opts, container, setContents } from "./NxHost.js";
import { resolveOriginState } from "./NxInstance.js";
import { registerThreadVisit } from "./NxMemory.js";
import { getTxt, setUserSelectedLang } from "./NxTranslate.js";



var currentState = {
  dataUrl: null,
  srcData: null,
  threadId: "/",
  threadIndex: -1,
};

const bufferTime = 800;
var translStore = {};
var updateStore = { onChange: [], onSrcChange: [] };
var updateRunning = false;

function registerBrowserEvent() {
  window.onpopstate = (event) => {
    if (event.state && event.state.src && event.state.id) {
      triggerUpdate(event.state.src, event.state.id, false);
    }
  };
}

function updateBrowserHistory() {
  var ref = { id: currentState.threadId, src: currentState.dataUrl };
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
        if (opt("history")) {
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

export function init(plugin = null) {
  resolveOriginState().then((state) => {
    currentState = state;
   setContents(viewerBlocks(state));
    if (typeof plugin === "function") {
      plugin(state);
    }
    if (opt("history")) {
      registerBrowserEvent();
    }
  });
}
