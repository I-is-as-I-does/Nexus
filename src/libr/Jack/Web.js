/* Jack Js | (c) 2021 I-is-as-I-does | MIT License */

export function loadJs(signatureVar, url) {
  if (!window[signatureVar]) {
    return new Promise((resolve, reject) => {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.onload = () => resolve(script);
      script.onerror = () => reject("unable to load " + url);
      script.src = url;
      document.body.append(script);
    });
  } else {
    return Promise.resolve(true);
  }
}

export function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

export function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

export function oembedLink(url, provider, maxwidth = null, maxheight = null) {
  provider = provider.toLowerCase();
  var map = {
    youtube: "https://youtube.com/oembed?url=",
    vimeo: "https://vimeo.com/api/oembed.json?url=",
    soundcloud: "https://soundcloud.com/oembed?format=json&url=",
  };
  if (map.hasOwnProperty(provider)) {
    var url = map[provider] + encodeURIComponent(url);
    if (maxwidth != null) {
      url += "&maxwidth=" + maxwidth;
    }
    if (maxheight != null) {
      url += "&maxheight=" + maxheight;
    }
    return url;
  }

  return false;
}

export function oembedResponse(oembedLink){
  return loadJson(oembedLink).then((response) => {
    if (response && response.hasOwnProperty("html")) {
      return response;
    }
    throw "invalid oembed response";
  });
}

export function oembedIframe(oembedResponse){
  //@doc: rebuilding iframe elm for super safe dom insertion
      var url = oembedResponse.html.split('src="')[1].split('"')[0];
      var iframe = document.createElement('IFRAME');
      iframe.width = oembedResponse.width;
      iframe.height = oembedResponse.height;
      iframe.frameborder = "no";
      iframe.scrolling="no";
      iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowfullscreen = true;
      iframe.title = oembedResponse.title;
      iframe.src = url;
      return iframe;
}

export function pathBasename(path) {
  return path.split(/[\\/]/).pop();
}
export function pageHasSheet(signatureRule, url) {
  if (document.styleSheets.length) {
    var basename = pathBasename(url);
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheetUrl = document.styleSheets[i].href;
      if (sheetUrl) {
        if (sheetUrl == url || pathBasename(sheetUrl) == basename) {
          return true;
        }
        if (sheetUrl.startsWith(window.location.origin) && document.styleSheets[i].hasOwnProperty('cssRules')) {
          var rules = document.styleSheets[i].cssRules;

          for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText == signatureRule) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

export function loadCss(signatureRule, url, shadowRootElm = null) {

  if (shadowRootElm || !pageHasSheet(signatureRule, url)) {
    return new Promise((resolve, reject) => {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.onload = resolve;
      link.onerror = reject;
      link.href = url;
      if (shadowRootElm) {
        shadowRootElm.append(link);
      } else {
        document.head.append(link);
      }
       
    });
  } else {
    return Promise.resolve(true);
  }
}

export function loadPagePreviewImg(url, useCache = true) {
  //@doc: this is SLOW and MUST be used with parcimony without an API key
  if (isValidHttpUrl(url)) {
    var callback = function (imgsrc) {
      var img = document.createElement("IMG");
      img.src = imgsrc;
      return img;
    };
    if (useCache) {
      var imgsrc = localStorage.getItem("preview-" + url);
      if (imgsrc) {
        return Promise.resolve(callback(imgsrc));
      }
    }
    return loadJson(
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=" +
        url +
        "&screenshot=true"
    ).then((response) => {
      if (
        response.lighthouseResult &&
        response.lighthouseResult.audits &&
        response.lighthouseResult.audits["final-screenshot"] &&
        response.lighthouseResult.audits["final-screenshot"].details &&
        response.lighthouseResult.audits["final-screenshot"].details.data
      ) {
        var imgsrc =
          response.lighthouseResult.audits["final-screenshot"].details.data;
        if (useCache) {
          localStorage.setItem("preview-" + url, imgsrc);
        }
        return callback(imgsrc);
      }
      return Promise.reject(404);
    });
  }
  return Promise.reject(400);
}

export function conciseUrl(string, withPath = true) {
  var base = string.replace(/^(https?:\/\/)?/, "").split("/");
  string = base[0];
  if (withPath && base.length > 1) {
    if (base.length > 2) {
      string += "/...";
    }
    var last = base.pop();
    if (last.length > 18) {
      last = "..." + last.substring(-15);
    }
    string += "/" + last;
  }
  return string;
}

export function miniUrl(string) {
  var parts = string
    .replace(/^(https?:\/\/)?(www.)?/, "")
    .split(":")[0]
    .split("/")[0]
    .split(".");

  for (var p = 0; p < parts.length; p++) {
    if (parts[p].includes("-")) {
      parts[p] = parts[p]
        .split("-")
        .map((p) => p[0])
        .join("-");
    } else {
      var strar = parts[p].split("");
      var pass = 0;
      for (var i = 0; i < strar.length; i++) {
        if (["a", "e", "i", "o", "u", "y"].includes(strar[i])) {
          if (pass !== 0 && i !== pass + 1) {
            strar[i] = "";
          } else {
            pass = i;
          }
        }
      }
      parts[p] = strar.join("");
    }
  }
  return parts.join(".");
}

export function searchUrlParam(name) {
  //@todo : test
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
}

export function toLastSlash(url){
  if(url.lastIndexOf('/') < 8 && url.substring(0,4) == "http"){
url += "/";
  }
 return url.substring(0,url.lastIndexOf('/')+1);
}
