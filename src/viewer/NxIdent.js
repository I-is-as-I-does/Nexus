
import { vSplitFlap } from "@i-is-as-i-does/valva/src/modules/transitions";
import { registerUpdateEvt, triggerUpdate, isStateUnseen } from "../browser/NxState.js";
import { baseViewLink, getElm, setToggleOnDisplay } from "../browser/NxCommons.js";
import { getStoredItem, storeItem } from '@i-is-as-i-does/nexus-core/src/storg/NxStorage.js'
import { miniUrl } from "@i-is-as-i-does/jack-js/src/modules/Web.js";

var urlStore = {}

function authorMiniUrl(authorUrl) {
  var url = getStoredItem(authorUrl,"local",urlStore, false);
  if(!url){
    url = miniUrl(authorUrl);
    storeItem(authorUrl, url, "local", urlStore,false);
  }
  return url;
}


function toggleUnseen(viewlk, state) {
  if (viewlk.classList.contains("nx-on-display")) {
    viewlk.classList.remove("nx-unseen");
    viewlk.lastChild.textContent = "";
  } else if (isStateUnseen(state)) {
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
   registerUpdateEvt(function (newState) {
      vSplitFlap(hnd, newState.srcData.author.handle, 25);
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
    urla.textContent = authorMiniUrl(state.srcData.author.url);
  }
  
  authorlksp.append(urlBrck[0], urla, urlBrck[1]);

  if (update) {
   registerUpdateEvt(function (newState) {
      urla.href = newState.srcData.author.url;
      vSplitFlap(urla, authorMiniUrl(newState.srcData.author.url), 25);
    }, true);
  }
  return authorlksp;
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
    threadIndex: -1
  };
  auth.addEventListener("click", function () {
triggerUpdate(newState, "/");
  });

  return auth;
}
