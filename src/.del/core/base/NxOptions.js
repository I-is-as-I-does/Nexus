/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { isNonEmptyObj, isNonEmptyStr } from "../../libr/Jack/Check.js";
import { isValidHttpUrl, toLastSlash } from "../../libr/Jack/Web.js";
import { setOriginLang } from "../transl/NxCoreTranslate.js";
import { extractId, isValidId } from "../validt/NxStamper.js";
import { defaultOpts } from "./NxDefaults.js";

var opts = defaultOpts;
var loc = window.location.href;
var hostUrl = toLastSlash(loc);
var params = new URLSearchParams(window.location.search.slice(1));
var view = extractId(loc);


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

            var extract = extractId(options.src);
            opts.src = extract.url;

            if (view.id != "/") {
                opts.id = view.id;
            } else if(isValidId(options.id)){
                opts.id =options.id;
            } else {
                opts.id = extract.id;
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
export function getHostUrl(){
    return hostUrl;
}

export function getViewUrl(){
    return view.url;
}