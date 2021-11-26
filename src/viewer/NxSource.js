import { copyToClipboard } from "../libr/Jack/Stock.js";
import { timedFadeToggle, easeOut, easeIn } from "../libr/Valva/Valva.js";
import { blockWrap, getElm } from "./NxCommons.js";
import { getOpt } from "../core/base/NxOptions.js";
import { registerTranslElm } from "../core/transl/NxElmTranslate.js";
import { registerUpdateEvt } from "../core/state/NxUpdate.js";
import { getLang, getTxt } from "../core/transl/NxCoreTranslate.js";
import { defaultIO } from "../core/base/NxDefaults.js";



var drawerElm = null;
var editMode = false;

function actionLink(action, text) {
  var lk = getElm("A", "nx-source-" + action);
  lk.textContent = text;
  return lk;
}

function jsonContent(state) {
  if(state.dataUrl){
  return (
    '{"url": "' + state.dataUrl + '", "id": "' + state.threadId + '"}'
  );
}
return "";
}

function toolTip(className, text) {
  var tooltip = getElm("SPAN", className);
  tooltip.textContent = text;
  tooltip.style.opacity = 0;
  tooltip.hidden = true;
  registerTranslElm(tooltip, text);
  return tooltip;
}

function toggleLink() {
  var text = "</>";
  var altText = "< />";
  var lk = actionLink("snippets", text);

  lk.addEventListener("click", () => {
    if (lk.textContent == altText) {
      lk.textContent = text;
      lk.classList.remove("nx-active");
      easeOut(drawerElm, 200);
    } else {
      lk.textContent = altText;
      lk.classList.add("nx-active");
      easeIn(drawerElm, 100, function () {
        drawerElm.scrollIntoView({
          block: "end",
          behavior: "smooth",
          inline: "nearest",
        });
      });
    }
  });
  return lk;
}

function jsonSource(state){
  return codeElm("source", textAreaElm(state, sourceContent));
}

function snippetsBundle(state) {
  drawerElm = getElm("DIV", "nx-source-drawer");

  if(editMode){
    drawerElm.append(jsonSource(state));
  } else {
    drawerElm.append(jsonSnippet(state), embedSnippet(state));
  }
  
  drawerElm.style.display = "none";

  var tgg = getElm("DIV", "nx-source-toggle");
  var snippetLink = toggleLink();
  tgg.append(snippetLink);

  return [tgg, drawerElm];
}

function textAreaElm(state, callback) {
  var snpInp = getElm("TEXTAREA");
  snpInp.spellcheck = false;
  snpInp.textContent = callback(state);

registerUpdateEvt(function (newState) {
    snpInp.textContent = callback(newState);
  });
  return snpInp;
}

function copyLink(snpElm) {
  var copyLk = actionLink("copy", "⧉");
  var copyTooltip = toolTip("nx-source-copy-tooltip",getTxt("copied"));
  copyLk.append(copyTooltip);

  copyLk.addEventListener("click", () =>
    copyToClipboard(snpElm.textContent, () => {
      timedFadeToggle(copyTooltip, 1000);
    })
  );
  return copyLk;
}

function codeElm(name, elm) {
  var snp = getElm("DIV", "nx-" + name + "-snippet");
  snp.append(elm, copyLink(elm));
  return snp;
}

function jsonSnippet(state) {
  return codeElm("json", textAreaElm(state, jsonContent));
}

function embedSnippet(state) {
  return codeElm("embed", textAreaElm(state, embedContent));
}

function sourceContent(state){
  if(state.srcData){
return JSON.stringify(state.srcData);
  }
}

function embedContent(state) {
  if(state.dataUrl){
  return (
    '<div id="Nexus" data-src="' +
    state.dataUrl +
    '" data-id="' +
    state.threadId +
    '" data-style="' +
    getOpt('style') +
    '" data-lang="' +
    getLang() +
    '"></div>\r\n<script src="' +
    defaultIO+
    '"></script>'
  );
  }
  return "";
}

export function sourceBlock(state, editionSource = false) {
  if(editionSource){
    editMode = true;
  }
  return blockWrap("source", null, snippetsBundle(state), false);
}
