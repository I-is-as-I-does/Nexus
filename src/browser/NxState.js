

import { getSrcData, getThreadsList } from "@i-is-as-i-does/nexus-core/src/load/NxSrc.js";
import { isThreadContentUnseen, registerThreadVisit } from "@i-is-as-i-does/nexus-core/src/storg/NxMemory.js";

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

export function concatSrc(state){
  var src = state.dataUrl
  if(state.threadId !== '/'){
    src += '#'+state.threadId
  }
 return src
}

export function getTimestamp(state){
  if (state.threadIndex !== -1 && state.threadIndex < state.srcData.threads.length) {
return state.srcData.threads[state.threadIndex].content.timestamp
  }
  return null
}

export function isStateUnseen(state){
  if (state.threadIndex !== -1 && state.srcData.index.indexOf(state.threadIndex) !== -1) {
    return isThreadContentUnseen(concatSrc(state), getTimestamp(state))
  }
  return false
}

export function dataToState(dataUrl, threadId, data){
  data.index = getThreadsList(data)
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

export function setDefaultThread(state){
  state.threadIndex = 0
  state.threadId = state.srcData.index[0]
}

export function resolveState(dataUrl, threadId) {
  return getSrcData(dataUrl).then((data) => {
  return dataToState(dataUrl, threadId, data)
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
    if(state.threadId === '/'){
      setDefaultThread(state)
    }

    if (forceTrigger || srcChanged || state.threadId != currentState.threadId) {
      updateRunning = true;
      if (!skipHistoryUpdate) {
        registerThreadVisit(concatSrc(currentState), getTimestamp(currentState));
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


