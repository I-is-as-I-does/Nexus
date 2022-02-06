/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { logErr } from "../logs/NxLog.js";
import { defaultSelector } from "./NxDefaults.js";
import { setOptions } from "./NxOptions.js";

var container;
var host;


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
    setOptions(containerOpts);

    host = document.createElement('DIV');
    host.className = "nx";
    container.append(host);
} else {
logErr("Nexus | container already set");
}
}
export function getHost() {
  if(!host){
    setContainer();
  }
    return host;
  }