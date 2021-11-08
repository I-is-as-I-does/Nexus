import { copyToClipboard } from "../lib/Jack/Trades/Stock.js";
import { timedFadeToggle, easeOut, easeIn } from "../lib/Valva/Valva.js";
import { blockWrap } from "./NxMeta.js";
import NxTranslate from "../NxTranslate.js";
import NxViewer from "./../NxViewer.js";
import { defaultIO } from "../NxConstants.js";

export function sourceBlock(dataSrc, threadId) {
  return blockWrap("source", null, snippetsBundle(dataSrc, threadId), false);
}

export function actionLink(action, text) {
  var lk = document.createElement("A");
  lk.classList.add("nx-source-" + action);
  lk.textContent = text;
  return lk;
}

export function jsonContent(dataSrc, threadId) {
  return '{"url": "' + dataSrc + '", "threadId": "' + threadId + '"}';
}

export function toolTip(className, text) {
  var tooltip = document.createElement("SPAN");
  tooltip.classList.add(className);
  tooltip.textContent = text;
  tooltip.style.opacity = 0;
  tooltip.hidden = true;
  NxTranslate.registerTranslElm(tooltip, text);
  return tooltip;
}

export function toggleLink(drawerElm) {
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

export function snippetsBundle(dataSrc, threadId) {
  var srcDrawer = document.createElement("DIV");
  srcDrawer.classList.add("nx-source-drawer");
  srcDrawer.append(
    jsonSnippet(dataSrc, threadId),
    embedSnippet(dataSrc, threadId)
  );
  srcDrawer.style.display = "none";

  var tgg = document.createElement("DIV");
  tgg.classList.add("nx-source-toggle");

  var snippetLink = toggleLink(srcDrawer);
  tgg.append(snippetLink);

  return [tgg, srcDrawer];
}

export function textAreaElm(content, eventCallback) {
  var snpInp = document.createElement("TEXTAREA");
  snpInp.spellcheck = false;
  snpInp.textContent = content;

  NxViewer.registerUpdateEvt(function (e) {
    var nwcode = eventCallback(e);
    snpInp.textContent = nwcode;
  });
  return snpInp;
}

export function jsonArea(dataSrc, threadId) {
  var snpInp = textAreaElm(jsonContent(dataSrc, threadId), function (e) {
    return jsonContent(e.dataSrc, e.threadId);
  });
  return snpInp;
}

export function embedArea(dataSrc, threadId) {
  var snpInp = textAreaElm(embedContent(dataSrc, threadId, true), function (e) {
    return embedContent(e.dataSrc, e.threadId, snpInp.dataset.embed);
  });
  snpInp.dataset.embed = true;
  return snpInp;
}

export function copyLink(snpElm) {
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

export function snippetElm(name, elms) {
  var snp = document.createElement("DIV");
  snp.classList.add("nx-" + name + "-snippet");
  elms.push(copyLink(elms[0]));
  snp.append(...elms);

  return snp;
}

export function jsonSnippet(dataSrc, threadId) {
  return snippetElm("json", [jsonArea(dataSrc, threadId)]);
}

export function embedSnippet(dataSrc, threadId) {
  var embedInput = embedArea(dataSrc, threadId);
  return snippetElm("embed", [embedInput]);
}

export const dfltOpts = {
  embed: true,
  history: false,
};

export function embedContent(dataSrc, threadId) {
  return (
    '<div id="Nexus" data-src="' +
    dataSrc +
    '" data-id="' +
    threadId +
    '" data-style="' +
    NxViewer.themeCssUrl +
    '" data-lang="' +
    NxTranslate.lang +
    '" data-embed="' +
    dfltOpts.embed +
    '" data-history="' +
    dfltOpts.history +
    '"></div>\r\n<script src="' +
    defaultIO +
    '"></script>'
  );
}
