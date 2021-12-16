/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { isNonEmptyObj, isNonEmptyStr } from "../../libr/Jack/Check.js";
import { isValidHttpUrl } from "../../libr/Jack/Web.js";
import { setOriginLang } from "../transl/NxCoreTranslate.js";
import { isValidId } from "../validt/NxStamper.js";
import { defaultOpts } from "./NxDefaults.js";

var opts = defaultOpts;
var lc = window.location.href;
var hostUrl = lc.substring(0,lc.lastIndexOf('/')+1);
var params = new URLSearchParams(window.location.search.slice(1));

function autoComplete(options, key){
    if(options.hasOwnProperty(key) && options[key].length && options[key].substring(0,4) !== "http"){
    options[key] = hostUrl+options[key];
}
}

export function setOptions(options) {

    if (isNonEmptyObj(options)) {

['src', 'style'].forEach(key=>  {
    autoComplete(options, key)
});
        if (isValidHttpUrl(options.src)) {
            opts.src = options.src;
            if (isValidId(options.id)) {
                opts.id = options.id;
            }
        }

        if (isValidHttpUrl(options.style)) {
            opts.style = options.style;
        }

        if (isNonEmptyStr(options.lang)) {
            opts.lang = options.lang;
            setOriginLang(options.lang);
        }   
    }
}


export function getQuery(key){
    if(key == "edit" && params.has("edit") || params.has("new")){
        return true;
    }
   return params.has(key);
}

export function getOpt(key) {
    return opts[key];
}