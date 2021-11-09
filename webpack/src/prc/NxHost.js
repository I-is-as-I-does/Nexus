import { isNonEmptyObj, isNonEmptyStr } from "../lib/Jack/Trades/Check.js";
import { isValidHttpUrl } from "../lib/Jack/Trades/Web.js";
import { defaultOpts, defaultSelector } from "../valid/NxConstants.js";
import { isValidId } from "../valid/NxStamper.js";

var opts = defaultOpts;
var container = null;

function setOpts(optSrc) {
  if (isValidHttpUrl(optSrc.src)) {
    opts.src = optSrc.src;
    if (isValidId(optSrc.id)) {
      opts.id = optSrc.id;
    }
  }

  if (isValidHttpUrl(optSrc.style)) {
    opts.style = optSrc.style;
  }

  if (isNonEmptyStr(optSrc.lang)) {
    opts.lang = optSrc.lang;
  }

  if (optSrc.embed == "false") {
    opts.embed = false;
  }
  if (optSrc.history == "true") {
    opts.history = true;
  }
  if (optSrc.log == "true") {
    opts.log = true;
  }
}
function setContainer(selector) {
  if (!selector) {
    selector = defaultSelector;
  }
  container = document.querySelector(selector);
  if (!container) {
    container = document.createElement("DIV");
    document.body.append(container);
  }
}
export function setHost(selector = null, _opts = null) {
  if (container != null) {
    return;
  }
  setContainer(selector);

  if (isNonEmptyObj(_opts)) {
    setOpts(_opts);
  } else if (container.dataset) {
    setOpts(container.dataset);
  }

  if (opts.embed) {
    container.classList.add("nexus");
    container = container.attachShadow({ mode: "open" });
  } else {
    document.querySelector("html").classList.add("nexus");
  }
}

export function opt(key) {
  return opts[key];
}
export function setContents(blocks) {
  if (container == null) {
    setContainer();
  }
  container.append(...blocks);
}
