/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { splitFlap } from "../libr/Valva/Valva.js";
import { registerUpdateEvt, triggerUpdate } from "../NxUpdate.js";
import { authorMiniUrl, isThreadContentUnseen } from "../core/storg/NxMemory.js";
import { baseViewLink, getElm, setToggleOnDisplay } from "./NxCommons.js";

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

    var urla = getElm("A", "nx-author-url nx-external-link");
    urla.target = "_blank";
    if(state.srcData){
        urla.href = state.srcData.author.url;
   urla.textContent = state.srcData.author.url;
    }
  
    if (update) {
     registerUpdateEvt(function (newState) {
        urla.href = newState.srcData.author.url;
        splitFlap(urla, newState.srcData.author.url, 20);
      }, true);
    }
    return urla;
  }
  