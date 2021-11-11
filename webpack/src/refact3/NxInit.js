import { NxState } from "./NxState.js";
import { NxInstance } from "./NxInstance.js";

export function initPage(contentCallback){

    var render = function(success, state){
      NxInstance.getHost().append(contentCallback(success, state));
  };
  NxInstance.loadAppCss().then(()=> {
    if(NxInstance.opt('src')){
        return NxState.resolveState(NxInstance.opt('src'), NxInstance.opt('id'));
    } else {
       return null;
    }
  }).then((state)=> {
    if(state){
      NxState.setOriginState(state);    
    }
    render(true, state);
  }).catch((err)=> {
    NxInstance.logEvent(err);
    render(false, null);
  });
  }