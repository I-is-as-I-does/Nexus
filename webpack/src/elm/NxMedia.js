import { conciseUrl, oembedHtml, oembedLink } from "../lib/Jack/Trades/Web.js";
import NxViewer from "./../NxViewer.js";
import {
  easeOut,
  insertDiversion,
  replaceDiversion,
} from "../lib/Valva/Valva.js";
import { threadTextElm } from "./NxThread.js";

export function mediaElm(thread) {
  var mediadiv = document.createElement("DIV");
  mediadiv.classList.add("nx-record-media");
  mediadiv.append(threadMediaWrap(thread), threadMediaCaption(thread));

  return mediadiv;
}

export function threadMediaCaption(thread) {
  return threadTextElm(thread, ["record", "media", "caption"]);
}

export function threadMediaWrap(thread) {
  var mediaWrap = document.createElement("DIV");
  if (thread && thread.record.media.type) {
    mediaPromise(mediaWrap, thread.record.media.type, thread.record.media.url);
  }

  NxViewer.registerUpdateEvt(function (e) {
    mediaWrapUpdate(mediaWrap, e.dataSrc, e.threadId);
  });

  return mediaWrap;
}

export function mediaWrapUpdate(mediaWrap, dataSrc, threadId) {
  var prev = mediaWrap.firstChild;
  if (threadId == "/") {
    if (prev) {
      mediaWrap.className = "";
      easeOut(
        prev,
        function () {
          mediaWrap.removeChild(prev);
        },
        200
      );
    }
  } else {
    var threadMedia = NxViewer.threadData(dataSrc, threadId).record.media;
    if (threadMedia.type) {
      mediaPromise(mediaWrap, threadMedia.type, threadMedia.url, prev);
    }
  }
}

export function mediaPromise(mediaWrap, type, url, prev = null) {
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
    oembedHtml(oembedLink(url, type, 360))
      .then((html) => {
        var wrap = document.createElement("DIV");
        wrap.insertAdjacentHTML("afterbegin", html);
        callback(wrap);
      })
      .catch((err) => {
        NxViewer.logEvent(err);
        callback(brokenMediaElm(url));
      });
  }
}

export function brokenMediaElm(url) {
  var dv = document.createElement("DIV");
  dv.classList.add("nx-boken-media");
  dv.append(threadMediaLink(url));
  return dv;
}

export function threadMediaLink(url) {
  var a = document.createElement("A");
  a.classList.add("nx-external-link");
  a.target = "_blank";
  a.href = url;
  a.textContent = conciseUrl(url, true);
  return a;
}

export function pageElm(url) {
  var elm = document.createElement("A");
  elm.classList.add("nx-external-link");
  elm.href = url;
  elm.target = "_blank";
  elm.textContent = conciseUrl(url, true);
  return elm;
}

export function videoElm(url) {
  var elm = document.createElement("VIDEO");
  elm.setAttribute("controls", true);
  var source = document.createElement("SOURCE");
  source.src = url;
  elm.append(source);
  source.onerror = () => {
    replaceDiversion(elm, brokenMediaElm(url));
  };
  return elm;
}

export function audioElm(url) {
  var elm = document.createElement("AUDIO");
  elm.setAttribute("controls", true);
  elm.src = url;
  elm.onerror = () => {
    replaceDiversion(elm, brokenMediaElm(url));
  };
  return elm;
}

export function imageElm(url) {
  var elm = document.createElement("IMG");
  elm.src = url;
  elm.onerror = () => {
    replaceDiversion(elm, brokenMediaElm(url));
  };
  return elm;
}
