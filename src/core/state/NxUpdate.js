/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */

import { getSrcData } from "../load/NxSrc.js";
import { registerThreadVisit } from "../storg/NxMemory.js";


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

export function resolveState(dataUrl, threadId) {
  return getSrcData(dataUrl).then((data) => {

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
  });
}

export function registerUpdateEvt(callback, onSrcChange = false) {
  var k = "onChange";
  if (onSrcChange) {
    k = "onSrcChange";
  }
  updateStore[k].push(callback);
}

export function triggerUpdate(state, skipHistoryUpdate = false, forceTrigger = false) {
  if (!updateRunning) {
    var srcChanged = state.dataUrl != currentState.dataUrl;

    if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {
      updateRunning = true;
      if (!skipHistoryUpdate) {
        registerThreadVisit(currentState);
      }
    
      var resetIndex = srcChanged || forceTrigger;
      currentState = Object.assign({},state);

      triggerCallbacks(state, resetIndex);
      updateTimeout();
    }
  }
}

export function getCurrentState() {
  return currentState;
}

export function setOriginState(state) {
  if (!currentState.dataUrl) {
    currentState = state;
    return true;
  }
  return false;
}

export function getBuffertime(){
  return bufferTime;
}


