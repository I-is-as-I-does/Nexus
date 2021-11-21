import { isNonEmptyObj, isNonEmptyStr } from "../libr/Jack/Check.js";
import { isValidHttpUrl } from "../libr/Jack/Web.js";
import { setDebugMode } from "../logs/NxLog.js";
import { setOriginLang } from "../transl/NxCoreTranslate.js";
import { isValidId } from "../validt/NxStamper.js";
import { defaultOpts } from "./NxDefaults.js";

var opts = defaultOpts;

export function setOptions(options) {

    if (isNonEmptyObj(options)) {
       
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

        ["history", "debug"].forEach(prop => {
            if (options[prop] === "true" || options[prop] === true) {
                opts[prop] = true;
                if (prop == "debug") {
                    setDebugMode(true);
                }
            }
        });
    }
}

export function getOpt(key) {
    return opts[key];
}