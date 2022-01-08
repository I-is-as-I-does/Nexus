/* reasons for removal: people could bookmark an url thinking it would display a distant nexus, when actually it would not */

import { getViewUrl, getOpt } from "../base/NxOptions.js";
import { resolveState, triggerUpdate } from "./NxUpdate.js";

export function listenToBrowserChange(){
  
    window.addEventListener('popstate', function (event) {
        if(event.state && event.state.hasOwnProperty("dataUrl") && event.state.hasOwnProperty("threadId")){
    
        resolveState(event.state.dataUrl, event.state.threadId).then(state => {
          triggerUpdate(state, true);
        })
    
      }
    });
    }

    
    export  function shouldUpdateBrowser(state){
    return state.dataUrl == getOpt("src");
     
   }
   
   export function updateBrowser(state){
   
     if(shouldUpdateBrowser(state)){
     var nextUrl = getViewUrl();
     var nextTitle = document.title;
     if(state.threadId !== '/'){
       nextUrl += "#"+state.threadId;
       nextTitle += "#"+state.srcData.threads[state.threadIndex].title;
     }
   
   var nextState = { threadId:state.threadId, dataUrl:state.dataUrl };
   
   window.history.pushState(nextState, nextTitle, nextUrl);
   window.history.replaceState(nextState, nextTitle, nextUrl);
   }
   }