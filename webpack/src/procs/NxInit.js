/*
import { errorPrgr } from "../elms/shared/NxMeta.js";

import { getContainer, loadAppCss, logEvent, opt, setup } from "./NxInstance.js";
import { activateBrowserHistory, resolveState, setOriginState } from "./NxState.js";
*/
import { errorPrgr } from "../NxSharedBundle.js";
import { getContainer, loadAppCss, logEvent, opt, setup, activateBrowserHistory, resolveState, setOriginState } from "../NxCoreBundle.js";

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

        if (opt("src")) {
          return resolveState(opt("src"), opt("id"));
        } else {
          return Promise.resolve({});
        }
      })
      .then((state) => {
        if (state != false) {
          setOriginState(state);
        }
        getContainer().append(buildCallback(state));
      })
      .catch((err) => {
        logEvent(err);
        getContainer().append(errorPrgr());
      } );
  }
  return Promise.reject();
}
