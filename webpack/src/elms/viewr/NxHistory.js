import { easeIn, easeOut, insertDiversion } from "../../libr/Valva/Valva.js";
import { registerUpdateEvt, triggerUpdate } from "../../procs/NxState.js";
import { blockWrap, getElm } from "../shared/NxMeta.js";
import {
  authorIndexLink,
  authorUrl,
  baseViewLink,
  setToggleOnDisplay,
} from "../shared/NxIdent.js";

const historyMax = 100;
var isHistoryEvent = false;
var historyList = null;
var historyElm = null;
var historyCount = 1;
var historyPosition = 1;
var historyNavArrow = {
  "<": null,
  ">": null,
};

function historyNav() {
  var wrp = getElm("DIV", "nx-history-nav");
  Object.keys(historyNavArrow).forEach((arrw) => {
    historyNavArrow[arrw] = getElm("A", "nx-nav-end");
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
  wrp.append(historyNavArrow["<"], historyToggleElm(), historyNavArrow[">"]);
  return wrp;
}
function historyToggleElm() {
  var tggl = getElm("A", "nx-history-toggle");
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

function setHistoryListElm(state) {
  historyList = getElm("UL", "nx-history-list");
  var first = getElm("LI");
  first.textContent = "...";
  historyList.append(first);
  if(state.srcData){
  historyList.append(historyItm(state));
}
  historyElm = getElm("DIV", "nx-history-drawer");
  historyElm.append(historyList);
  historyElm.style.display = "none";
  registerUpdateEvt(function (newState) {
    historyEvent(newState);
  });
  return historyElm;
}

function autoScroll() {
  historyList.scrollIntoView({
    block: "end",
    behavior: "smooth",
  });
}

function historyEvent(state) {
  if (!isHistoryEvent) {
    if (historyCount > historyMax) {
      historyList.children[1].remove();
      historyCount--;
    }
    historyPosition = historyCount;
    var itm = historyItm(state);

    insertDiversion(historyList, itm, false, true, 200, function () {
      autoScroll();
    });

    toggleNavEnd();
  }
}

function toggleNavEnd() {
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

function historyItm(state) {
  historyCount++;
  var itm = document.createElement("LI");
  itm.append(
    authorIndexLink(state, false),
    authorUrl(state, false),
    historyViewLink(state, false)
  );
  return itm;
}

function historyViewLink(state) {
  var viewlk = baseViewLink(state, false);
  setToggleOnDisplay(viewlk, state);

  viewlk.addEventListener("click", () => {
    isHistoryEvent = true;
    triggerUpdate(state, true);
  });
  return viewlk;
}

export function historyBlock(state) {
  setHistoryListElm(state);
  return blockWrap("history", null, [historyNav(), historyElm], false);
}
