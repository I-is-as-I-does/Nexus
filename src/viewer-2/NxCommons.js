/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { splitFlap } from "../libr/Valva/Valva.js";
import { getErr } from "../core/logs/NxLog.js";
import { isCssLoaded } from "../core/load/NxStyle.js";
import { getCurrentState, registerUpdateEvt } from "../core/state/NxUpdate.js";
import { registerTranslElm } from "../core/transl/NxElmTranslate.js";
import { getTxt } from "../core/transl/NxCoreTranslate.js";
import { appUrl } from "../core/validt/NxSpecs.js";

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

export function blockWrap(
  blockName,
  contentElms = null
) {
  var dv = getElm("DIV", "nx-" + blockName + " nx-block");
  if (contentElms) {
    dv.append(...contentElms);
  }
  return dv;
}