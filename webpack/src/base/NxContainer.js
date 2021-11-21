import { consoleLog } from "../logs/NxLog.js";
import { defaultSelector } from "./NxDefaults.js";
import { setOptions } from "./NxOptions.js";

var container;
var host;
var shadow;

export function setContainer(selector = null) {

    if(!container){
    if(!selector){
        selector = defaultSelector;
    }
    container = document.querySelector(selector);
   
    if (!container) {
      container = document.createElement("DIV");
      document.body.append(container);
    } else if (container.dataset) {
     
            setOptions(Object.assign({},container.dataset));
    }
    host = document.createElement('DIV');
    host.className = "nexus";
  
    shadow = container.attachShadow({ mode: "open" });
    shadow.append(host);
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

  export function getShadow() {
    if(!shadow){
      setContainer();
    }
      return shadow;
    }