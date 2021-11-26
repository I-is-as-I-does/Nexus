import {
  easeOut,
  insertDiversion,
  replaceDiversion,
} from "../libr/Valva/Valva.js";
import { registerUpdateEvt } from "../core/state/NxUpdate.js";
import { authorHandle, authorUrl, viewLink } from "./NxIdent.js";
import { blockWrap, getElm } from "./NxCommons.js";

var indexList = null;

function aboutElm(state) {
  var ab = getElm("DIV", "nx-about-author");

  ab.append(aboutParagraph(state));
 registerUpdateEvt(function (newState) {
    replaceDiversion(ab.firstChild, aboutParagraph(newState));
  }, true);
  return ab;
}

function aboutParagraph(state) {
  var p = getElm("P");
  if(state.srcData){
  p.textContent = state.srcData.author.about;
}
  return p;
}

function setIndexList(state) {
  indexList = getElm("UL");
  if(state.srcData){
  var items = state.srcData.index;

  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      indexList.append(indexLi(state, items[i], i));
    }
  }
 registerUpdateEvt(function (newState) {

    changeThreadsList(newState);
  }, true);
}
}

function indexLi(state, id, index) {
  var altState = Object.assign({}, state);

  altState.threadId = id;
  altState.threadIndex = index;

  var li = getElm("LI");
  li.append(viewLink(altState, false));
  return li;
}

function changeThreadsList(state) {


  var childr = indexList.childNodes;
  var items = state.srcData.index;
  var nwlen = items.length;

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
        var nlink = indexLi(state, items[x], x);
        replaceDiversion(childr[x], nlink);
        count++;
      } else {
        rmv(childr[x]);
      }
    }
  }
  if (count < nwlen) {
    for (var y = count; y < nwlen; y++) {
      insertDiversion(indexList, indexLi(state, items[y], y), false, true, 200);
    }
  }
}

export function indexBlock(state) {
  setIndexList(state);
  var headerElms = [authorHandle(state, true), authorUrl(state, true)];
  var contentElms = [aboutElm(state), indexList];
  return blockWrap("index", headerElms, contentElms, true);
}
