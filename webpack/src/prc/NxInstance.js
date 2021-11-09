import { loadCss, loadJson, miniUrl } from "../lib/Jack/Trades/Web.js";
import { opt, setContents } from "./NxHost.js";
import { getStoredData, registerData } from "./NxMemory.js";
import { getLogs, validMap } from "../valid/NxStamper.js";
import { getTxt, setOriginLang } from "./NxTranslate.js";

var errMsg = null;


function handleErr(err) {
  logEvent(err);
  if (!errMsg) {
    errMsg = "init failed";
  }
  setContents(errorLine(errMsg));
}

function resolveData(dataUrl) {
  var data = getStoredData(dataUrl);
  if (data !== false) {
    if (Number.isInteger(data)) {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  }
  return loadSrcFile(dataUrl).catch((err) => {
    logEvent(err);
    registerData(dataUrl, 404);
    errMsg = "no response";
  });
}

function setDataHelpers(data) {
  data.index = [];

  data.threads.map((it) => {
    data.index.push(it.id);
  });

  data.author.miniUrl = miniUrl(data.author.url);
}

function loadSrcFile(dataUrl) {
  return loadJson(dataUrl).then((data) => {
    data = validMap(data);
    if (data) {
      setDataHelpers(data);
      registerData(dataUrl, data);
      return data;
    }
    registerData(dataUrl, 400);
    logEvent(getLogs());
    errMsg = "invalid data";
    throw 400;
  });
}

function errorLine(errMsg) {
  var p = document.createElement("P");
  p.classList.add("nx-error");
  var sp1 = document.createElement("SPAN");
  sp1.textContent = "—/ — ";
  var sp2 = document.createElement("SPAN");
  sp2.textContent = getTxt(errMsg);
  p.append(sp1, sp2);
  return p;
}

function setCookiePl(){
  document.cookie = "Nx=Instance; SameSite=None; Secure";
}


export function resolveOriginState() {
  setCookiePl();
  
  if (opt("lang")) {
    setOriginLang(opt("lang"));
  }
  var promise;

  if (opt("src")) {
    promise = loadAppCss().then(() =>
      resolveState(opt("src"), opt("id"))
    );
  } else {
    promise = Promise.reject(422);
  }
  return promise.catch((err) => {
    handleErr(err);
  });
}

export function logEvent(msg) {
  if (opt("log") !== false) {
    console.log(msg);
  }
}

export function resolveState(dataUrl, threadId) {
  return resolveData(dataUrl).then((data) => {
    var state = {
      dataUrl: dataUrl,
      threadId: threadId,
      srcData: data,
      threadIndex: data.index.indexOf(threadId),
    };

    if (state.threadIndex === -1 && threadId !== "/") {
      state.threadId = "/";
    }
    return state;
  });
}
export function loadAppCss(url = null) {
  if(!url){
    url = opt('style');
  }
  var root = null;
  if (opt('embed')) {
    root = container;
  }
  return loadCss(".nexus", url, root).catch((err) => {
    logEvent(err);
    errMsg = "theme not found";
  });
}
