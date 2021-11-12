import { splitFlap } from "../libr/Valva/Valva.js";
import { NxMemory } from "./NxMemory.js";
import { NxTranslate } from "./NxTranslate.js";
import { NxInstance } from "./NxInstance.js";


class State {
  #bufferTime;
  #currentState;
  #translStore;
  #updateStore;
  #updateRunning;
  constructor(
  ) {

    this.#bufferTime = 800;

    this.#currentState = {
      dataUrl: null,
      srcData: null,
      threadId: "/",
      threadIndex: -1
    };
    
    this.#translStore = {};
    this.#updateStore = { onChange: [], onSrcChange: [] };
    this.#updateRunning = false;

    if(NxInstance.opt('history')){
      this.#registerBrowserEvent()
    }
  }

  #registerBrowserEvent() {
    window.onpopstate = (event) => {
      if (
        event.state &&
        event.state.src &&
        event.state.id &&
        event.state.ix
      ) {
        var newState = event.state;
        newState.srcData = NxMemory.getStoredData(event.state.src);
        this.triggerUpdate(newState, false);
      }
    };
  }

  #updateBrowserHistory() {
  var ref = {
    id: this.#currentState.threadId,
    src: this.#currentState.dataUrl,
    ix: this.#currentState.threadIndex
  };
  history.replaceState(ref, "");
  history.pushState(ref, "");
}

#triggerCallbacks(srcChanged) {
  var ks = ["onChange"];
  if (srcChanged) {
    ks.push("onSrcChange");
  }

  ks.forEach((k) => {
    if (this.#updateStore[k].length) {
      this.#updateStore[k].forEach((callback) => {
        callback(this.#currentState);
      });
    }
  });
}

#updateTimeout() {
  setTimeout(
    function () {
      this.#updateRunning = false;
    }.bind(this),
    this.#bufferTime
  );
}

#updateTextElm(elm, textkey) {
  splitFlap(elm, NxTranslate.getTxt(textkey), 50);
}

resolveState(dataUrl, threadId) {
  return NxInstance.getSrcData(dataUrl).then((data) => {
    var state = {
      dataUrl: dataUrl,
      threadId: threadId,
      srcData: data,
      threadIndex: data.index.indexOf(threadId)
    };

    if (state.threadIndex === -1 && threadId !== "/") {
      state.threadId = "/";
    }
    return state;
  });
}

registerTranslElm(elm, textkey) {
  if (!this.#translStore[textkey]) {
    this.#translStore[textkey] = [];
  }
  this.#translStore[textkey].push(elm);
}

registerUpdateEvt(callback, onSrcChange = false) {
  var k = "onChange";
  if (onSrcChange) {
    k = "onSrcChange";
  }
  this.#updateStore[k].push(callback);
}

triggerUpdate(state, skipHistoryUpdate = false) {
  if (!this.#updateRunning) {
    var srcChanged = state.dataUrl != this.#currentState.dataUrl;
    if (srcChanged || state.threadId != this.#currentState.threadId) {
      this.#updateRunning = true;
      if (!skipHistoryUpdate) {
        NxMemory.registerThreadVisit(this.#currentState);
        if (NxInstance.opt('history')) {
          this.#updateBrowserHistory();
        }
      }
      this.#currentState = state;

      this.#triggerCallbacks(srcChanged);
      this.#updateTimeout();
    }
  }
}

triggerTranslate(lang) {
  if (NxTranslate.setUserSelectedLang(lang)) {
    for (let [textkey, elms] of Object.entries(this.#translStore)) {
      elms.forEach((elm) => {
        this.#updateTextElm(elm, textkey);
      });
    }
  }
}

getCurrentState() {
  return this.#currentState;
}

setOriginState(state) {
  if (!this.#currentState.dataUrl) {
    this.#currentState = state;
    return true;
  }
  return false;
}


}

export var NxState = new State();