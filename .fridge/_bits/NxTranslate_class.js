import { getLocalStorage } from "./lib/Jack/Stock.js";
import { isNonEmptyObj, isNonEmptyStr } from "./lib/Jack/Check.js";
import NxCommons from "./transl/NxCommons.js";

class NxNimrod {
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
    if (this.langIsAvailable(lang)) {
      this.#currentLang = lang;
      this.#updateStorage(lang);
      return true;
    }
    return false;
  }

  setOriginLang(lang){
    if(!this.#storedLang){
      this.setUserSelectedLang(lang);
    }
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
      if(this.#storage && this.#storedLang != lang){
        this.#storage.setItem("nx-lang", lang);
        this.#storedLang = lang;
      }
  }

  lang() {
    return this.#currentLang;
  }

  get(key) {
    var text;
    if (this.#currentLang != "en") {
      text = this.#txts[this.#currentLang][key];
    }
    if (!text) {
      text = key;
    }
    return text;
  }
}

export default new NxNimrod();