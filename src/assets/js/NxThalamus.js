import { errorElm, defaultReaderBlocks } from "./elm/NxMeta.js";
import { isElement, isNonEmptyStr } from "./lib/Jack/Trades/Check.js";
import {
  clearPartialStorage,
  getLocalStorage,
  getSessionStorage,
  jsonSize,
} from "./lib/Jack/Trades/Stock.js";
import {
  isValidHttpUrl,
  loadJson,
  loadCss,
  miniUrl,
} from "./lib/Jack/Trades/Web.js";
import { insertDiversion } from "./lib/Valva/Valva.js";
import { defaultCssUrl } from "./NxConstants.js";
import NxNimrod from "./NxNimrod.js";
import { isValidId, validMap } from "./NxStamper.js";

class NxThalamus {
  constructor() {
    this.container = null;

    this.themeCssUrl = defaultCssUrl;
    this.embedMode = false;
    this.logMode = false;

    this.shadow = false;
    this.metaElm = null;

    this.browserHistory = false;

    this.loadedCss = {};

    this.current = {
      dataSrc: null,
      threadId: null,
    };
    this.origin = {
      dataSrc: null,
      threadId: null,
    };

    this.bufferTime = 800;
    this.originLang = "en";

    this.isHistoryEvent = false;

    this.updateStore = { onChange: [], onSrcChange: [] };
    this.updateRunning = false;
    this.doneLoadingEvt = new CustomEvent("Done");

    this.visitStore = {};
    this.dataStore = {};
    this.locStore = getLocalStorage();
    this.sesStore = getSessionStorage();

    this.#setStorageAvailability(this.locStore);
    this.#setStorageAvailability(this.sesStore);

    window.onpopstate = function (event) {
      if (event.state && event.state.dataSrc && event.state.threadId) {
        this.triggerUpdate(event.state.dataSrc, event.state.threadId);
      }
    }.bind(this);
  }

  #setStorageAvailability(store) {
    if (store && !store.getItem("available")) {
      store.setItem("available", 5000);
    }
  }
  #registerData(dataSrc, data) {
    this.dataStore[dataSrc] = data;
    this.#setStoreItem(this.sesStore, dataSrc, data);
  }

  threadDate(dataSrc, threadId) {
    var data = this.threadData(dataSrc, threadId);
    if (data) {
      return new Date(data.record.timestamp);
    }
    return null;
  }

  threadLastSeenDate(dataSrc, threadId) {
    var timestamp;
    var key = dataSrc + "#" + threadId;
    if (this.visitStore.hasOwnProperty(key)) {
      timestamp = this.visitStore[key];
    } else if (this.locStore) {
      timestamp = this.locStore.getItem(key);
    }
    if (timestamp) {
      return new Date(timestamp);
    }
    return null;
  }

  isThreadRecordUnseen(dataSrc, threadId) {
    var lastVisit = this.threadLastSeenDate(dataSrc, threadId);

    if (!lastVisit) {
      return true;
    }
    var threadDate = this.threadDate(dataSrc, threadId);
    if (threadDate && lastVisit != threadDate) {
      return false;
    }
    return true;
  }

  #setContainer(container) {
    if (!this.container) {
      if (!container || !isElement(container)) {
        container = document.querySelector("#Nexus");
        if (!container) {
          console.log("NxThalamus: Nexus element not found");
          return false;
        }
      }
      this.container = container;

      this.#setOpts();
      this.#setWrappers();

      return true;
    }

    this.logEvent("NxThalamus: container already set");
    return false;
  }

  #setOpts() {
    if (isValidHttpUrl(this.container.dataset.src)) {
      this.origin.dataSrc = this.container.dataset.src;
      if (isValidId(this.container.dataset.id)) {
        this.origin.threadId = this.container.dataset.id;
      }
    }

    if (isValidHttpUrl(this.container.dataset.style)) {
      this.themeCssUrl = this.container.dataset.style;
    }

    if (isNonEmptyStr(this.container.dataset.lang)) {
      this.originLang = this.container.dataset.lang;
    }

    if (this.container.dataset.embed == "true") {
      this.embedMode = true;
    }
    if (this.container.dataset.history == "true") {
      this.browserHistory = true;
    }
    if (this.container.dataset.log == "true") {
      this.logMode = true;
    }
  }

  #setWrappers() {
    if (this.embedMode) {
      this.shadow = true;
      this.metaElm = this.container.attachShadow({ mode: "open" });
      this.container.classList.add("nexus");
    } else {
      this.metaElm = this.container;
      document.querySelector("html").classList.add("nexus");
    }
  }

  setDebugMode() {
    this.logMode = true;
  }

  loadStyle(url) {
    if (this.loadedCss[url]) {
      if (this.loadedCss[url] === 200) {
        return Promise.resolve(200);
      }
      return Promise.reject(404);
    }
    var root = null;
    if (this.shadow) {
      root = this.metaElm;
    }
    return loadCss(".nexus", url, root)
      .then(() => {
        this.loadedCss[url] = 200;
      })
      .catch((err) => {
        this.logEvent(err);
        this.loadedCss[url] = 404;
        throw 404;
      });
  }

  logEvent(msg) {
    if (this.logMode) {
      console.log(msg);
    }
  }

  loadData(dataSrc) {
    var data = this.srcData(dataSrc);
    if (data) {
      if (Number.isInteger(data)) {
        return Promise.reject(data);
      }
      return Promise.resolve(200);
    }

    return loadJson(dataSrc)
      .then((data) => {
        data = validMap(data);
        if (data) {
          data.map = {};
          data.threads.map((it, k) => {
            data.map[it.id] = k;
          });

          data.author.miniUrl = miniUrl(data.author.url);
          this.#registerData(dataSrc, data);
          return 200;
        }
        this.logEvent("NxThalamus: invalid data");
        throw 400;
      })
      .catch((err) => {
        this.logEvent(err);
        if (err !== 400) {
          err = 404;
        }
        this.#registerData(dataSrc, err);
        throw err;
      });
  }

  #resolveInstanceData() {
    if (!this.current.dataSrc) {
      if (!this.origin.dataSrc) {
        return false;
      }
      this.current = this.origin;
    }
    return true;
  }

  autoloadReader(container = null) {
    this.initPage(
      function () {
        this.metaElm.append(
          defaultReaderBlocks(this.current.dataSrc, this.current.threadId)
        );
      }.bind(this),
      null,
      container
    );
  }

  initPage(successCallback, failCallback = null, container = null) {
    var prom;
    if (this.#setContainer(container) && this.#resolveInstanceData()) {
      NxNimrod.setDefaultLang(this.originLang);
      prom = this.loadStyle(this.themeCssUrl)
        .then(() => this.loadData(this.current.dataSrc))
        .then(() => {
          this.current.threadId = this.resolveThreadId(
            this.current.dataSrc,
            this.current.threadId
          );
          return successCallback();
        });
    } else {
      this.logEvent("NxThalamus: unable to init page");
      prom = Promise.reject(422);
    }
    prom.catch((err) => {
      this.#handleErr(err, failCallback);
    });
  }

  #handleErr(err, failCallback = null) {
    this.logEvent(err);
    if (this.metaElm) {
      var text = "Invalid Nexus data";
      if (this.loadedCss[this.themeCssUrl] === 404) {
        text = "Nexus theme not found";
      } else if (
        this.current.dataSrc &&
        this.srcData(this.current.dataSrc) === 404
      ) {
        text = "Nexus not found";
      }
      this.current.dataSrc = null;
      this.current.threadId = null;
      insertDiversion(this.metaElm, errorElm(text), false, true, 200);
    }
    if (typeof failCallback === "function") {
      failCallback();
    }
  }

  #addHistoryState() {
    if (this.browserHistory) {
      history.replaceState(this.current, "");
      history.pushState(this.current, "");
    }
  }

  #registerThreadVisit(dataSrc, threadId) {
    var key = dataSrc + "#" + threadId;
    if (!this.visitStore.hasOwnProperty(key)) {
      var time = this.threadDate(dataSrc, threadId);
      if (time) {
        this.visitStore[key] = time;
        this.#setStoreItem(this.locStore, key, time);
      }
    }
  }

  #setStoreItem(store, key, data) {
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

  triggerUpdate(dataSrc, threadId, isHistoryEvent = false) {
    if (!this.updateRunning) {
      var srcChanged = dataSrc != this.current.dataSrc;
      if (srcChanged || threadId != this.current.threadId) {
        this.updateRunning = true;

        this.isHistoryEvent = isHistoryEvent;
        if (!isHistoryEvent) {
          this.#registerThreadVisit(
            this.current.dataSrc,
            this.current.threadId
          );
          this.#addHistoryState();
        }

        this.current.dataSrc = dataSrc;
        this.current.threadId = threadId;

        var ks = ["onChange"];
        if (srcChanged) {
          ks.push("onSrcChange");
        }

        ks.forEach((k) => {
          if (this.updateStore[k].length) {
            this.updateStore[k].forEach((callback) => {
              callback(this.current);
            });
          }
        });

        setTimeout(
          function () {
            this.updateRunning = false;
          }.bind(this),
          this.bufferTime
        );
      }
    }
  }

  registerUpdateEvt(callback, onSrcChange = false) {
    var k = "onChange";
    if (onSrcChange) {
      k = "onSrcChange";
    }
    this.updateStore[k].push(callback);
  }

  srcData(dataSrc) {
    if (this.dataStore.hasOwnProperty(dataSrc)) {
      return this.dataStore[dataSrc];
    }
    if (this.sesStore) {
      var data = this.sesStore.getItem(dataSrc);
      if (data) {
        return JSON.parse(data);
      }
    }
    return false;
  }

  threadData(dataSrc, threadId) {
    if (threadId && threadId != "/") {
      var data = this.srcData(dataSrc);
      if (data && data.map.hasOwnProperty(threadId)) {
        return data.threads[data.map[threadId]];
      }
    }
    return null;
  }

  resolveThreadId(dataSrc, threadId) {
    if (this.threadData(dataSrc, threadId)) {
      return threadId;
    }
    return "/";
  }
}

export default new NxThalamus();
