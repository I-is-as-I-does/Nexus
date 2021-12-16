/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { miniUrl } from "../../libr/Jack/Web.js";
import { getStoredItem, removeItem, storeItem } from "./NxStorage.js";


var visitStore = {};
var dataStore = {};
var urlStore = {};
var oembedStore = {};
const editprefix = "nx-edit#";

function getThreadDate(state) {

    if (state.threadIndex != -1 && state.srcData.threads[state.threadIndex]) {
      var timestamp = state.srcData.threads[state.threadIndex].content.timestamp;
      return new Date(timestamp);
    }
    return null;
  }

  function threadLastSeenDate(state) {

    var key = state.dataUrl + "#" + state.threadId;
    var timestamp = getStoredItem(key, "local", visitStore, false);
    if (timestamp) {
      return new Date(timestamp);
    }
    return null;
  }

  export function registerEditData(url, data) {
    storeItem(editprefix+url, data, "local");
  }

  export function getStoredEditData(url) {
    return getStoredItem(editprefix+url, "local");
  }

  export function registerThreadVisit(state) {

    var key = state.dataUrl + "#" + state.threadId;
    if (!visitStore.hasOwnProperty(key)) {
   
      var time = getThreadDate(state);
      if (time) {
        storeItem(key, time, "local", visitStore, false);
      }
    }
  }


  export function isThreadContentUnseen(state) {
    var lastVisit = threadLastSeenDate(state);

    if (!lastVisit) {
      return true;
    }
    var threadDate = getThreadDate(state);
    if (threadDate && lastVisit != threadDate) {
      return false;
    }
    return true;
  }

  export function clearData(dataUrl){
    removeItem(dataUrl, "session", dataStore);
  }


  export function registerData(dataUrl, data) {
    storeItem(dataUrl, data, "session", dataStore);
  }

  export function getStoredData(dataUrl) {
    return getStoredItem(dataUrl, "session",dataStore);
  }

  export function authorMiniUrl(authorUrl) {
    var url = getStoredItem(authorUrl,"local",urlStore, false);
    if(!url){
      url = miniUrl(authorUrl);
      storeItem(authorUrl, url, "local", urlStore,false);
    }
    return url;
  }

  export function registerOembedResponse(givenUrl, response){
    storeItem(givenUrl, response, "local", oembedStore, true);
  }

  export function getStoredOembedResponse(givenUrl){
    return getStoredItem(givenUrl, "local",oembedStore, true);
  }

  export function setStoredLang(lang){
    storeItem("nx-lang", lang, "local", null,false);
  }
  export function getStoredLang(){
    return getStoredItem("nx-lang","local",null, false);
  }

