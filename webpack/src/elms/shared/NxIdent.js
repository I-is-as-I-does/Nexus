import { splitFlap } from "../../libr/Valva/Valva.js";
import { isThreadRecordUnseen } from "../../procs/NxMemory.js";
import {
  getCurrentState,
  registerUpdateEvt,
  triggerUpdate,
} from "../../procs/NxState.js";
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

function toggleOnDisplay(viewlk, givenState, newState) {
  if (newState.dataUrl && givenState.dataUrl == newState.dataUrl && givenState.threadId == newState.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}

function resolveThreadName(state) {
  var threadName = "/";
  if (state.threadId && state.threadId != "/") {
    threadName = state.srcData.threads[state.threadIndex].name;
  }
  return threadName;
}

export function baseViewLink(state, update = false) {
  var viewlk = getElm("A", "nx-view-link");
  viewlk.append(threadNameElm(state, update));
  return viewlk;
}

export function setToggleOnDisplay(viewlk, state) {
 
  toggleOnDisplay(viewlk, state, getCurrentState());
  registerUpdateEvt(function (newState) {
    toggleOnDisplay(viewlk, state, newState);
  });
}

export function authorHandle(state, update = false) {
  var hnd = getElm("SPAN", "nx-handle");
  if(state.srcData){
  hnd.textContent = state.srcData.author.handle;
}
  if (update) {
    registerUpdateEvt(function (newState) {
      splitFlap(hnd, newState.srcData.author.handle, 20);
    }, true);
  }
  return hnd;
}

export function authorUrl(state, update = false) {

  var authorlksp = getElm("SPAN","nx-author-url");
 
  var urlBrck = [];
  ["[", "]"].forEach((bracket) => {
    var brsp = getElm("SPAN", "nx-author-url-brackets");
    brsp.textContent = bracket;
    urlBrck.push(brsp);
  });
  var urla = getElm("A", "nx-external-link");
  urla.target = "_blank";
  var hrf = '';
  if(state.srcData){
 hrf = state.srcData.author.url;
  }
  urla.href =hrf;
  
  if(state.srcData){
    urla.textContent = state.srcData.author.miniUrl;
  }
  
  authorlksp.append(urlBrck[0], urla, urlBrck[1]);

  if (update) {
    registerUpdateEvt(function (newState) {
      urla.href = newState.srcData.author.url;
      splitFlap(urla, newState.srcData.author.miniUrl, 20);
    }, true);
  }
  return authorlksp;
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

export function setToggleUnseen(viewlk, state) {
  viewlk.append(getElm("SPAN", "nx-new-tag"));
  toggleUnseen(viewlk, state);
  registerUpdateEvt(function () {
    toggleUnseen(viewlk, state);
  });
}

export function viewLink(state, update = false) {
  var viewlk = baseViewLink(state, update);
  if (state.threadId != "/") {
    setToggleOnDisplay(viewlk, state);
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
    threadIndex: -1,
  };
  auth.addEventListener("click", function () {
    triggerUpdate(newState, "/");
  });

  return auth;
}
