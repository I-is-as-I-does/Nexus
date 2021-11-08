import NxNimrod from "../NxNimrod.js";
import { historyBlock } from "./NxHistory.js";
import { sourceBlock } from "./NxSource.js";

import { splitFlap } from "../lib/Valva/Valva.js";
import { appBlock } from "./NxApp.js";
import { linkedBlock, threadBlock } from "./NxThread.js";
import { indexBlock } from "./NxIndex.js";

export function wholeWrap(contents) {
  var wrap = document.createElement("DIV");
  wrap.classList.add("nx-instance");

  wrap.append(...contents);
  return wrap;
}

export function loader() {
  var texts = ["|", "|..."];
  var dv = document.createElement("DIV");
  dv.classList.add("nx-loader");
  dv.textContent = texts[0];
  var idx = 1;
  var intr = setInterval(function () {
    splitFlap(dv, texts[idx], 100);
    if (idx === 1) {
      idx = 0;
    } else {
      idx++;
    }
  }, 400);
  dv.addEventListener("Done", function () {
    clearInterval(intr);
  });
  return dv;
}

export function errorElm(text) {
  var p = document.createElement("P");
  p.classList.add("nx-error");
  var sp1 = document.createElement("SPAN");
  sp1.textContent = "—/ — ";
  var sp2 = document.createElement("SPAN");
  var text = "Nexus not found";
  sp2.textContent = NxNimrod.get(text);
  NxNimrod.registerTranslElm(sp2, text);
  p.append(sp1, sp2);
  return p;
}

export function blockWrap(
  blockName,
  headerElms = null,
  contentElms = null,
  landmark = false
) {
  var dv = document.createElement("SECTION");
  dv.classList.add("nx-" + blockName, "nx-block");
  if (landmark) {
    dv.append(landmarkElm(blockName));
  }
  if (headerElms) {
    var header = document.createElement("HEADER");
    header.append(...headerElms);
    dv.append(header);
  }
  if (contentElms) {
    dv.append(...contentElms);
  }
  return dv;
}

export function landmarkElm(name) {
  var lndmrk = document.createElement("SPAN");
  lndmrk.classList.add("nx-landmark", "nx-landmark-" + name);
  lndmrk.textContent = NxNimrod.get(name);
  NxNimrod.registerTranslElm(lndmrk, name);
  return lndmrk;
}

export function defaultReaderBlocks(dataSrc, threadId) {
  var contents = [
    headerElm([appBlock(), historyBlock(dataSrc, threadId)]),
    mainElm([
      divElm([indexBlock(dataSrc)]),
      divElm([threadBlock(dataSrc, threadId), linkedBlock(dataSrc, threadId)]),
    ]),
    footerElm([sourceBlock(dataSrc, threadId)]),
  ];

  return wholeWrap(contents);
}

export function mainElm(contents) {
  var main = document.createElement("MAIN");
  main.append(...contents);
  return main;
}
export function divElm(contents) {
  var div = document.createElement("DIV");
  div.append(...contents);
  return div;
}
export function footerElm(contents) {
  var footer = document.createElement("FOOTER");
  footer.append(...contents);
  return footer;
}
export function headerElm(contents) {
  var header = document.createElement("HEADER");
  header.append(...contents);
  return header;
}
