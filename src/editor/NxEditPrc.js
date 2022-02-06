/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
import { escapeRegExp, replaceDiacritics } from "@i-is-as-i-does/jack-js/src/modules/Help.js";
import { getSrcData, getThreadsList } from "@i-is-as-i-does/nexus-core/src/load/NxSrc.js";
import { selectDropDown } from "../viewer/NxCommons.js";
import { urlPattern } from "@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js";

const providers = ["youtube", "vimeo", "soundcloud"];
const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
};

export function resolveMediaType(val) {
  for (var p = 0; p < providers.length; p++) {
    if (val.includes(providers[p])) {
      return providers[p];
    }
  }
  var ext = val.split(".").pop();
  for (let [type, exts] of Object.entries(guessMap)) {
    if (exts.includes(ext)) {
      return type;
    }
  }

  return "page";
}

export function convertToId(title) {
    return replaceDiacritics(title.trim().replace(/[\s_]/, "-"));
  }

  /*
export function updateDistantDropdown(input, url, valid){
 
    var prc = function(items = []){  
      var ndropdown = selectDropDown(items,input,null,"nx-edit-select-linked");
     // input.nextSibling.replaceWith(ndropdown.lastChild);
      console.log()
    };
 
    if(!url || !valid){
      prc();
      return;
      }
    getSrcData(url).then((data)=> {
      prc(getThreadsList(data));
    }).catch(() => {
      input.pattern = urlPattern+"(?<!"+escapeRegExp(url)+")";
      input.dispatchEvent(new window.Event('change'));
    });
  }
*/
  
  export function newState(data, url = "nexus-tmp", id = "/", idx = -1){
    return {
      dataUrl: url,
      srcData: data,
      threadId: id,
      threadIndex: idx,
    };
  }
  