
import { isCssLoaded } from "@i-is-as-i-does/nexus-core/src/load/NxStyle.js";
import { getCurrentState, registerUpdateEvt } from "./NxState.js";
import { registerTranslElm, triggerTranslate } from "@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js";
import { getAvailableLangs, getLang, getTxt } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js";
import { appUrl } from "@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js";
import { splitOnLineBreaks } from "@i-is-as-i-does/jack-js/src/modules/Help.js";
import { splitFlap } from "@i-is-as-i-does/valva/src/legacy/Valva-v1.js";

function resolveThreadTitle(state) {
  var threadTitle = "/";
  if (state && Object.prototype.hasOwnProperty.call(state, 'threadIndex') && state.threadIndex !== -1) {
    threadTitle = state.srcData.threads[state.threadIndex].title;
  }
  return threadTitle;
}


function toggleOnDisplay(viewlk, givenState, newState) {
  if (newState.dataUrl && givenState.dataUrl === newState.dataUrl && givenState.threadId == newState.threadId) {
    viewlk.classList.add("nx-on-display");
  } else {
    viewlk.classList.remove("nx-on-display");
  }
}

function langDropDown() {
  var toggle = getElm('P');
  toggle.textContent = getLang()
  return selectDropDown(getAvailableLangs(), toggle, function(nlang){
    triggerTranslate(nlang);
  }, "nx-lang-switch");
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



export function appHeader() {
  var header = getElm('HEADER');
  header.append(appLink());
  return header;
}

export function appHeaderWithLang() {
  var header = appHeader()
  header.append(langDropDown());
  return header;
}


export function getElm(tag, classList) {
  var elm = document.createElement(tag);
  if (classList) {
    elm.className = classList; 
  }
  return elm;
}

export function instanceWrap(appHeader, serviceElms){
  var inst = getElm("DIV", "nx-instance");
  inst.append(appHeader, appMain(serviceElms));
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

export function blockWrap(
  blockName,
  contentElms = null,
  landmark = false
) {
  var dv = getElm("DIV", "nx-" + blockName + " nx-block");
  if (landmark) {
    dv.append(landmark);
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

  var p = getElm("P");
  if (isCssLoaded()) {
    p.className = "nx-error";
  } else {
    p.style.margin = "0 auto";
    p.style.fontFamily = '"Courier New", Courier, monospace';
    p.style.fontSize = "13px";
  }

    p.textContent = "—/ — ";
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


export function setHistoryControls(map, triggerCallback, imgAsSymbol = false){
  Object.keys(map.ctrls).forEach((ctrl) => {
    map.ctrls[ctrl].elm = getElm("A", "nx-nav-ctrl nx-nav-end");
    if(imgAsSymbol){
      map.ctrls[ctrl].elm.append(iconImage(map.ctrls[ctrl].symbol))
    } else {
      map.ctrls[ctrl].elm.textContent = map.ctrls[ctrl].symbol;
    }  
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

export function iconImage(b64, size = 20){
  
  var ic = new Image(size, size)
  ic.className = 'nx-icon'
  ic.src = b64
  return ic
}