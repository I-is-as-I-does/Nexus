/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { copyToClipboard } from "@i-is-as-i-does/jack-js/src/modules/Stock.js";
import { timedFadeToggle, easeOut, easeIn } from "@i-is-as-i-does/valva/src/modules/aliases.js";
import { blockWrap, getElm } from "./NxCommons.js";
import { registerTranslElm } from "@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js";
import { registerUpdateEvt } from "../NxState.js";
import { getTxt } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js";

var drawerElm = null;
var editMode = false;

function actionLink(action, text) {
  var lk = getElm("A", "nx-source-" + action);
  lk.textContent = text;
  return lk;
}


function toolTip(className, text) {
  var tooltip = getElm("SPAN", className);
  tooltip.textContent = text;
  tooltip.style.opacity = 0;
  tooltip.hidden = true;
  registerTranslElm(tooltip, text);
  return tooltip;
}

function resolveSrc(state){
  var src = state.dataUrl;
  if(editMode){
    src = "edit";
  }
  if(state.threadId !== "/"){
    src += "#"+state.threadId;
  }
  
  return src;
}
function instanceUrl(state){
  var elm = getElm("INPUT", "nx-instance-url");
  elm.type="text";
  elm.value = resolveSrc(state);

registerUpdateEvt(function (newState) {
  elm.value = resolveSrc(newState);
  });
  return elm;
}


function toggleLink() {
  var text = "</>";
  var altText = "< />";
  var lk = actionLink("drawer", text);

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



function linkBundle(state) {
  drawerElm = getElm("DIV", "nx-source-drawer");
  var url = instanceUrl(state);
  var copylk = copyLink(url);
    drawerElm.append(url, copylk);

  drawerElm.style.display = "none";

  var tgg = getElm("DIV", "nx-source-toggle");
  var snippetLink = toggleLink();
  tgg.append(snippetLink);

  return [tgg, drawerElm];
}


function copyLink(elm) {
  var copyLk = actionLink("copy", "⧉");
  var copyTooltip = toolTip("nx-source-copy-tooltip",getTxt("copied"));
  copyLk.append(copyTooltip);

  copyLk.addEventListener("click", () =>
    copyToClipboard(elm.textContent, () => {
      timedFadeToggle(copyTooltip, 1000);
    })
  );
  return copyLk;
}


export function sourceBlock(state, editionSource = false) {
  if(editionSource){
    editMode = true;
  }
  return blockWrap("source", null, linkBundle(state), false);
}
