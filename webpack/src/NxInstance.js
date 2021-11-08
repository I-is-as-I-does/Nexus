import { loadCss } from "./lib/Jack/Trades/Web.js";
import { container, opts } from "./NxHost.js";
import { resolveThreadIndex } from "./NxMemory.js";
import { getLogs } from "./NxStamper.js";
import { getTxt, setOriginLang } from "./NxTranslate";

var errMsg = null;

function initPromise() {
  return loadAppCss(opts.style)
    .then(() => resolveData(opts.src)).then((data)=>{
      var threadIndex = resolveThreadIndex(data, opts.id); 
    if (threadIndex == -1) {
        opts.id = '/';
    }
    return data;
    })
}

function logEvent(msg) {
  if (opts.log) {
    console.log(msg);
  }
}

function loadAppCss() {
  var root = null;
  if (opts.embed) {
    root = container;
  }
  return loadCss(".nexus", opts.style, root).catch((err) => {
    logEvent(err);
    errMsg = "theme not found";
  });
}

function handleErr(err) {
  if (!errMsg) {
    if (err === 400) {
      logEvent(getLogs());
      errMsg = "invalid data";
    } else if (err === 404) {
      errMsg = "no response";
    } else {
      errMsg = "init failed";
    }
  }
  container.append("Nexus | " + getTxt(errMsg));
}

export function resolveOrigin() {
  if (opts.lang) {
    setOriginLang(opts.lang);
  }
  var promise;
  if (opts.src) {
    promise = initPromise();
  } else {
    promise = Promise.reject(422);
  }
  return promise.catch((err) => {
    handleErr(err);
  });
}
//   this.doneLoadingEvt = new CustomEvent("Done");
