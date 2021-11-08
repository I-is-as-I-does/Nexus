import {
  easeOut,
  insertDiversion,
  replaceDiversion,
} from "../lib/Valva/Valva.js";
import NxViewer from "./../NxViewer.js";
import { authorHandle, authorUrl, viewLink } from "./NxIdent.js";
import { blockWrap } from "./NxMeta.js";

export function indexBlock(dataSrc) {
  var headerElms = [authorHandle(dataSrc, true), authorUrl(dataSrc, true)];
  var contentElms = [about(dataSrc), indexList(dataSrc)];
  return blockWrap("index", headerElms, contentElms, true);
}

export function about(dataSrc) {
  var dv = document.createElement("DIV");
  dv.classList.add("nx-about-author");

  dv.append(aboutParagraph(dataSrc));
  NxViewer.registerUpdateEvt(function (e) {
    replaceDiversion(dv.firstChild, aboutParagraph(e.dataSrc));
  }, true);
  return dv;
}

export function aboutParagraph(dataSrc) {
  var ab = document.createElement("P");
  ab.textContent = NxViewer.srcData(dataSrc).author.about;
  return ab;
}
export function indexList(dataSrc) {
  var ul = document.createElement("UL");
  var items = Object.keys(NxViewer.srcData(dataSrc).map);
  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      ul.append(indexLi(dataSrc, items[i]));
    }
  }
  NxViewer.registerUpdateEvt(function (e) {
    changeThreadsList(ul, e);
  }, true);
  return ul;
}

export function indexLi(dataSrc, itm) {
  var li = document.createElement("LI");
  li.append(viewLink(dataSrc, itm, false));
  return li;
}

export function changeThreadsList(ul, e) {
  var childr = ul.childNodes;

  var nw = Object.keys(NxViewer.srcData(e.dataSrc).map);
  var nwlen = nw.length;
  var chlen = childr.length;
  var count = 0;
  if (chlen) {
    var rmv = function (child) {
      easeOut(child, 200, function () {
        child.remove();
      });
    };
    for (var x = 0; x < chlen; x++) {
      if (nwlen > x) {
        var nlink = indexLi(e.dataSrc, nw[x]);
        replaceDiversion(childr[x], nlink);
        count++;
      } else {
        rmv(childr[x]);
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      insertDiversion(ul, indexLi(e.dataSrc, nw[y]), false, true, 200);
    }
  }
}
