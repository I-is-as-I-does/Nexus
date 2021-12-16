/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { getTxt, setUserSelectedLang } from "./NxCoreTranslate.js";
import { splitFlap } from "../../libr/Valva/Valva.js";

var translStore = {};
  
function updateTextElm(elm, textkey) {
    splitFlap(elm, getTxt(textkey), 50);
  }
  
export function triggerTranslate(lang) {
    if (setUserSelectedLang(lang)) {
      for (let [textkey, elms] of Object.entries(translStore)) {
        elms.forEach((elm) => {
          updateTextElm(elm, textkey);
        });
      }
    }
  }


export function registerTranslElm(elm, textkey) {
    if (!translStore[textkey]) {
      translStore[textkey] = [];
    }
   translStore[textkey].push(elm);
  }