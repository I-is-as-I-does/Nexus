/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { getHost, setContainer } from "../base/NxContainer.js";
import { loadAppCss } from "./NxStyle.js";
import { getOpt, getQuery, setOptions } from "../base/NxOptions.js";
import { consoleLog, setLogMode } from "../logs/NxLog.js";
import { resolveState, setOriginState } from "../state/NxUpdate.js";
import { instanceWrap, errorPrgr } from "../../viewer/NxCommons.js";
import { editorElms } from "../../editor/NxEditor.js";
import { viewerElms } from "../../viewer/NxViewer.js";


export function initPage(containerSelector = null, options = null){
  setContainer(containerSelector);
  setOptions(options);

  if(getQuery('log')){
    setLogMode(true);
}

  return loadAppCss().then(()=> {
   
    if(getOpt('src')){
        return resolveState(getOpt('src'), getOpt('id'));
    } else {
       return {};
    }
  }).then((state)=> {
    if(state.srcData){
      setOriginState(state);    
    }
    var elms;
    if(getQuery("edit")){
      elms = editorElms(state);
    } else {
      elms = viewerElms(state);
    }
      getHost().append(instanceWrap(elms));
  }).catch((err)=> {
    consoleLog(err);
      getHost().append(errorPrgr());
   
  });
  }