import { splitFlap } from "../libr/Valva/Valva.js";
import { getErr } from "../core/logs/NxLog.js";
import { isCssLoaded } from "../core/load/NxStyle.js";
import { getCurrentState, registerUpdateEvt } from "../core/state/NxUpdate.js";
import { registerTranslElm, triggerTranslate } from "../core/transl/NxElmTranslate.js";
import { getTxt, getAvailableLangs, getLang } from "../core/transl/NxCoreTranslate.js";
import { appUrl } from "../core/validt/NxSpecs.js";


function resolveThreadName(state) {
  var threadName = "/";
  if (state.threadId && state.threadId != "/") {
    threadName = state.srcData.threads[state.threadIndex].name;
  }
  return threadName;
}


function toggleOnDisplay(viewlk, givenState, newState) {
  if (newState.dataUrl && givenState.dataUrl == newState.dataUrl && givenState.threadId == newState.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}


export function getElm(tag, classList) {
  var elm = document.createElement(tag);
  if (classList) {
    elm.className = classList;
  }
  return elm;
}


export function instanceWrap(headerElms, mainElms, footerElms = [], service = 'viewer') {
  var wrap = getElm("DIV", "nx-instance nx-"+service);
  var header = getElm("HEADER");
  header.append(...headerElms);
  var main = getElm("MAIN");
  main.append(...mainElms);
  wrap.append(header, main);
  if(footerElms.length){
    var footer = getElm("FOOTER");
    footer.append(...footerElms);
    wrap.append(footer);
  }
  return wrap;
}

export function blockWrap(
  blockName,
  headerElms = null,
  contentElms = null,
  landmark = false
) {
  var dv = getElm("SECTION", "nx-" + blockName + "  nx-block");
  if (landmark) {
    dv.append(landmarkElm(blockName));
  }
  if (headerElms) {
    var header = getElm("HEADER");
    header.append(...headerElms);
    dv.append(header);
  }
  if (contentElms) {
    dv.append(...contentElms);
  }
  return dv;
}

export function landmarkElm(name) {
  var lndmrk = getElm("SPAN", "nx-landmark nx-landmark-" + name);
  lndmrk.textContent = getTxt(name);
registerTranslElm(lndmrk, name);
  return lndmrk;
}

export function errorPrgr() {

    var errMsgs = getErr();
    if(!errMsgs.length){
      errMsgs = ["Init failed"];
    }
  var p = getElm("P");
  if (isCssLoaded()) {
    p.className = "nx-error";
  } else {
    p.style.margin = "0 auto";
    p.style.fontFamily = '"Courier New", Courier, monospace';
    p.style.fontSize = "13px";
  }

    var br = getElm('BR');
    var sp1 = getElm("SPAN");
    sp1.textContent = "—/ — ";
    p.append(sp1, br);
    errMsgs.forEach((msg) => {
      var spx = getElm("SPAN");
      spx.textContent = getTxt(msg);
    registerTranslElm(spx, msg);
      p.append(spx, br.cloneNode());
    });
  
  return p;
}


export function toggleNavEnd(map) {

  if (map.position > 0) {
    map.ctrls["prev"].elm.classList.remove("nx-nav-end");
  } else {
    map.ctrls["prev"].elm.classList.add("nx-nav-end");
  }
  if (map.position < map.count-1) {
    map.ctrls["next"].elm.classList.remove("nx-nav-end");
  } else {
    map.ctrls["next"].elm.classList.add("nx-nav-end");
  }
}


export function setHistoryControls(map, triggerCallback){
  Object.keys(map.ctrls).forEach((ctrl) => {
    map.ctrls[ctrl].elm = getElm("A", "nx-nav-end");
    map.ctrls[ctrl].elm.textContent = map.ctrls[ctrl].symbol;
    map.ctrls[ctrl].elm.addEventListener("click", function () {
      if (!map.ctrls[ctrl].elm.classList.contains("nx-nav-end")) {
        if (ctrl == "next") {
          map.position++;
        } else {
          map.position--;
        }
        triggerCallback(ctrl);
        toggleNavEnd(map);
      }
    });
  });
}

export function selectDropDown(list, toggleElm, actionCallback = null, switchClass = null){
  var selectedClass = "nx-selected";
  toggleElm.classList.add('nx-select-toggle');
  var isInput = toggleElm.tagName == 'INPUT';
  var firstValue;
  if(isInput){
    toggleElm.setAttribute("autocomplete","off");
    firstValue = toggleElm.value;
  } else {
    firstValue = toggleElm.textContent;
  }


  var drp = getElm("UL", "nx-select-list");
  list.forEach((itm) => {

    var li = getElm("LI");
    li.textContent = itm;
    li.dataset.item = itm;
    if (itm == firstValue) {
      li.classList.add(selectedClass);
    }
    li.addEventListener("click", () => {
      
      if(!li.classList.contains(selectedClass)){
        var nitm = li.textContent;
        var prev = drp.querySelector("." + selectedClass);
        if(prev){
          prev.classList.remove(selectedClass);
        }
       
        li.classList.add(selectedClass);

        if(isInput){
         toggleElm.value = nitm;
        } else {
        toggleElm.textContent = nitm;
        }
        if (typeof actionCallback === "function") {
          actionCallback(nitm);
        }
       
drp.style.display = "none";
      }
       
    });

    drp.append(li);
  });
  drp.style.display = "none";

  var swtch = getElm("DIV", "nx-select");
  if(switchClass){
    swtch.classList.add(switchClass);
  }
  swtch.append(toggleElm, drp);

  toggleElm.addEventListener("click", () => {
    var styl = "none";
    if (drp.style.display == styl) {
      styl = "block";
    }
    drp.style.display = styl;
  });

  return swtch;
}


export function setToggleOnDisplay(viewlk, state) {
 
  toggleOnDisplay(viewlk, state, getCurrentState());
 registerUpdateEvt(function (newState) {
    toggleOnDisplay(viewlk, state, newState);
  });
}

export function baseViewLink(state, update = false) {
  var viewlk = getElm("A", "nx-view-link");
  viewlk.append(threadNameElm(state, update));
  return viewlk;
}

export function threadNameElm(state, update = false) {
  var sp = getElm("SPAN", "nx-thread-name");
  sp.textContent = resolveThreadName(state);
  if (update) {
    registerUpdateEvt(function (newState) {
      var newThreadName = resolveThreadName(newState);
      splitFlap(sp, newThreadName, 15);
    });
  }

  return sp;
}

export function appBlock() {
  return blockWrap("app", null, [appLink(), langDropDown()], false);
}

export function appLink() {
  var link = getElm("A", "nx-app-link nx-external-link");
  link.target = "_blank";
  link.href = appUrl;
  link.title = "Nexus";
  link.textContent = "Nexus";
  return link;
}

export function langDropDown() {
  var toggle = getElm('P');
  toggle.textContent = getLang();
  return selectDropDown(getAvailableLangs(), toggle, function(nlang){
    triggerTranslate(nlang);
  }, "nx-lang-switch");
}

export function viewerInstance(state){
  var indexPart = getElm("DIV");
  indexPart.append(indexBlock(state));
  var threadPart = getElm("DIV");
  threadPart.append(...threadBlocks(state));
  
  return instanceWrap([appBlock(), historyBlock(state)], [
   indexPart,
   threadPart
   ], [sourceBlock(state)]);
}