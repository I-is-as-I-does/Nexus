
import { isNonEmptyStr } from "./lib/Jack/Trades/Check.js";
import { isValidHttpUrl } from "./lib/Jack/Trades/Web.js";
import { defaultCssUrl, defaultSelector } from "./NxConstants.js";
import { isValidId } from "./NxStamper.js";

var opts = {
  src:null,
  id:'/',
  style:defaultCssUrl,
  lang:"en",
  embed:true,
  history:false,
  log:false
};

var container = null;

function setContainer() {

      container = document.querySelector(defaultSelector);
      if (container) {
        setOpts();
      } else {
        container = document.createElement('DIV');
        document.body.append(container);
      }
      if (opts.embed) {
        container.classList.add("nexus");
        container = container.attachShadow({ mode: "open" });
      } else {
        document.querySelector("html").classList.add("nexus");
      }
}

function setOpts() {
  if (isValidHttpUrl(container.dataset.src)) {
    opts.src = container.dataset.src;
    if (isValidId(container.dataset.id)) {
      opts.id = container.dataset.id;
    }
  }

  if (isValidHttpUrl(container.dataset.style)) {
    opts.style = container.dataset.style;
  }

  if (isNonEmptyStr(container.dataset.lang)) {
    opts.lang = container.dataset.lang;
  }

  if (container.dataset.embed == "false") {
    opts.embed = false;
  }
  if (container.dataset.history == "true") {
    opts.history = true;
  }
  if (container.dataset.log == "true") {
    opts.log = true;
  }
}
 setContainer();
export var opts;
export var container;


