import { easeIn, easeOut, insertDiversion } from "../../libr/Valva/Valva.js";
import { NxState } from "../NxState.js";
import { blockWrap, getElm } from "./NxMeta.js";
import {
  authorIndexLink,
  authorUrl,
  baseViewLink,
  setToggleOnDisplay,
} from "./NxIdent.js";
import { NxTranslate } from "../NxTranslate.js";

const historyMax = 100;
var isHistoryEvent = false;
var historyList = null;
var historyElm = null;
var historyCount = 1;
var historyPosition = 1;
var navArrows = {
  "prev": {"symbol":"<", "elm":null},
   "next": {"symbol":">", "elm":null},
 }
var editMode = false;

function historyNav() {
  var wrp = getElm("DIV", "nx-history-nav");
  Object.keys(navArrows).forEach((pos) => {
    navArrows[pos].elm = getElm("A", "nx-nav-end");
    navArrows[pos].elm.textContent = navArrows[pos].symbol;
    navArrows[pos].elm.addEventListener("click", function () {
      if (!navArrows[pos].elm.classList.contains("nx-nav-end")) {
        if (pos == "prev") {
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
  wrp.append(navArrows["prev"].elm,historyToggleElm(),navArrows["next"].elm);
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
  NxState.registerUpdateEvt(function (newState) {
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
    navArrows["prev"].elm.classList.remove("nx-nav-end");
  } else {
    navArrows["prev"].elm.classList.add("nx-nav-end");
  }
  if (historyPosition < historyCount - 1) {
    navArrows["next"].elm.classList.remove("nx-nav-end");
  } else {
    navArrows["next"].elm.classList.add("nx-nav-end");
  }
}

function viewElms(state){
return [authorIndexLink(state, false),
  authorUrl(state, false),
  historyViewLink(state, false)];
}

function editElms(state){
  var link = historyViewLink(state, false);
  var sp = getElm('SPAN', "nx-edit-event");
  sp.textContent = NxTranslate.getTxt(state.lastEvent); 
  NxState.registerTranslElm(sp, state.lastEvent);
  link.prepend(sp);
  return [link];
}

function historyItm(state) {
  historyCount++;
  var itm = document.createElement("LI");
  if(!editMode){
    itm.append(...viewElms(state));
  } else {
 itm.append(...editElms(state));
  }
  return itm;
}

function historyViewLink(state) {
  var viewlk = baseViewLink(state, false);
  setToggleOnDisplay(viewlk, state);

  viewlk.addEventListener("click", () => {
    isHistoryEvent = true;
    NxState.triggerUpdate(state, true);
  });
  return viewlk;
}

function setEditMode(){
  navArrows.prev.symbol = "↶";
  navArrows.next.symbol = "↷";
  editMode = true;
}

export function historyBlock(state, editionHistory = false) {
  if(editionHistory){
    setEditMode();
  }
  setHistoryListElm(state);
  return blockWrap("history", null, [historyNav(navArrows), historyElm], false);
}
