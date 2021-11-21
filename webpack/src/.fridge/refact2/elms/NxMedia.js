import { conciseUrl, oembedIframe, oembedLink } from "../libr/Jack/Web.js";
import {
  insertDiversion,
  replaceDiversion,
} from "../libr/Valva/Valva.js";
import { threadTextElm } from "./NxThread.js";
import { logEvent } from "../procs/NxInstance.js";
import { getElm } from "./NxMeta.js";

var mediaWrap;


function threadMediaCaption(threadData) {
  return threadTextElm(threadData, ["record", "media", "caption"]);
}

function setThreadMedia(threadData) {
 
  if (threadData && threadData.record.media.type) {
    mediaPromise(
      threadData.record.media.type,
      threadData.record.media.url
    );
  }
}


function mediaPromise(type, url, prev = null) {
  var map = {
    page: pageElm,
    image: imageElm,
    video: videoElm,
    audio: audioElm,
  };

  var callback = function (elm) {
    mediaWrap.className = "nx-" + type + "-media";
    if (prev) {
      replaceDiversion(prev, elm);
    } else {
      insertDiversion(mediaWrap, elm, false, true, 200);
    }
  };

  if (map.hasOwnProperty(type)) {
    callback(map[type](url));
  } else {
    oembedIframe(oembedLink(url, type, 360))
      .then((iframe) => {
        callback(iframe);
      })
      .catch((err) => {
        logEvent(err);
        callback(brokenMediaElm(url));
      });
  }
}

function brokenMediaElm(url) {
  var dv = getElm("DIV", "nx-boken-media");
  dv.append(threadMediaLink(url));
  return dv;
}

function threadMediaLink(url) {
  var a = getElm("A", "nx-external-link");
  a.target = "_blank";
  a.href = url;
  a.textContent = conciseUrl(url, true);
  return a;
}

function pageElm(url) {
  var elm = getElm("A", "nx-external-link");
  elm.href = url;
  elm.target = "_blank";
  elm.textContent = conciseUrl(url, true);
  return elm;
}

function videoElm(url) {
  var elm = getElm("VIDEO");
  elm.setAttribute("controls", true);
  var source = getElm("SOURCE");
  source.src = url;
  elm.append(source);
  source.onerror = () => {
    replaceDiversion(elm, brokenMediaElm(url));
  };
  return elm;
}

function audioElm(url) {
  var elm = getElm("AUDIO");
  elm.setAttribute("controls", true);
  elm.src = url;
  elm.onerror = () => {
    replaceDiversion(elm, brokenMediaElm(url));
  };
  return elm;
}

function imageElm(url) {
  var elm = getElm("IMG");
  elm.src = url;
  elm.onerror = () => {
    replaceDiversion(elm, brokenMediaElm(url));
  };
  return elm;
}

export function mediaElm(threadData) {
  var mediadiv = getElm("DIV", "nx-record-media");
  mediaWrap = getElm("DIV");
  setThreadMedia(threadData);
  mediadiv.append(mediaWrap, threadMediaCaption(threadData));

  return mediadiv;
}
