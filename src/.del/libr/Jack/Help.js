/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function charCut(string, limit) {
  if (string.length > limit) {
    string = string.substring(0, limit - 5) + "(...)";
  }
  return string;
}

export function randomString(length = 10){ 
  var rpt = 1;
 if (length > 10) {
    rpt += Math.ceil(length/10);
  }
  var str = '';
 for(var i=0;i<rpt;i++){
   str += Math.random().toString(36).substring(2,10);
 }
 return str.substring(0,length);
}

export function waitForElmInDOM(elmSelector, parentElm = null) {
  if (!parentElm || !(parentElm instanceof Element)) {
    parentElm = document.body;
  }
  return new Promise((resolve) => {
    var elm = parentElm.querySelector(elmSelector);
    if (elm) {
      return resolve(elm);
    }

    var observer = new MutationObserver(() => {
      elm = parentElm.querySelector(elmSelector);
      if (elm) {
        observer.disconnect();
        resolve(elm);
      }
    });

    observer.observe(parentElm, {
      childList: true,
      subtree: true,
    });
  });
}


export function replaceDiacritics(text) {
  if (text == "" || text.length == 0) {
      return "";
  }
  var diactricMap = {
'À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','ă':'a','ą':'a',
'Ò':'O','Ó':'O','Ô':'O','Õ':'O','Õ':'O','Ö':'O','Ø':'O','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o',
'È':'E','É':'E','Ê':'E','Ë':'E','è':'e','é':'e','ê':'e','ë':'e','ð':'e','ę':'e',
'Ç':'C','ç':'c','ć':'c','č':'c',
'Ð':'D','đ':'d',
'ğ':'g',
'Ì':'I','Í':'I','Î':'I','Ï':'I','ì':'i','í':'i','î':'i','ï':'i',
'Ł':'L','ł':'l',
'Ñ':'N','ñ':'n','ń':'n',
'Š':'S','š':'s',
'Ù':'U','Ú':'U','Û':'U','Ü':'U','ù':'u','ú':'u','û':'u','ü':'u',
'Ÿ':'Y','ÿ':'y','ý':'y',
'Ž':'Z','ž':'z','Ż':'Z','ż':'z',
'ɶ':'oe','Œ':'OE','æ':'ae','Æ':'AE','ß':'ss'
  };
  var diactrics = Object.keys(diactricMap);
  for (var diactricIndex = 0; diactricIndex < diactrics.length; diactricIndex++) {
      var from = diactrics[diactricIndex];
      var to = diactricMap[from];
      text = text.replace(from, to);
  }
  return text;
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()/|[\]\\]/g, '\\$&');
}