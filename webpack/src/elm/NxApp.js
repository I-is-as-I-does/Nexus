import NxTranslate from "../NxTranslate.js";
import { appUrl } from "../NxConstants.js";
import { blockWrap } from "./NxMeta.js";
import { splitFlap } from "../lib/Valva/Valva.js";

export function appBlock() {
  return blockWrap("app", null, [appLink(), langDropDown()], false);
}

export function appLink() {
  var link = document.createElement("A");
  link.target = "_blank";
  link.classList.add("nx-app-link", "nx-external-link");
  link.href = appUrl;
  link.title = "Nexus";
  link.textContent = "Nexus";
  return link;
}

export function langDropDown() {
  var selectedClass = "nx-selected-lang";

  var langTgg = document.createElement("SPAN");
  langTgg.classList.add("nx-lang-list-toggle");

  langTgg.textContent = NxTranslate.lang;

  var langDrp = document.createElement("UL");
  langDrp.classList.add("nx-lang-list");

  NxTranslate.availableLangs.forEach((lang) => {
    var li = document.createElement("LI");
    li.textContent = lang;
    if (lang == NxTranslate.lang) {
      li.classList.add(selectedClass);
    }
    li.addEventListener("click", () => {
      var nlang = li.textContent;
      if (nlang != NxTranslate.lang) {
        var prev = langDrp.querySelector("." + selectedClass);
        prev.classList.remove(selectedClass);
        li.classList.add(selectedClass);

        splitFlap(langTgg, nlang, 50);
        NxTranslate.setUserSelectedLang(nlang);
      }
      langDrp.style.display = "none";
    });

    langDrp.append(li);
  });
  langDrp.style.display = "none";

  var swtch = document.createElement("DIV");
  swtch.classList.add("nx-lang-switch");
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

export function langSelect() {
  var langSlct = document.createElement("SELECT");
  langSlct.classList.add("nx-lang-switch");

  NxTranslate.availableLangs.forEach((lang) => {
    var opt = document.createElement("OPTION");
    opt.textContent = lang;
    if (lang == NxTranslate.lang) {
      opt.selected = true;
    }
    langSlct.append(opt);
  });

  langSlct.addEventListener("change", (e) => NxTranslate.langSelectEvent(e));
  return langSlct;
}
