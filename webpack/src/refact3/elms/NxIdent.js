import { splitFlap } from "../../libr/Valva/Valva.js";
import { NxMemory } from "../NxMemory.js";
import {
  NxState
} from "../NxState.js";
import { baseViewLink, getElm, setToggleOnDisplay } from "./NxMeta.js";

function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains("nx-on-display")) {
    viewlk.classList.remove("nx-unseen");
    viewlk.lastChild.textContent = "";
  } else if (NxMemory.isThreadRecordUnseen(state)) {
    viewlk.classList.add("nx-unseen");
    viewlk.lastChild.textContent = "*";
  }
}



export function authorHandle(state, update = false) {
  var hnd = getElm("SPAN", "nx-handle");
  if(state.srcData){
  hnd.textContent = state.srcData.author.handle;
}
  if (update) {
    NxState.registerUpdateEvt(function (newState) {
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
    NxState.registerUpdateEvt(function (newState) {
      urla.href = newState.srcData.author.url;
      splitFlap(urla, newState.srcData.author.miniUrl, 20);
    }, true);
  }
  return authorlksp;
}


export function setToggleUnseen(viewlk, state) {
  viewlk.append(getElm("SPAN", "nx-new-tag"));
  toggleUnseen(viewlk, state);
  NxState.registerUpdateEvt(function () {
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
    NxState.triggerUpdate(state);
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
  };
  auth.addEventListener("click", function () {
    NxState.triggerUpdate(newState, "/");
  });

  return auth;
}
