import { isNonEmptyStr } from "../libr/Jack/Check.js";

var errMsgs = [];
var debugMode = false;

export function consoleLog(msg) {
        if (debugMode) {
          console.log(msg);
        }
      }

      export function setDebugMode(isOn = true){
        debugMode =isOn;
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
   