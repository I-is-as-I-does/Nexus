import { copyToClipboard } from "../lib/Jack/Trades/Stock.js";
import { timedFadeToggle, easeOut, easeIn } from "../lib/Valva/Valva.js";
import { blockWrap, getElm } from "./NxMeta.js";
import { getLang } from "../prc/NxTranslate.js";
import { registerTranslElm, registerUpdateEvt } from "../prc/NxViewer.js";
import { defaultIO, defaultOpts } from "../valid/NxConstants.js";

var drawerElm = null;

function actionLink(action, text) {
  var lk = getElm("A","nx-source-" + action);
  lk.textContent = text;
  return lk;
}

function jsonContent(state) {
  return '{"url": "' + state.dataUrl + '", "threadId": "' + state.threadId + '"}';
}

function toolTip(className, text) {
  var tooltip = getElm("SPAN",className);
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
      easeOut(drawerElm, 100);
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

function snippetsBundle(state) {
  drawerElm = getElm("DIV","nx-source-drawer");
  drawerElm.append(
    jsonSnippet(state),
    embedSnippet(state)
  );
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
  var copyTooltip = toolTip("nx-source-copy-tooltip", "copied");
  copyLk.append(copyTooltip);

  copyLk.addEventListener("click", () =>
    copyToClipboard(snpElm.textContent, () => {
      timedFadeToggle(copyTooltip, 1000);
    })
  );
  return copyLk;
}

function snippetElm(name, elm) {
  var snp = getElm("DIV","nx-" + name + "-snippet");
  snp.append(elm, copyLink(elm));
  return snp;
}

function jsonSnippet(state) {
  return snippetElm("json", textAreaElm(state, jsonContent));
}

function embedSnippet(state) {
  return snippetElm("embed", textAreaElm(state, embedContent));
}

function embedContent(state) {
  return (
    '<div id="Nexus" data-src="' +
    state.dataUrl +
    '" data-id="' +
    state.threadId +
    '" data-style="' +
    defaultOpts.style +
    '" data-lang="' +
    getLang() +
    '" data-embed="' +
    defaultOpts.embed +
    '" data-history="' +
    defaultOpts.history +
    '"></div>\r\n<script src="' +
    defaultIO +
    '"></script>'
  );
}

export function sourceBlock(state) {
  return blockWrap("source", null, snippetsBundle(state), false);
}
