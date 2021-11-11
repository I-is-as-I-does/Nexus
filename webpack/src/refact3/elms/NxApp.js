import { splitFlap } from "../../libr/Valva/Valva.js";
import { NxTranslate } from "../NxTranslate.js";
import { appUrl } from "../NxConstants.js";
import { NxState } from "../NxState.js";
import { blockWrap, getElm } from "./NxMeta.js";


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
  var selectedClass = "nx-selected-lang";

  var langTgg = getElm("SPAN", "nx-lang-list-toggle");
  langTgg.textContent = NxTranslate.getLang();

  var langDrp = getElm("UL", "nx-lang-list");
  NxTranslate.getAvailableLangs().forEach((lang) => {
    var li = getElm("LI");
    li.textContent = lang;
    if (lang == langTgg.textContent) {
      li.classList.add(selectedClass);
    }
    li.addEventListener("click", () => {
      var nlang = li.textContent;
      if (nlang != NxTranslate.getLang()) {
        var prev = langDrp.querySelector("." + selectedClass);
        prev.classList.remove(selectedClass);
        li.classList.add(selectedClass);

        splitFlap(langTgg, nlang, 50);
        NxState.triggerTranslate(nlang);
      }
      langDrp.style.display = "none";
    });

    langDrp.append(li);
  });
  langDrp.style.display = "none";

  var swtch = getElm("DIV", "nx-lang-switch");
  swtch.append(langTgg, langDrp);

  langTgg.addEventListener("click", () => {
    var styl = "none";
    if (langDrp.style.display == styl) {
      styl = "block";
    }
    langDrp.style.display = styl;
  });

  return swtch;
}
