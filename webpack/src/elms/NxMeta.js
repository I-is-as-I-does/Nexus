import { splitFlap } from "../libr/Valva/Valva.js";
import { getErr } from "../logs/NxLog.js";
import { isCssLoaded } from "../load/NxStyle.js";
import { getCurrentState, registerUpdateEvt } from "../state/NxUpdate.js";
import { registerTranslElm } from "../transl/NxElmTranslate.js";
import { getTxt } from "../transl/NxCoreTranslate.js";


export function getElm(tag, classList) {
  var elm = document.createElement(tag);
  if (classList) {
    elm.className = classList;
  }
  return elm;
}


export function instanceWrap(headerElms, mainElms, footerElms) {
  var wrap = getElm("DIV", "nx-instance");
  var header = getElm("HEADER");
  header.append(...headerElms);
  var main = getElm("MAIN");
  main.append(...mainElms);
  var footer = getElm("FOOTER");
  footer.append(...footerElms);
  wrap.append(header, main, footer);
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
  
        prev.classList.remove(selectedClass);
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

function toggleOnDisplay(viewlk, givenState, newState) {
  if (newState.dataUrl && givenState.dataUrl == newState.dataUrl && givenState.threadId == newState.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
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

function resolveThreadName(state) {
  var threadName = "/";
  if (state.threadId && state.threadId != "/") {
    threadName = state.srcData.threads[state.threadIndex].name;
  }
  return threadName;
}