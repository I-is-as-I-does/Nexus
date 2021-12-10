/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

export function getLocalStorage() {
  if (isStorageAvailable("localStorage")) {
    return localStorage;
  }
  return null;
}

export function getSessionStorage() {
  if (isStorageAvailable("sessionStorage")) {
    return sessionStorage;
  }
  return null;
}

export function sizeInBytes(s) {
  return new TextEncoder().encode(s).length;
}

export function jsonSize(obj, inKb = true) {
  var sz = sizeInBytes(JSON.stringify(obj));
  if (inKb) {
    sz = sz / 1000;
  }
  return sz;
}

export function clearPartialStorage(store, threshold = 2000) {
    var currentKb = jsonSize(store, true);
  for (var i = 0; i < store.length; i++) {
    if (currentKb < threshold) {
      break;
    }
    var itmkey = store.key(i);
    var itemsize = jsonSize(store.getItem(itmkey), true);
    store.removeItem(itmkey);
    currentKb -= itemsize;
  }
  return currentKb;
}

export function isStorageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
}

export function copyToClipboard(content, callback) {
  navigator.clipboard.writeText(content).then(() => callback());
}
