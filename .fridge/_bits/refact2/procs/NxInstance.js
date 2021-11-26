import { loadCss, isValidHttpUrl } from "../libr/Jack/Web.js";
import { isNonEmptyObj, isNonEmptyStr } from "../libr/Jack/Check.js";

import { isValidId } from "../utils/NxStamper.js";
import { setOriginLang } from "../utils/NxTranslate.js";

/*import { isNonEmptyObj, isNonEmptyStr, loadCss, isValidHttpUrl } from "../NxJackBundle.js";
import { isValidId, setOriginLang }  from "../NxUtilsBundle.js";*/


const defaultSelector = "#Nexus";
var defaultOpts = {
  src: null,
  id: "/",
  style:
    "https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus-Prototype@latest/cdn/css/NexusI.css",
  lang: "en",
};


var errMsgs = [];
var opts = defaultOpts;
var container = null;
var appStyleLoaded = false;
var debugMode = false;

document.cookie = "Nx=Instance; SameSite=None; Secure";

function setOpts(options) {
  if (isValidHttpUrl(options.src)) {
    opts.src = options.src;
    if (isValidId(options.id)) {
      opts.id = options.id;
    }
  }

  if (isValidHttpUrl(options.style)) {
    opts.style = options.style;
  }

  if (isNonEmptyStr(options.lang)) {
    opts.lang = options.lang;
  }
}
function setContainer(selector) {
  if (!selector) {
    selector = defaultSelector;
  }
  container = document.querySelector(selector);
  if (!container) {
    container = document.createElement("DIV");
    document.body.append(container);
  }
}


function loadAppCss() {
  return loadCss(".nexus", opts.style, container)
    .then(() => {
      appStyleLoaded = true;
      return true;
    })
    .catch((err) => {
      logEvent(err);
      errMsgs.push("Theme not found");
      throw 404;
    });
}


function setup(selector = null, options = null, debug = false) {
  debugMode = debug;

  if (container != null) {
    errMsgs.push("Instance already initiated");
    return false;
  }

  setContainer(selector);

  if (isNonEmptyObj(options)) {
    setOpts(options);
  } else if (container.dataset) {
    setOpts(container.dataset);
  }
  setOriginLang(opts.lang);

  container.classList.add("nexus");
  container = container.attachShadow({ mode: "open" });
  return true;
}


export function getErrMsgs() {
  return errMsgs;
}

export function logEvent(msg) {
  if (debugMode) {
    console.log(msg);
  }
}

export function addErrMsg(msg) {
  errMsgs.push(msg);
}

export function isAppStyleLoaded() {
  return appStyleLoaded;
}

export function getContainer(){
  return container;
}

export function opt(key) {
  return opts[key];
}

export function init(selector = null, options = null, debug = false){
if(setup(selector, options, debug)){
return loadAppCss();
}
return Promise.reject();
}
