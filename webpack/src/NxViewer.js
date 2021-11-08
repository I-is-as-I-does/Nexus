import {  opts } from "./NxHost";
import { resolveOrigin } from "./NxInstance";
import { getThreadData, registerThreadVisit } from "./NxMemory";
import { getTxt, setUserSelectedLang } from "./NxTranslate";

var rf = {
   src:null,
    id:null
};
var dt = {
    all:null,
    thread:null
}
const bufferTime = 800;
var translStore = {};
var updateStore = { onChange: [], onSrcChange: [] };
var updateRunning = false;


function setCurrent(src, id, srcChanged){
    if(srcChanged){
        rf.src = src;
        dt.all = getData(src);
    }
    rf.id = id;
    dt.thread = getThreadData(dt.all, id);
}

function registerBrowserEvent(){
  
        window.onpopstate =  (event) =>{
          if (event.state && event.state.src && event.state.id) {
            triggerUpdate(event.state.src, event.state.id, false);
          }
        };
}

function updateBrowserHistory() {
    history.replaceState(rf, "");
    history.pushState(rf, "");
  }
  
function triggerCallbacks(srcChanged) {
    var ks = ["onChange"];
    if (srcChanged) {
      ks.push("onSrcChange");
    }
  
    ks.forEach((k) => {
      if (updateStore[k].length) {
        updateStore[k].forEach((callback) => {
          callback(current);
        });
      }
    });
  }
  
  function updateTimeout() {
    setTimeout(function() {
    updateRunning = false;
      }.bind(this),
bufferTime
    );
  }



  function updateTextElm(elm, textkey) {
    splitFlap(elm, getTxt(textkey), 50);
  }

 export function registerTranslElm(elm, textkey) {
    if (!translStore[textkey]) {
        translStore[textkey] = [];
    }
    translStore[textkey].push(elm);
  }
  
export function registerUpdateEvt(callback, onSrcChange = false) {
    var k = "onChange";
    if (onSrcChange) {
      k = "onSrcChange";
    }
    updateStore[k].push(callback);
  }

        
export function triggerUpdate(src, id, isHistoryEvent = false) {
    if (!updateRunning) {
      var srcChanged = src != rf.src;
      if (srcChanged || id != rf.id) {
        updateRunning = true;
        if (!isHistoryEvent) {
          registerThreadVisit(rf);
          if (opts.history) {
            updateBrowserHistory();
          }
        }
        setCurrent(src, id, srcChanged);
  
        triggerCallbacks(srcChanged);
        updateTimeout();
      }
    }
  }     
  
  export function triggerTranslate(lang){
    if(setUserSelectedLang(lang)){
      for (let [textkey, elms] of Object.entries(translStore)) {
          elms.forEach((elm) => {
          updateTextElm(elm, textkey);
          });
        }
    }   
}

export function build(){
    resolveOrigin().then((data)=>{
        rf.src = opts.src;
        rf.id = opts.id;
        dt.all = data;
        dt.thread = getThreadData(data, opts.id);
    
      
        if (opts.history) {
            registerBrowserEvent();
            }
    })
}

