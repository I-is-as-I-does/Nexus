/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { isNonEmptyObj, isNonEmptyStr } from "../../libr/Jack/Check.js";
import { getStoredLang, setStoredLang } from "../storg/NxMemory.js";
import { NxTranslations } from "./NxTranslations.js";



var txts = NxTranslations;
var availableLangs = ["en", "fr"];


var storedLang = getStoredLang();
if (storedLang != null && !langIsAvailable(storedLang)) {
  storedLang = null;
  setStoredLang(null);
}

var currentLang = null;
if (storedLang) {
      currentLang = storedLang;
} else {
  currentLang = document.querySelector("html").lang;
  if (!langIsAvailable(currentLang)) {
    currentLang = "en";
  }
}

function updateStorage(lang) {
    if (storedLang != lang) {
      setStoredLang(lang);
      storedLang = lang;
    }
  }

export function setOriginLang(lang) {
    if (!storedLang) {
      setUserSelectedLang(lang);
    }
  }

  export function setAdtTranslations(translObj) {
    if (isNonEmptyObj(translObj)) {
      Object.assign(txts, translObj); //@todo: test if works as expected from nested props
      availableLangs.push(
        ...Object.keys(txts).filter(
          (item) => availableLangs.indexOf(item) < 0
        )
      );
      return true;
    }
    return false;
  }

  export function langIsAvailable(lang) {
    return isNonEmptyStr(lang) && availableLangs.includes(lang);
  }

  export function setUserSelectedLang(lang) {
    if (langIsAvailable(lang) && lang != currentLang) {
      currentLang = lang;
      updateStorage(lang);
      return true;
    }
    return false;
  }

  export function getAvailableLangs() {
    return availableLangs;
  }

  export function getLang() {
    return currentLang;
  }

  export function getTxt(key) {
    var text = key;
    if (currentLang != "en" && txts[currentLang][key]) {
      text = txts[currentLang][key];
    }
    return text;
  }

