import { getOpt } from "../base/NxOptions.js";
import { getSrcData } from "../load/NxData.js";
import { registerThreadVisit } from "../storg/NxMemory.js";
import { registerBrowserEvent, updateBrowserHistory } from "./NxBrowser.js";

const bufferTime = 800;
var currentState = {
      dataUrl: null,
      srcData: null,
      threadId: "/",
      threadIndex: -1
    };
    
var updateStore = { onChange: [], onSrcChange: [] };
var updateRunning = false;

    if(getOpt('history')){
      registerBrowserEvent();
    }


function triggerCallbacks(triggerAll) {
  var ks = ["onChange"];
  if (triggerAll) {
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
        if (getOpt('history')) {
          updateBrowserHistory(currentState);
        }
      }
    
      currentState = state;
      var resetIndex = srcChanged || forceTrigger;

      triggerCallbacks(resetIndex);
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