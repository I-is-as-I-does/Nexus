/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { isNonEmptyStr } from "../../libr/Jack/Check.js";

var errMsgs = [];
var logMode = false;

export function logErr(msg) {
        if (logMode) {
          console.log(msg);
        }
      }

      export function setLogMode(isOn = true){
        logMode =isOn;
      }
      export function clearErr(){
        errMsgs = [];
      }

      export function logErr(msg, detail = null){
        var entry = { msg: msg };
        if (isNonEmptyStr(detail)) {
          entry["detail"] = entry;
        }
        errMsgs.push(msg);
    }  

    export function getErr() {
    return errMsgs;
  }
   