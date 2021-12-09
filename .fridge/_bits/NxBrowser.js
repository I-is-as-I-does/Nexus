import { getStoredData } from "../storg/NxMemory.js";
import { triggerUpdate } from "./NxUpdate.js";

var listen = false;

export function registerBrowserEvent() {
    if(!listen){
        listen = true;
    window.onpopstate = (event) => {
      if (
        event.state &&
        event.state.src &&
        event.state.id &&
        event.state.ix
      ) {
        var newState = event.state;
        newState.srcData = getStoredData(event.state.src);
        triggerUpdate(newState, false);
      }
    };
}
  }

  export function updateBrowserHistory(currentState) {
  var ref = {
    id: currentState.threadId,
    src: currentState.dataUrl,
    ix: currentState.threadIndex
  };
  history.replaceState(ref, "");
  history.pushState(ref, "");
}