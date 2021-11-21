import { loadJson } from "../libr/Jack/Web.js";
import { clearErr, consoleLog, getErr, logErr } from "../logs/NxLog.js";
import { getStoredData, registerData } from "../storg/NxMemory.js";
import { validMap } from "../validt/NxStamper.js";

document.cookie = "Nx=Instance; SameSite=None; Secure";

 function setDataIndex(data) {
    data.index = [];
  
    data.threads.map((it) => {
      data.index.push(it.id);
    });
  }


function loadSrcFile(dataUrl) {
    return loadJson(dataUrl)
      .then((data) => {
        clearErr();
        data = validMap(data);
      
        if (data) {
         setDataIndex(data);
         registerData(dataUrl, data);
         
          return data;
        }
        registerData(dataUrl, 400);
        consoleLog(getErr());
        logErr("Invalid source");
        return Promise.reject(400);
      })
      .catch((err) => {
        consoleLog(err);
        registerData(dataUrl, 404);
        logErr("No response");
        throw 404;
      });
  }


export function getSrcData(dataUrl) {
    var data = getStoredData(dataUrl);
    if (data !== null) {
      if (Number.isInteger(data)) {
        return Promise.reject(data);
      }
      return Promise.resolve(data);
    }
    return loadSrcFile(dataUrl);
  }
