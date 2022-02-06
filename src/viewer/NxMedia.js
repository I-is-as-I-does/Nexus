/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { easeIn } from "@i-is-as-i-does/valva/src/modules/aliases.js";
import { threadTextElm } from "./NxThread.js";
import { getElm } from "./NxCommons.js";
import { resolveMedia } from "@i-is-as-i-does/nexus-core/src/data/NxMedia.js";

function threadMediaCaption(threadData) {
  return threadTextElm(threadData, ["content", "media", "caption"]);
}

function setThreadMedia(mediaWrap, threadData) {
  mediaWrap.style.display = 'none'
  if (threadData && threadData.content.media.type) {   
    mediaWrap.addEventListener('mediaReady', function(){
      if(mediaWrap.firstChild.tagName === 'A' && threadData.content.media.type !== 'page'){
        threadData.content.media.type = 'page';
      }
      mediaWrap.className = "nx-" + threadData.content.media.type + "-media";
      easeIn(mediaWrap, 200)
    })
   resolveMedia(threadData.content.media.url, threadData.content.media.type, mediaWrap)
  }
}

export function mediaElm(mediaWrap, threadData) {
  var mediadiv = getElm("DIV", "nx-content-media");
  mediaWrap = getElm("DIV");
  setThreadMedia(threadData);
  mediadiv.append(mediaWrap, threadMediaCaption(threadData));

  return mediadiv;
}
