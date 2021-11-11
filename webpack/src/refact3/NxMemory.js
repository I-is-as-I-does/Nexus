import {
  clearPartialStorage,
  getLocalStorage,
  getSessionStorage,
  jsonSize,
} from "../libr/Jack/Trades/Stock.js";


class Memory {
  #visitStore;
  #dataStore;
  #locStore;
  #sesStore;
  constructor() {
    this.#visitStore = {};
    this.#dataStore = {};
    this.#locStore = getLocalStorage();
    this.#sesStore = getSessionStorage();

    this.#setStorageAvailability(this.#locStore);
    this.#setStorageAvailability(this.#sesStore);
  }

  #setStorageAvailability(store) {
    if (store && !store.getItem("available")) {
      store.setItem("available", 5000);
    }
  }

  #getThreadDate(state) {
    if (state.threadIndex != -1) {
      var timestamp = state.srcData.threads[state.threadIndex].record.timestamp;
      return new Date(timestamp);
    }
    return null;
  }

  #threadLastSeenDate(state) {
    var timestamp;
    var key = state.dataUrl + "#" + state.threadId;
    if (this.#visitStore.hasOwnProperty(key)) {
      timestamp = this.#visitStore[key];
    } else if (this.#locStore) {
      timestamp = this.#locStore.getItem(key);
    }
    if (timestamp) {
      return new Date(timestamp);
    }
    return null;
  }

  #setStoreItem(store, key, data) {
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

  registerData(dataUrl, data) {
    this.#dataStore[dataUrl] = data;
    this.#setStoreItem(this.#sesStore, dataUrl, data);
  }

  isThreadRecordUnseen(state) {
    var lastVisit = this.#threadLastSeenDate(state);

    if (!lastVisit) {
      return true;
    }
    var threadDate = this.#getThreadDate(state);
    if (threadDate && lastVisit != threadDate) {
      return false;
    }
    return true;
  }

  registerThreadVisit(state) {
    var key = state.dataUrl + "#" + state.threadId;
    if (!this.#visitStore.hasOwnProperty(key)) {
      var time = this.#getThreadDate(state);
      if (time) {
        this.#visitStore[key] = time;
        this.#setStoreItem(this.#locStore, key, time);
      }
    }
  }

  getStoredData(dataUrl) {
    if (this.#dataStore.hasOwnProperty(dataUrl)) {
      return this.#dataStore[dataUrl];
    }
    if (this.#sesStore) {
      var data = this.#sesStore.getItem(dataUrl);
      if (data) {
        return JSON.parse(data);
      }
    }
    return null;
  }
}

export var NxMemory = new Memory();
