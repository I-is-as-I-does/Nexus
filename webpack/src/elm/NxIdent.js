import { splitFlap } from "../lib/Valva/Valva.js";
import { isThreadRecordUnseen } from "../prc/NxMemory.js";
import { getCurrentState, registerUpdateEvt, triggerUpdate } from "../prc/NxViewer.js";
import { getElm } from "./NxMeta.js";




function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains("nx-on-display")) {
    viewlk.classList.remove("nx-unseen");
    viewlk.lastChild.textContent = "";
  } else if (isThreadRecordUnseen(state)) {
    viewlk.classList.add("nx-unseen");
    viewlk.lastChild.textContent = "*";
  }
}

function toggleOnDisplay(viewlk, dataUrl, threadId, state) {

  if (dataUrl == state.dataUrl && threadId == state.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}

function resolveThreadName(state){
  var threadName = '/';
  if(state.threadId != '/'){
    threadName = state.srcData.threads[state.threadIndex].name;
  }
  return threadName;
}

export function baseViewLink(state, update = false) {
  var viewlk = getElm("A", "nx-view-link");
  viewlk.append(threadNameElm(state, update));
  return viewlk;
}

export function setToggleOnDisplay(viewlk, dataUrl, threadId){
  toggleOnDisplay(viewlk, dataUrl, threadId, getCurrentState());
  registerUpdateEvt(function (state) {
    toggleOnDisplay(viewlk, dataUrl, threadId, state);
  });

}

export function authorHandle(state, update = false) {
  var hnd = getElm("SPAN", "nx-handle");
  hnd.textContent = state.srcData.author.handle;
  if (update) {
    registerUpdateEvt(function (newState) {
      splitFlap(hnd, newState.srcData.author.handle, 20);
    }, true);
  }
  return hnd;
}

export function authorUrl(state, update = false) {
  var authorlk = getElm("A", "nx-author-url nx-external-link");
  authorlk.target = "_blank";
  authorlk.href = state.srcData.author.url;

  var urlBrck = [];
  ["[", "]"].forEach((bracket) => {
    var brsp = getElm("SPAN", "nx-author-url-brackets");
    brsp.textContent = bracket;
    urlBrck.push(brsp);
  });
  var urlsp = getElm("SPAN");
  urlsp.textContent = state.srcData.author.miniUrl;

  authorlk.append(urlBrck[0], urlsp, urlBrck[1]);

  if (update) {
    registerUpdateEvt(function (newState) {
      authorlk.href = newState.srcData.author.url;
      splitFlap(urlsp, newState.srcData.author.miniUrl, 20);
    }, true);
  }
  return authorlk;
}


export function threadNameElm(state, update = false) {
  var sp = getElm("SPAN", "nx-thread-name");
  sp.textContent = resolveThreadName(state);
  if (update) {
    registerUpdateEvt(function (newState) {
      var newThreadName = resolveThreadName(newState);
      splitFlap(sp, newThreadName, 15);
    });
  }

  return sp;
}

export function setToggleUnseen(viewlk, state){
  viewlk.append(getElm("SPAN", "nx-new-tag"));
  toggleUnseen(viewlk, state);
  registerUpdateEvt(function () {
    toggleUnseen(viewlk, state);
  });
}


export function viewLink(state, update = false) {
  var viewlk = baseViewLink(state, update);
  if (state.threadId != "/") {
    setToggleOnDisplay(viewlk, state.dataUrl, state.threadId);
    setToggleUnseen(viewlk, state);
  }

  viewlk.addEventListener("click", () => {
    triggerUpdate(state);
  });
  return viewlk;
}

export function authorIndexLink(state, update = false) {
  var auth = getElm("A", "nx-author-link");
  auth.append(authorHandle(state, update));

  var newState = {
    dataUrl: state.dataUrl,
    srcData: state.srcData,
    threadId: "/",
    threadIndex: -1
  }
  auth.addEventListener("click", function () {
    triggerUpdate(newState, "/");
  });

  return auth;
}
