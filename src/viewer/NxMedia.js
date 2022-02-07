
import { threadTextElm } from "./NxThread.js";
import { getElm } from "../browser/NxCommons.js";
import { resolveMedia } from "@i-is-as-i-does/nexus-core/src/data/NxMedia.js";


function threadMediaElm(threadData, countReady) {
  var  mediaContainer = getElm("DIV", 'nx-media');

  var mediaWrap = getElm("DIV");
  mediaContainer.append(mediaWrap)

  var captionElm = null
  if(threadData.content.media.caption){
    captionElm = threadTextElm(threadData, ["content", "media", "caption"])
    mediaContainer.append(captionElm)
  }

  mediaWrap.addEventListener('mediaReady', function(){
      if(mediaWrap.firstChild.tagName === 'A' && threadData.content.media.type !== 'page'){
        threadData.content.media.type = 'page';
      }
      mediaWrap.className = "nx-" + threadData.content.media.type + "-media";
      if(countReady !== null){
        countReady()
      }
    })
   resolveMedia(threadData.content.media.url, threadData.content.media.type, mediaWrap)
  return mediaContainer
}

export function mediaElm(threadData, countReady = null) {
  var mediadiv = getElm("DIV", "nx-content-media");
    mediadiv.append(threadMediaElm(threadData, countReady));
  return mediadiv;
}
