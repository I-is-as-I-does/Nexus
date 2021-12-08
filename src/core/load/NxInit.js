import { getHost, setContainer } from "../base/NxContainer.js";
import { loadAppCss } from "./NxStyle.js";
import { getOpt, setOptions } from "../base/NxOptions.js";
import { consoleLog } from "../logs/NxLog.js";
import { resolveState, setOriginState } from "../state/NxUpdate.js";
import { instanceWrap, errorPrgr } from "../../viewer/NxCommons.js";
import { editorElms } from "../../editor/NxEditorInstance.js";
import { viewerElms } from "../../viewer/NxViewerInstance.js";


export function initPage(containerSelector = null, options = null){
  setContainer(containerSelector);
  setOptions(options);

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
    if(getOpt("edit")){
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