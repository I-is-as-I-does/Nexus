import { easeIn, easeOut, insertDiversion } from "../lib/Valva/Valva.js";
import NxThalamus from "../NxThalamus.js";
import { blockWrap } from "./NxMeta.js";
import { authorIndexLink, authorUrl, historyViewLink } from "./NxIdent.js";

export var historyList = null;

export var historyCount = 1;
export var historyPosition = 1;
export var historyNavArrow = {
  "<": null,
  ">": null,
};

export const historyMax = 10;

export function historyBlock(dataSrc, threadId) {
  var historyElm = historyListElm(dataSrc, threadId);
  return blockWrap(
    "history",
    null,
    [historyNav(historyElm), historyElm],
    false
  );
}

export var appendObserver;
export function newAppendObserver() {
  var appendCallback = function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type == "childList") {
        historyList.scrollIntoView({
          block: "end",
          behavior: "smooth",
        });
        return;
      }
    }
  };
  return new MutationObserver(appendCallback);
}

export function historyNav(historyElm) {
  var wrp = document.createElement("DIV");
  wrp.classList.add("nx-history-nav");
  Object.keys(historyNavArrow).forEach((arrw) => {
    historyNavArrow[arrw] = document.createElement("A");
    historyNavArrow[arrw].classList.add("nx-nav-end");
    historyNavArrow[arrw].textContent = arrw;
    historyNavArrow[arrw].addEventListener("click", function () {
      if (!historyNavArrow[arrw].classList.contains("nx-nav-end")) {
        if (arrw == "<") {
          historyPosition--;
        } else {
          historyPosition++;
        }

        toggleNavEnd();

        var target =
          historyList.children[historyPosition].querySelector(
            ".nx-thread-name"
          );
        target.click();
      }
    });
  });
  wrp.append(
    historyNavArrow["<"],
    historyToggleElm(historyElm),
    historyNavArrow[">"]
  );
  return wrp;
}
export function historyToggleElm(historyElm) {
  var tggl = document.createElement("A");
  tggl.classList.add("nx-history-toggle");
  tggl.textContent = "≚";
  tggl.addEventListener("click", () => {
    if (tggl.textContent == "≙") {
      tggl.textContent = "≚";
      tggl.classList.remove("nx-active");
      easeOut(historyElm, 200);
    } else {
      tggl.textContent = "≙";
      tggl.classList.add("nx-active");
      easeIn(historyElm, 200);
      autoScroll();
    }
  });
  return tggl;
}

export function historyListElm(dataSrc, threadId) {
  historyList = document.createElement("UL");
  historyList.classList.add("nx-history-list");
  var first = document.createElement("LI");
  first.textContent = "...";
  historyList.append(first);
  historyList.append(historyItm(dataSrc, threadId));

  var dv = document.createElement("DIV");
  dv.classList.add("nx-history-drawer");
  dv.append(historyList);
  dv.style.display = "none";
  NxThalamus.registerUpdateEvt(function (e) {
    historyEvent(e);
  });
  return dv;
}

export function autoScroll(){
  historyList.scrollIntoView({
    block: "end",
    behavior: "smooth",
  });
}

export function historyEvent(e) {
  if (!NxThalamus.isHistoryEvent) {
    if (historyCount > historyMax) {
      historyList.children[1].remove();
      historyCount--;
    }
    historyPosition = historyCount;
    var itm = historyItm(e.dataSrc, e.threadId);

    insertDiversion(historyList, itm, false, true, 200, function () {
      autoScroll();
    });

    toggleNavEnd();
  }
}

export function toggleNavEnd() {
  if (historyPosition > 1) {
    historyNavArrow["<"].classList.remove("nx-nav-end");
  } else {
    historyNavArrow["<"].classList.add("nx-nav-end");
  }
  if (historyPosition < historyCount - 1) {
    historyNavArrow[">"].classList.remove("nx-nav-end");
  } else {
    historyNavArrow[">"].classList.add("nx-nav-end");
  }
}

export function historyItm(dataSrc, threadId) {
  historyCount++;
  var itm = document.createElement("LI");
  itm.append(
    authorIndexLink(dataSrc, false),
    authorUrl(dataSrc, false),
    historyViewLink(dataSrc, threadId, false)
  );
  return itm;
}
