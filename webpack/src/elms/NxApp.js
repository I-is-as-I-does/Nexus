import { appUrl } from "../validt/NxSpecs.js";
import { blockWrap, getElm, selectDropDown } from "./NxMeta.js";
import { getAvailableLangs, getLang } from "../transl/NxCoreTranslate.js";
import { triggerTranslate } from "../transl/NxElmTranslate.js";


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

export function langDropDown() {
  var toggle = getElm('P');
  toggle.textContent = getLang();
  return selectDropDown(getAvailableLangs(), toggle, function(nlang){
    triggerTranslate(nlang);
  }, "nx-lang-switch");
}
