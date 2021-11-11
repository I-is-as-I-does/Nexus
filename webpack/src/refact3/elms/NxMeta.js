import { NxTranslate } from "../NxTranslate.js";
import { NxState } from "../NxState.js";
import { NxInstance } from "../NxInstance.js";


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
  lndmrk.textContent = NxTranslate.getTxt(name);
  NxState.registerTranslElm(lndmrk, name);
  return lndmrk;
}

export function errorPrgr() {

    var errMsgs = NxInstance.getErrMsgs();
    if(!errMsgs.length){
      errMsgs = ["Init failed"];
    }
  var p = getElm("P");
  if (NxInstance.isCssLoaded()) {
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
      spx.textContent = NxTranslate.getTxt(msg);
      NxState.registerTranslElm(spx, msg);
      p.append(spx, br.cloneNode());
    });
  
  return p;
}

