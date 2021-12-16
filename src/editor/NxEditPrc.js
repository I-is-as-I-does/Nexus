/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { escapeRegExp, replaceDiacritics } from "../libr/Jack/Help.js";
import { getSrcData } from "../core/load/NxData.js";
import { selectDropDown } from "../viewer/NxCommons.js";
import { urlPattern } from "../core/validt/NxSpecs.js";


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

  

export function updateDistantDropdown(inputs, elms, url, valid){
 
    var prc = function(items = []){
  
      var id = inputs.id.value;
      if(!id || !items.includes(id)){
        inputs.id.value = '/';
      }

        items.unshift('/');
            
      inputs.id.pattern = "("+items.join("|")+")";
     
      var ndropdown = selectDropDown(items,inputs.id,null,"nx-edit-linked-id");
      elms.id.lastChild.replaceWith(ndropdown);
  
    };
 
    if(!url || !valid){
      prc();
      return;
      }
    getSrcData(url).then((data)=> {

      prc(Array.from(data.index));
    }).catch(() => {
      inputs.url.pattern = urlPattern+"(?<!"+escapeRegExp(url)+")";
      inputs.url.dispatchEvent(new window.Event('change'));
    });
  }

  
  export function newState(data, url = "nexus-tmp", id = "/", idx = -1){
    return {
      dataUrl: url,
      srcData: data,
      threadId: id,
      threadIndex: idx,
    };
  }
  