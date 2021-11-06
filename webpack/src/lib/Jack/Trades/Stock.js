export function getLocalStorage() {
  if (isStorageAvailable("localStorage")) {
    return localStorage;
  }
}

export function getSessionStorage() {
  if (isStorageAvailable("sessionStorage")) {
    return sessionStorage;
  }
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

export function clearPartialStorage(store, currentKb = null, threshold = 2000) {
  if (currentKb == null) {
    currentKb = jsonSize(store, true);
  }
  for (var i = 0; i < store.length; i++) {
    var itmkey = store.key(i);
    var itemsize = jsonSize(store.getItem(itmkey), true);
    store.removeItem(itmkey);
    currentKb += itemsize;
    if (currentKb > threshold) {
      break;
    }
  }
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
