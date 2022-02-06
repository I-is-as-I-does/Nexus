/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import {
  clearPartialStorage,
  getLocalStorage,
  getSessionStorage,
  jsonSize,
} from "../../libr/Jack/Stock.js";


const locStorag = getLocalStorage();
const sesStorag = getSessionStorage();

function setStorageAvailability(store) {
  if (store && !store.getItem("available")) {
    store.setItem("available", 5000);
  }
}

function resolveStore(storage) {

  if (storage == "session") {
    return sesStorag;
  }
  return locStorag;

}

setStorageAvailability(locStorag);
setStorageAvailability(sesStorag);


export function storeItem(key, data, storage = "session", instanceStore = null, json = true) {
  if (instanceStore) {
    instanceStore[key] = data;
  }
  var store = resolveStore(storage);
  if (store != null) {
    var datasize = jsonSize(data, true);
    if (datasize > 2000) {
      return;
    }

    var avail = store.getItem("available");
    if (avail < 1000) {
      avail = 5000 - clearPartialStorage(store, 2000);
    }
    avail -= datasize;

    if (json) {
      data = JSON.stringify(data);
    }
    store.setItem(key, data);
    store.setItem("available", Math.ceil(avail));
  }
}

export function getStoredItem(key, storage = "session", instanceStore = null, json = true) {
  if (instanceStore !== null && instanceStore.hasOwnProperty(key)) {
    return instanceStore[key];
  }
  var store = resolveStore(storage);
  if (store) {
    var data = store.getItem(key);
    if (data) {
      if (json) {
        data = JSON.parse(data);
      }
      if (instanceStore) {
        instanceStore[key] = data;
      }
      return data;
    }
  }
  return null;
}

export function removeItem(key, storage = "session", instanceStore = null) {
  if (instanceStore & instanceStore.hasOwnProperty(key)) {
    delete instanceStore[key];
  }
  var store = resolveStore(storage);
  if (store) {
    store.removeItem(key);

  }
}
export function clearCache() {
  [sesStorag, locStorag].forEach(store => {
    if (store) {
      store.clear();
    }
  });
}

