import { NxTranslate } from "../NxTranslate.js";
import { appUrl } from "../NxConstants.js";
import { NxState } from "../NxState.js";
import { blockWrap, getElm, selectDropDown } from "./NxMeta.js";


export function appBlock() {
  return blockWrap("app", null, [appLink(), langDropDown()], false);
}

export function appLink() {
  var link = getElm("A", "nx-app-link nx-external-link");
  link.target = "_blank";
  link.href = appUrl;
  link.title = "Nexus";
  link.textContent = "Nexus";
  return link;
}


//"nx-lang-list" = "nx-select-list"/  "nx-lang-list-toggle" = "nx-select-toggle" /   "nx-selected-lang" = "nx-selected"
export function langDropDown() {
  var toggle = getElm('P');
  toggle.textContent = NxTranslate.getLang();
  return selectDropDown(NxTranslate.getAvailableLangs(), toggle, function(nlang){
    NxState.triggerTranslate(nlang);
  }, "nx-lang-switch");
}
