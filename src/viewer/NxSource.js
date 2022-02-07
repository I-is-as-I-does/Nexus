/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { copyToClipboard } from "@i-is-as-i-does/jack-js/src/modules/Stock.js";
import { timedFadeToggle, easeOut, easeIn } from "@i-is-as-i-does/valva/src/legacy/Valva-v1.js";
import { blockWrap, getElm, iconImage } from "../browser/NxCommons.js";
import { registerTranslElm } from "@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js";
import { concatSrc, registerUpdateEvt } from "../browser/NxState.js";
import { getLang } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js";
import { getSnippet } from "@i-is-as-i-does/nexus-core/src/data/NxSnippet.js";
import { appDefaultCss, appIO } from "../browser/NxCdn.js";
import { copyB64 } from "../browser/NxIcons.js";

var drawerElm = null;
var editMode = false;
var currentStyle = null

function actionLink(action, text) {
  var lk = getElm("A", "nx-source-" + action);
  lk.textContent = text;
  return lk;
}

function resolveSrc(state){
  var src
  if(editMode){
    src = "#temp";
  } else  {
    src = concatSrc(state)
  }
  return src;
}

function linkContent(state) {
  if(state.dataUrl){
  return resolveSrc(state)
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

function linkSource(state){
  return codeElm("json", textAreaElm(state, linkContent));
}

function snippetsBundle(state) {
  drawerElm = getElm("DIV", "nx-source-drawer");
  drawerElm.append(linkSource(state), embedSnippet(state));
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
  
  var copyLk = getElm("A", "nx-source-link");
  var copyIc = iconImage(copyB64, 16)

  copyLk.append(copyIc)
  var copyTooltip = toolTip("nx-source-copy-tooltip",'c/c');
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

function embedSnippet(state) {
  return codeElm("embed", textAreaElm(state, embedContent));
}

function embedContent(state) {

  if(state.dataUrl){
    return getSnippet(resolveSrc(state), currentStyle, appIO, getLang())
  }
  return "";
}

export function sourceBlock(state, currentStyleUrl, editionSource = false) {
  if(editionSource){
    editMode = true;
  }
  if(currentStyleUrl !== appDefaultCss){
    currentStyle = currentStyleUrl
  }
  return blockWrap("source", snippetsBundle(state), false);
}
