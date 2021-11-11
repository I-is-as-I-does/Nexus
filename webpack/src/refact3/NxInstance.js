import { loadCss, isValidHttpUrl, loadJson, miniUrl } from "../libr/Jack/Trades/Web.js";
import { isNonEmptyStr } from "../libr/Jack/Trades/Check.js";
import { defaultSelector, defaultCss } from "./NxConstants.js";
import { NxStamper } from "./NxStamper.js";
import { NxTranslate } from "./NxTranslate.js";
import { NxMemory } from "./NxMemory.js";


class Instance {
    #opts;
    #errMsgs;
    #container;
    #shadow;
    #loadedCss;
    #nexusContainer;
  constructor() {
    this.#opts = {
      src: null,
      id: "/",
      style: defaultCss,
      lang: "en",
      history:false, 
      debug:false
    };
    this.#errMsgs = [];
    this.#container = null;
    this.#shadow = null;
    this.#loadedCss = {};
    this.#nexusContainer = null;

    this.#setCookie();
    this.#setContainer();
    this.#setOpts();
  }

  #setCookie() {
    document.cookie = "Nx=Instance; SameSite=None; Secure";
  }
  #setContainer() {

    this.#container = document.querySelector(defaultSelector);

    if (!this.#container) {
      this.#container = document.createElement("DIV");
      document.body.append(this.#container);
    }
    this.#nexusContainer = document.createElement('DIV');
    this.#nexusContainer.className = "nexus";
  
    this.#shadow = this.#container.attachShadow({ mode: "open" });
    this.#shadow.append(this.#nexusContainer);
  }


  #setOpts() {
      if (this.#container.dataset) {
        var options = this.#container.dataset;
      
    if (isValidHttpUrl(options.src)) {
      this.#opts.src = options.src;
      if (NxStamper.isValidId(options.id)) {
        this.#opts.id = options.id;
      }
    }

    if (isValidHttpUrl(options.style)) {
      this.#opts.style = options.style;
    }

    if (isNonEmptyStr(options.lang)) {
      this.#opts.lang = options.lang;
      NxTranslate.setOriginLang(this.#opts.lang);
    }

    ["history","debug"].forEach(prop => {
        if(options[prop] === "true" || options[prop] === true){
            this.#opts[prop] = true;
        }
    });
  }
  }

 #setDataHelpers(data) {
    data.index = [];
  
    data.threads.map((it) => {
      data.index.push(it.id);
    });
  
    data.author.miniUrl = miniUrl(data.author.url);
  }


  #loadSrcFile(dataUrl) {
    return loadJson(dataUrl)
      .then((data) => {
        NxStamper.resetLogs();
        data = NxStamper.validMap(data);
        if (data) {
          this.#setDataHelpers(data);
          NxMemory.registerData(dataUrl, data);
          return data;
        }
        NxMemory.registerData(dataUrl, 400);
        this.logEvent(NxStamper.getLogs());
        this.#errMsgs.push("Invalid source");
        return Promise.reject(400);
      })
      .catch((err) => {
        this.logEvent(err);
        NxMemory.registerData(dataUrl, 404);
        this.#errMsgs.push("No response");
        throw 404;
      });
  }

  logEvent(msg) {
    if (this.#opts.debug) {
      console.log(msg);
    }
  }
  
getSrcData(dataUrl) {
    var data = NxMemory.getStoredData(dataUrl);
    if (data !== null) {
      if (Number.isInteger(data)) {
        return Promise.reject(data);
      }
      return Promise.resolve(data);
    }
    return this.#loadSrcFile(dataUrl);
  }

  loadAppCss(url = null, marker = ".nexus") {
    if (!url) {
      url = this.#opts.style;
    }
    return loadCss(marker, url, this.#shadow)
      .then(() => {
        this.#loadedCss[url] = true;
        return true;
      })
      .catch((err) => {
        this.logEvent(err);
        this.#errMsgs.push("Theme not found");
        this.#loadedCss[url] = false;
        throw 404;
      });
  }


  getErrMsgs() {
    return this.#errMsgs;
  }

 
  isCssLoaded(url = null) {
    if (!url) {
        url = this.#opts.style;
      }
    return this.#loadedCss[url];
  }

  getHost() {
    return this.#nexusContainer;
  }

  opt(key) {
    return this.#opts[key];
  }
}


export var NxInstance = new Instance();