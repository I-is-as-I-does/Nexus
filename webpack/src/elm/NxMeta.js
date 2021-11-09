import { historyBlock } from "./NxHistory.js";
import { sourceBlock } from "./NxSource.js";

import { appBlock } from "./NxApp.js";
import { threadBlocks } from "./NxThread.js";
import { indexBlock } from "./NxIndex.js";
import { getTxt } from "../prc/NxTranslate.js";
import { registerTranslElm } from "../prc/NxViewer.js";

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

export function viewerBlocks(state) {

   var indexPart = getElm("DIV");
   indexPart.append(indexBlock(state));
   var threadPart = getElm("DIV");
   threadPart.append(...threadBlocks(state));

  return instanceWrap([appBlock(), historyBlock(state)], [
    indexPart,
    threadPart
    ], [sourceBlock(state)]);
}
