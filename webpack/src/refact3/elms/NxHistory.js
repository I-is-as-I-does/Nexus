import { easeIn, easeOut, insertDiversion } from "../../libr/Valva/Valva.js";
import { NxState } from "../NxState.js";
import { blockWrap, getElm, setHistoryControls, toggleNavEnd,setToggleOnDisplay,
  baseViewLink } from "./NxMeta.js";
import {
  authorIndexLink,
  authorUrl
} from "./NxIdent.js";

const historyMax = 100;
var isHistoryEvent = false;
var historyList = null;
var historyElm = null;

var historyState = {
  dataUrl: null,
  srcData: null,
  threadId: "/",
  threadIndex: -1
};

var histCtrls = {
  "ctrls":{
    "prev": {"symbol":"<", "elm":null},
    "next": {"symbol":">", "elm":null}
  },

   position:1,
   count:1
 }


function historyNav() {
  var wrp = getElm("DIV", "nx-history-nav");
  setHistoryControls(histCtrls, function(position){
    var target =
    historyList.children[position].querySelector(
      ".nx-thread-name"
    );
  target.click();
  });
  wrp.append(histCtrls.ctrls["prev"].elm,historyToggleElm(),histCtrls.ctrls["next"].elm);
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
  if (!isHistoryEvent && (state.dataUrl != historyState.dataUrl || state.threadId != historyState.threadId)) {
    historyState = state;
    if (histCtrls.count > historyMax) {
      historyList.children[1].remove();
      histCtrls.count--;
    }
    histCtrls.position = histCtrls.count;
    var itm = historyItm(state);

    insertDiversion(historyList, itm, false, true, 200, function () {
      autoScroll();
    });

    toggleNavEnd(histCtrls);
  }
}

function viewElms(state){
return [authorIndexLink(state, false),
  authorUrl(state, false),
  historyViewLink(state, false)];
}

function historyItm(state) {
  histCtrls.count++;
  var itm = document.createElement("LI");
    itm.append(...viewElms(state));
  return itm;
}

function historyViewLink(state) {
  var viewlk = baseViewLink(state, false);
  setToggleOnDisplay(viewlk, state);

  viewlk.addEventListener("click", () => {
    isHistoryEvent = true;
    NxState.triggerUpdate(state, true);
    isHistoryEvent = false;
  });
  return viewlk;
}


export function historyBlock(state) {
  setHistoryListElm(state);
  return blockWrap("history", null, [historyNav(), historyElm], false);
}
