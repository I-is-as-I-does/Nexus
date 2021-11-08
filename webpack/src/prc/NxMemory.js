import {
  clearPartialStorage,
  getLocalStorage,
  getSessionStorage,
  jsonSize,
} from "../lib/Jack/Trades/Stock.js";

var visitStore = {};
var dataStore = {};
var locStore = getLocalStorage();
var sesStore = getSessionStorage();

function setStorageAvailability(store) {
  if (store && !store.getItem("available")) {
    store.setItem("available", 5000);
  }
}

function getThreadDate(state) {
  if (state.threadIndex != -1) {
    var timestamp = state.srcData.threads[state.threadIndex].record.timestamp;
    return new Date(timestamp);
  }
  return null;
}

function threadLastSeenDate(state) {
  var timestamp;
  var key = state.dataUrl + "#" + state.threadId;
  if (visitStore.hasOwnProperty(key)) {
    timestamp = visitStore[key];
  } else if (locStore) {
    timestamp = locStore.getItem(key);
  }
  if (timestamp) {
    return new Date(timestamp);
  }
  return null;
}

function setStoreItem(store, key, data) {
  if (store != null) {
    var datasize = jsonSize(data, true);
    if (datasize > 2000) {
      return;
    }
    var avail = store.getItem("available");
    if (avail < 100) {
      clearPartialStorage(store, avail, 2000);
    }
    avail -= datasize;

    store.setItem(key, JSON.stringify(data));
    store.setItem("available", avail);
  }
}

setStorageAvailability(locStore);
setStorageAvailability(sesStore);

export function registerData(dataUrl, data) {
  dataStore[dataUrl] = data;
  setStoreItem(sesStore, dataUrl, data);
}

export function isThreadRecordUnseen(state) {
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

export function registerThreadVisit(state) {
  var key = state.dataUrl + "#" + state.threadId;
  if (!visitStore.hasOwnProperty(key)) {
    var time = getThreadDate(state);
    if (time) {
      visitStore[key] = time;
      setStoreItem(locStore, key, time);
    }
  }
}

export function getStoredData(dataUrl) {
  if (dataStore.hasOwnProperty(dataUrl)) {
    return dataStore[dataUrl];
  }
  if (sesStore) {
    var data = sesStore.getItem(dataUrl);
    if (data) {
      return JSON.parse(data);
    }
  }
  return false;
}
