import { getLocalStorage } from "../libr/Jack/Trades/Stock.js";
import { isNonEmptyObj, isNonEmptyStr } from "../libr/Jack/Trades/Check.js";
/*import { getLocalStorage, isNonEmptyObj, isNonEmptyStr } from "../NxJackBundle.js";
*/
import NxCommons from "./NxCommons.js";
const storage = getLocalStorage();
var txts = {};
var availableLangs = ["en"];
var storedLang = null;
var currentLang = null;

function setStoredLang() {
  if (storage) {
    storedLang = storage.getItem("nx-lang");
    if (!langIsAvailable(storedLang)) {
      storedLang = null;
      storage.removeItem("nx-lang");
    }
  }
}

function setDefaultLang() {
  if (storedLang) {
    currentLang = storedLang;
    return;
  }
    var lang = document.querySelector("html").lang;
    if (!langIsAvailable(lang)) {
      lang = "en";
    }

  currentLang = lang;
}

function updateStorage(lang) {
    if(storage && storedLang != lang){
      storage.setItem("nx-lang", lang);
      storedLang = lang;
    }
}

setTranslations(NxCommons);
setStoredLang();
setDefaultLang();

export function setTranslations(translObj) {
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

export function setOriginLang(lang){
  if(!storedLang){
    setUserSelectedLang(lang);
  }
}

export function getAvailableLangs(){
  return availableLangs;
}

export function getLang() {
  return currentLang;
}

export function getTxt(key) {
  var text= key;
  if (currentLang != "en" && txts[currentLang][key]) {
    text = txts[currentLang][key];
  }
  return text;
}
