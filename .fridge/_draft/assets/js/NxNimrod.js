import { getLocalStorage } from "./lib/Jack/Stock.js";
import { isNonEmptyObj, isNonEmptyStr } from "./lib/Jack/Check.js";
import NxCommons from "./transl/NxCommons.js";
import { splitFlap } from "./lib/Valva/Valva.js";

class NxNimrod {
  constructor() {
    this.txts = NxCommons;

    this.availableLangs = Object.keys(this.txts);
    this.availableLangs.unshift("en");

    this.store = getLocalStorage();

    this.storeLang = null;
    this.lang = null;

    this.setStoreLang();
    this.setDefaultLang();

    this.textElms = {};
  }

  setAdtTransl(adtTransl) {
    if (isNonEmptyObj(adtTransl)) {
      Object.assign(this.txts, adtTransl); //@todo: test if works as expected from nested props
    }
  }

  setUserSelectedLang(lang) {
    if (this.langAvailable(lang)) {
      this.lang = lang;
      this.storeLang = lang;
      if (this.store) {
        this.store.setItem("nx-lang", lang);
      }
      this.updateAllTextElms();
    }
  }

  updateAllTextElms() {
    for (let [textkey, elms] of Object.entries(this.textElms)) {
      elms.forEach((elm) => {
        this.updateTextElm(elm, textkey);
      });
    }
  }

  updateTextElm(elm, textkey) {
    splitFlap(elm, this.get(textkey), 50);
  }

  registerTextElm(elm, textkey) {
    if (!this.textElms[textkey]) {
      this.textElms[textkey] = [];
    }
    this.textElms[textkey].push(elm);
  }

  langAvailable(lang) {
    return isNonEmptyStr(lang) && this.availableLangs.includes(lang);
  }

  setStoreLang() {
    if (this.store) {
      this.storeLang = this.store.getItem("nx-lang");
      if (!this.langAvailable(this.storeLang)) {
        this.storeLang = null;
        this.store.removeItem("nx-lang");
      }
    }
  }

  setDefaultLang(lang = null) {
    if (this.storeLang) {
      this.lang = this.storeLang;
      return;
    }
    if (!this.langAvailable(lang)) {
      lang = document.querySelector("html").lang;
      if (!this.langAvailable(lang)) {
        lang = "en";
      }
    }
    this.lang = lang;
    if (this.store) {
      this.store.setItem("nx-lang", lang);
    }
  }

  get(key) {
    if (this.lang == "en" || !this.txts[this.lang][key]) {
      return key;
    }
    return this.txts[this.lang][key];
  }
}
export default new NxNimrod();
