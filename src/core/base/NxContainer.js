import { consoleLog } from "../logs/NxLog.js";
import { defaultSelector } from "./NxDefaults.js";
import { setOptions } from "./NxOptions.js";

var container;
var host;

function dynmOpts(containerOpts){
var params = new URLSearchParams(window.location.search.slice(1));
["edit","debug", "history"].forEach(p => {
if(params.has(p)){
  containerOpts[p] = true;
}
});
        setOptions(containerOpts);
}

export function setContainer(selector = null) {

    if(!container){
    if(!selector){
        selector = defaultSelector;
    }
    container = document.querySelector(selector);
   
    var containerOpts = {};
    if (!container) {
      container = document.createElement("DIV");
      document.body.append(container);
    } else if (container.dataset) {    
      containerOpts = Object.assign(containerOpts,container.dataset);
    }
    dynmOpts(containerOpts);
    host = document.createElement('DIV');
    host.className = "nx";
    container.append(host);
} else {
consoleLog("Nexus | container already set");
}
}
export function getHost() {
  if(!host){
    setContainer();
  }
    return host;
  }