import { getLocalStorage } from "../libr/Jack/Trades/Stock.js";
import { isNonEmptyObj, isNonEmptyStr } from "../libr/Jack/Trades/Check.js";

import NxCommons from "./NxCommons.js";

class Translate {
  #storage;
  #txts;
  #availableLangs;
  #storedLang;
  #currentLang;
  constructor() {
    this.#storage = getLocalStorage();
    this.#txts = {};
    this.#availableLangs = ["en"];
    this.#storedLang = null;
    this.#currentLang = null;
    this.setTranslations(NxCommons);
    this.#setStoredLang();
    this.#setDefaultLang();
  }

  #setStoredLang() {
    if (this.#storage) {
      this.#storedLang = this.#storage.getItem("nx-lang");
      if (!this.langIsAvailable(this.#storedLang)) {
        this.#storedLang = null;
        this.#storage.removeItem("nx-lang");
      }
    }
  }

  #setDefaultLang() {
    if (this.#storedLang) {
      this.#currentLang = this.#storedLang;
      return;
    }
    var lang = document.querySelector("html").lang;
    if (!this.langIsAvailable(lang)) {
      lang = "en";
    }

    this.#currentLang = lang;
  }

  #updateStorage(lang) {
    if (this.#storage && this.#storedLang != lang) {
      this.#storage.setItem("nx-lang", lang);
      this.#storedLang = lang;
    }
  }

  setOriginLang(lang) {
    if (!this.#storedLang) {
      this.setUserSelectedLang(lang);
    }
  }

  setTranslations(translObj) {
    if (isNonEmptyObj(translObj)) {
      Object.assign(this.#txts, translObj); //@todo: test if works as expected from nested props
      this.#availableLangs.push(
        ...Object.keys(this.#txts).filter(
          (item) => this.#availableLangs.indexOf(item) < 0
        )
      );
      return true;
    }
    return false;
  }

  langIsAvailable(lang) {
    return isNonEmptyStr(lang) && this.#availableLangs.includes(lang);
  }

  setUserSelectedLang(lang) {
    if (this.langIsAvailable(lang) && lang != this.#currentLang) {
      this.#currentLang = lang;
      this.#updateStorage(lang);
      return true;
    }
    return false;
  }

  getAvailableLangs() {
    return this.#availableLangs;
  }

  getLang() {
    return this.#currentLang;
  }

  getTxt(key) {
    var text = key;
    if (this.#currentLang != "en" && this.#txts[this.#currentLang][key]) {
      text = this.#txts[this.#currentLang][key];
    }
    return text;
  }
}

export var NxTranslate = new Translate();
