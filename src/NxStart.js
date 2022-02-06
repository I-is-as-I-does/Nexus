/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { initAll, retrieveNxElm } from "@i-is-as-i-does/nexus-core/src/load/NxInit.js";
import { getQuery } from "@i-is-as-i-does/nexus-core/src/base/NxHost.js";
import { setOriginLang } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js";
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog.js";
import { dataToState, setOriginState } from './NxState.js'
// import { editorElms } from "./editor/NxEditor.js";
import { viewerElms } from "./viewer/NxViewer.js";
import { instanceWrap, errorPrgr } from "./viewer/NxCommons.js";

const appDefaultCss = 'https://cdn.jsdelivr.net/gh/I-is-as-I-does/Nexus@latest/dist/css/NexusI.min.css'

function mountApp(nxElm, appElm){
    var host = document.createElement('DIV');
    host.className = "nx";
    host.append(appElm)
    nxElm.append(host)
}

export function init(){
    initAll({appDefaultLang: 'en', appDefaultCss: appDefaultCss}).then(seed => {
        setOriginLang(seed.request.lang)
        var state = dataToState(seed.request.url, seed.request.id, seed.nxdata)
        setOriginState(state)
        var elm;
        if(getQuery("edit")){
         // elms = editorElms(state);
         elm = viewerElms(state);
        } else {
         // elms = viewerElms(state);
         elm = errorPrgr()
        }

      // mountApp(seed.nxelm, instanceWrap(elm))
      mountApp(seed.nxelm, elm)
    }).catch((err)=> {
        logErr(err.message);
        mountApp(retrieveNxElm(), errorPrgr())
      })
}