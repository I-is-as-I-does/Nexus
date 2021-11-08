import {
  clearPartialStorage,
  getLocalStorage,
  getSessionStorage,
} from "./lib/Jack/Trades/Stock";
import { miniUrl } from "./lib/Jack/Trades/Web";
import { validMap } from "./NxStamper";

var visitStore = {};
var dataStore = {};
var locStore = getLocalStorage();
var sesStore = getSessionStorage();

function setStorageAvailability(store) {
  if (store && !store.getItem("available")) {
    store.setItem("available", 5000);
  }
}

function threadDate(dataSrc, threadId) {
  var data = getThreadData(dataSrc, threadId);
  if (data) {
    return new Date(data.record.timestamp);
  }
  return null;
}

function threadLastSeenDate(dataSrc, threadId) {
  var timestamp;
  var key = dataSrc + "#" + threadId;
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
  if (store) {
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

function setDataHelpers(data) {
  data.map = {};
  data.threads.map((it, k) => {
    data.map[it.id] = k;
  });

  data.author.miniUrl = miniUrl(data.author.url);
}

function loadSrcFile(dataSrc) {
  return loadJson(dataSrc).then((data) => {
    data = validMap(data);
    if (data) {
      setDataHelpers(data);
      registerData(dataSrc, data);
      return data;
    }
    registerData(dataSrc, 400);
    throw 400;
  }).catch(()=>{
    registerData(dataSrc, 404);
    throw 404;
  });
}

setStorageAvailability(locStore);
setStorageAvailability(sesStore);

export function registerData(dataSrc, data) {
  dataStore[dataSrc] = data;
  setStoreItem(sesStore, dataSrc, data);
}

export function isThreadRecordUnseen(dataSrc, threadId) {
  var lastVisit = threadLastSeenDate(dataSrc, threadId);

  if (!lastVisit) {
    return true;
  }
  var threadDate = threadDate(dataSrc, threadId);
  if (threadDate && lastVisit != threadDate) {
    return false;
  }
  return true;
}

export function registerThreadVisit(current) {
  var key = current.dataSrc + "#" + current.threadId;
  if (!visitStore.hasOwnProperty(key)) {
    var time = threadDate(current.dataSrc, current.threadId);
    if (time) {
      visitStore[key] = time;
      setStoreItem(locStore, key, time);
    }
  }
}

export function resolveData(dataSrc) {
  var data = getData(dataSrc);
  if (data) {
    if (Number.isInteger(data)) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  }
  return loadSrcFile(dataSrc);
}

export function getData(dataSrc) {
  if (dataStore.hasOwnProperty(dataSrc)) {
    return dataStore[dataSrc];
  }
  if (sesStore) {
    var data = sesStore.getItem(dataSrc);
    if (data) {
      return JSON.parse(data);
    }
  }
  return false;
}

export function getThreadData(data, threadId) {
  var index = resolveThreadIndex(data, threadId);
  if (index != -1) {
    return data.threads[index];
  }
  return null;
}

export function resolveThreadIndex(data, threadId) {
  if (
    data &&
    threadId &&
    threadId != "/" &&
    data.map.hasOwnProperty(threadId)
  ) {
    return data.map[threadId];
  }
  return -1;
}
