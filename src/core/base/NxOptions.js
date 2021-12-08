import { isNonEmptyObj, isNonEmptyStr } from "../../libr/Jack/Check.js";
import { isValidHttpUrl } from "../../libr/Jack/Web.js";
import { setDebugMode } from "../logs/NxLog.js";
import { setOriginLang } from "../transl/NxCoreTranslate.js";
import { isValidId } from "../validt/NxStamper.js";
import { defaultOpts } from "./NxDefaults.js";

var opts = defaultOpts;
var lc = window.location.href;
var hostUrl = lc.substr(0,lc.lastIndexOf('/')+1);
var params = new URLSearchParams(window.location.search.slice(1));

function autoComplete(options, key){
    if(options.hasOwnProperty(key) && options[key].length && options[key].substr(0,4) !== "http"){
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

        ["history", "debug", "edit"].forEach(prop => {
            if(params.has(prop)){
                opts[prop] = true;
              }
            else if (options[prop] === "true" || options[prop] === true) {
                opts[prop] = true;
            }
        });
        if (opts.debug) {
            setDebugMode(true);
        }
    }
}

export function getOpt(key) {
    return opts[key];
}