/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { loadJson } from "../../libr/Jack/Web.js";
import { clearErr, consoleLog, getErr, logErr } from "../logs/NxLog.js";
import { getStoredData, registerData } from "../storg/NxMemory.js";
import { validData } from "../validt/NxStamper.js";

document.cookie = "Nx=Instance; SameSite=None; Secure";
function setDataIndex(data) {
  data.index = [];
  data.threads.map((it) => {
    data.index.push(it.id);
  });
}


function loadSrcUrl(dataUrl) {
    return loadJson(dataUrl)
      .then((data) => {
        clearErr();
        data = validData(data);  

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


function prcData(event){
  var data = JSON.parse(event.target.result);
  if(data){
      data = validData(data);
      if (data) {
        setDataIndex(data);       
       return data;
       } 
  }
  return false;
}

export function loadSrcFile(inputEvt) {
  if (inputEvt.target.files.length && inputEvt.target.files[0].type == "application/json") {
  return new Promise((resolve, reject) => { 
  var reader = new FileReader();
  reader.onload = function(event){
      var data = prcData(event);
      if(data){   
        resolve(data);
      } else {
        reject();
      }     
  };
return reader.readAsText(inputEvt.target.files[0]);  
});
  }
  return Promise.reject();
  }


export function getSrcData(src) {
    var data = getStoredData(src);
    if (data !== null) {
      if (Number.isInteger(data)) {
        return Promise.reject(data);
      }
      return Promise.resolve(data);
    }
      return loadSrcUrl(src);
  }
