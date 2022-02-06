/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { getErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog.js";
import { isCssLoaded } from "@i-is-as-i-does/nexus-core/src/load/NxStyle.js";
import { getCurrentState, registerUpdateEvt } from "../browser/NxState.js";
import { registerTranslElm } from "@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js";
import { getTxt } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js";
import { appUrl } from "@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js";
import { splitOnLineBreaks } from "@i-is-as-i-does/jack-js/src/modules/Help.js";
import { splitFlap } from "@i-is-as-i-does/valva/src/legacy/Valva-v1.js";

function resolveThreadTitle(state) {
  var threadTitle = "/";
  if (state.threadId && state.threadId != "/") {
    threadTitle = state.srcData.threads[state.threadIndex].title;
  }
  return threadTitle;
}


function toggleOnDisplay(viewlk, givenState, newState) {
  if (newState.dataUrl && givenState.dataUrl == newState.dataUrl && givenState.threadId == newState.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}


function appHeader() {
  var header = getElm('HEADER');
  header.append(appLink());
  return header;
}


function appLink() {
  var link = getElm("A", "nx-app-link nx-external-link");
  link.target = "_blank";
  link.href = appUrl;
  link.title = "Nexus";
  link.textContent = "Nexus";
  return link;
}


function appMain(serviceElms){
var main = getElm('MAIN');
main.append(...serviceElms);
return main;
}

export function getElm(tag, classList) {
  var elm = document.createElement(tag);
  if (classList) {
    elm.className = classList; 
  }
  return elm;
}

export function instanceWrap(serviceElms){
  var inst = getElm("DIV", "nx-instance");
  inst.append(appHeader(), appMain(serviceElms));
  return inst;
}

export function serviceWrap
(navElms, mainElms, footerElms = [], service = 'viewer') {
  var wrap = getElm("DIV", "nx-"+service);
  var nav = getElm("NAV");
  nav.append(...navElms);
  var bd = getElm("SECTION");
  bd.append(...mainElms);
  wrap.append(nav, bd);
  if(footerElms.length){
    var footer = getElm("FOOTER");
    footer.append(...footerElms);
    wrap.append(footer);
  }
  return wrap;
}

// @todo update, no use of headers nor landmark ?
export function blockWrap(
  blockName,
  headerElms = null,
  contentElms = null,
  landmark = false
) {
  var dv = getElm("DIV", "nx-" + blockName + " nx-block");
  if (landmark) {
    dv.append(landmark);
  }
  if (headerElms) {
    var header = getElm("DIV","nx-thread-header");
    header.append(...headerElms);
    dv.append(header);
  }
  if (contentElms) {
    dv.append(...contentElms);
  }
  return dv;
}

export function landmarkElm(name) {
  var lndmrk = getElm("SPAN", "nx-landmark nx-landmark-"+name.replace(" ", "-"));
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
    map.ctrls[ctrl].elm = getElm("A", "nx-nav-ctrl nx-nav-end");
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
  
  list.forEach((itm) => {

    var li = getElm("LI");
    li.textContent = itm;
    li.dataset.item = itm;
    if (itm == firstValue) {
      li.classList.add(selectedClass);
    }
    
    drp.append(li);
    li.addEventListener("click", () => {   
      var nitm = li.textContent;
      var currVal;
      if(isInput){
        currVal = toggleElm.value;
       } else {
        currVal = toggleElm.textContent;
       }
       if(currVal != nitm){
        if(!li.classList.contains(selectedClass)){      
          var prev = drp.querySelector("." + selectedClass);
          if(prev){
            prev.classList.remove(selectedClass);
          }         
          li.classList.add(selectedClass);
        }
        if(isInput){
          toggleElm.value = nitm;
         } else {
         toggleElm.textContent = nitm;
         }
         toggleElm.dispatchEvent(new window.Event('change'));
        if (typeof actionCallback === "function") {
          actionCallback(nitm);
        }
       }

      drp.style.display = "none";
    });

  });
  drp.style.display = "none";

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
  viewlk.append(threadTitleElm(state, update));
  return viewlk;
}

export function threadTitleElm(state, update = false) {
  var sp = getElm("SPAN", "nx-thread-title");
  sp.textContent = resolveThreadTitle(state);
  if (update) {
    registerUpdateEvt(function (newState) {
      splitFlap(sp, resolveThreadTitle(newState), 15)
    });
  }

  return sp;
}


export function viewerInstance(state){
  var indexPart = getElm("DIV");
  indexPart.append(indexBlock(state));
  var threadPart = getElm("DIV");
  threadPart.append(...threadBlocks(state));
  
  return serviceWrap
([appBlock(), historyBlock(state)], [
   indexPart,
   threadPart
   ], [sourceBlock(state)]);
}

export function lines(text) {
  var dv = getElm("DIV", "nx-lines");
  if(text){   
    var sp = splitOnLineBreaks(text)
    var ln = []
    sp.forEach(l => {
      var p = getElm('P')
      p.textContent = l
      ln.push(p)
    })
    dv.append(...ln);
}
  return dv;
}
export function spinContainer() {
  var container = getElm("DIV", "nx-loading");
  return container
}