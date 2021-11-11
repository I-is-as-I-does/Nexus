
import { errorPrgr } from "../elms/NxMeta.js";

import { getContainer, loadAppCss, logEvent, opt, setup } from "./NxInstance.js";
import { activateBrowserHistory, resolveState, setOriginState, triggerUpdate } from "./NxState.js";

/*import { errorPrgr } from "../NxSharedBundle.js";
import { getContainer, loadAppCss, logEvent, opt, setup, activateBrowserHistory, resolveState, setOriginState } from "../NxCoreBundle.js";*/

export function Init(
  buildCallback,
  selector = null,
  options = null,
  useBrowserHistory = false,
  debug = false
) {
  if (setup(selector, options, debug)) {
    return loadAppCss()
      .then(() => {
        if (useBrowserHistory) {
          activateBrowserHistory();
        }
        getContainer().append(buildCallback());
        if (opt("src")) {
          return resolveState(opt("src"), opt("id")).then((state) => {
            setOriginState(state);
            triggerUpdate(state);
        })
        }
      }).catch((err) => {
        logEvent(err);
        getContainer().append(errorPrgr());
      } );
  }
  return Promise.reject();
}
