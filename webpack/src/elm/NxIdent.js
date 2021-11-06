import { splitFlap } from "../lib/Valva/Valva.js";
import NxThalamus from "./../NxThalamus.js";

export function authorHandle(dataSrc, update = false) {
  var hnd = document.createElement("SPAN");
  hnd.classList.add("nx-handle");
  hnd.textContent = NxThalamus.srcData(dataSrc).author.handle;
  if (update) {
    NxThalamus.registerUpdateEvt(function (e) {
      splitFlap(hnd, NxThalamus.srcData(e.dataSrc).author.handle, 20);
    }, true);
  }
  return hnd;
}

export function authorUrl(dataSrc, update = false) {
  var authorData = NxThalamus.srcData(dataSrc).author;

  var authorlk = document.createElement("A");
  authorlk.classList.add("nx-author-url", "nx-external-link");
  authorlk.target = "_blank";
  authorlk.href = authorData.url;

  var urlBrck = [];
  ["[", "]"].forEach((bracket) => {
    var brsp = document.createElement("SPAN");
    brsp.classList.add("nx-author-url-brackets");
    brsp.textContent = bracket;
    urlBrck.push(brsp);
  });
  var urlsp = document.createElement("SPAN");
  urlsp.textContent = authorData.miniUrl;

  authorlk.append(urlBrck[0], urlsp, urlBrck[1]);

  if (update) {
    NxThalamus.registerUpdateEvt(function (e) {
      var nwAuthorData = NxThalamus.srcData(e.dataSrc).author;
      authorlk.href = nwAuthorData.url;
      splitFlap(urlsp, nwAuthorData.miniUrl, 20);
    }, true);
  }
  return authorlk;
}

export function threadName(dataSrc, threadId, update = false) {
  var sp = document.createElement("SPAN");
  sp.classList.add("nx-thread-name");
  var name = "/";
  if (threadId != "/") {
    name = NxThalamus.threadData(dataSrc, threadId).name;
  }
  sp.textContent = name;
  if (update) {
    NxThalamus.registerUpdateEvt(function (e) {
      var nThreadName = "/";
      if (e.threadId != "/") {
        nThreadName = NxThalamus.threadData(e.dataSrc, e.threadId).name;
      }

      splitFlap(sp, nThreadName, 15);
    });
  }

  return sp;
}

export function unseenTag() {
  var sp = document.createElement("SPAN");
  sp.classList.add("nx-new-tag");
  return sp;
}
export function toggleUnseen(viewlk, dataSrc, threadId) {
  if (viewlk.classList.contains("nx-on-display")) {
    viewlk.classList.remove("nx-unseen");
    viewlk.lastChild.textContent = "";
  } else if (NxThalamus.isThreadRecordUnseen(dataSrc, threadId)) {
    viewlk.classList.add("nx-unseen");
    viewlk.lastChild.textContent = "*";
  }
}

export function toggleStatus(viewlk, dataSrc, threadId) {
  toggleOnDisplay(viewlk, dataSrc, threadId);
  toggleUnseen(viewlk, dataSrc, threadId);
}

export function toggleOnDisplay(viewlk, dataSrc, threadId) {
  if (
    dataSrc == NxThalamus.current.dataSrc &&
    threadId == NxThalamus.current.threadId
  ) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}

export function historyViewLink(dataSrc, threadId) {
  var viewlk = baseViewLink(dataSrc, threadId, false);

  toggleOnDisplay(viewlk, dataSrc, threadId);
  NxThalamus.registerUpdateEvt(function () {
    toggleOnDisplay(viewlk, dataSrc, threadId);
  });

  viewlk.addEventListener("click", () => {
    NxThalamus.triggerUpdate(dataSrc, threadId, true);
  });
  return viewlk;
}
export function baseViewLink(dataSrc, threadId, update) {
  var viewlk = document.createElement("A");
  viewlk.classList.add("nx-view-link");
  viewlk.append(threadName(dataSrc, threadId, update));
  return viewlk;
}

export function viewLink(dataSrc, threadId, update = false) {
  var viewlk = baseViewLink(dataSrc, threadId, update);
  if (threadId != "/") {
    viewlk.append(unseenTag());
    toggleStatus(viewlk, dataSrc, threadId);
    NxThalamus.registerUpdateEvt(function () {
      toggleStatus(viewlk, dataSrc, threadId);
    });
  }

  viewlk.addEventListener("click", () => {
    NxThalamus.triggerUpdate(dataSrc, threadId);
  });
  return viewlk;
}

export function authorIndexLink(dataSrc, update = false) {
  var auth = document.createElement("A");
  auth.classList.add("nx-author-link");
  auth.append(authorHandle(dataSrc, update));

  auth.addEventListener("click", function () {
    NxThalamus.triggerUpdate(dataSrc, "/");
  });

  return auth;
}