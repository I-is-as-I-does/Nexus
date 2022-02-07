
import { initAll, retrieveNxElm } from "@i-is-as-i-does/nexus-core/src/load/NxInit.js";
import { getQuery } from "@i-is-as-i-does/nexus-core/src/base/NxHost.js";
import { setOriginLang } from "@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js";
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog.js";
import { dataToState, setOriginState } from './NxState.js'
import { editorElms } from "./../editor/NxEditor.js";
import { viewerElms } from "./../viewer/NxViewer.js";
import { errorPrgr } from "./NxCommons.js";
import { appDefaultCss } from "./NxCdn.js";


function mountApp(nxElm, appElm){
    var host = document.createElement('DIV');
    host.className = "nx";
    host.append(appElm)
    nxElm.append(host)
}

export function init(){
    initAll({appDefaultLang: 'en', appDefaultCss: appDefaultCss}).then(seed => {
        setOriginLang(seed.request.lang)
        seed.state = dataToState(seed.request.url, seed.request.id, seed.nxdata)
        setOriginState(seed.state)
        var elm;
        seed.editMode = false
        if(getQuery("edit") || getQuery("new")){
          seed.editMode = true
         elm = editorElms(seed);
        } else {
         elm = viewerElms(seed);
        }

      mountApp(seed.nxelm, elm)

    }).catch((err)=> {
        logErr(err.message);
        mountApp(retrieveNxElm(), errorPrgr())
      })
}