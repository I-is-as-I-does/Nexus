class Utils {

    pageHasSheet(signatureRule, url) {
        if (document.styleSheets.length) {
          var basename = this.basename(url);
          for (var i = 0; i < document.styleSheets.length; i++) {
            var sheetUrl = document.styleSheets[i].href;
            if (sheetUrl) {
              if (sheetUrl == url || this.basename(sheetUrl) == basename) {
                return true;
              }
              if (sheetUrl.startsWith(window.location.origin)) {
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
    
    basename(path) {
        return path.split(/[\\/]/).pop();
      }
    
     loadCss(signatureRule, url) {
        if (!this.pageHasSheet(signatureRule, url)) {
          return new Promise((resolve, reject) => {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.onload = resolve;
            link.onerror = reject;
            link.href = url;
            document.head.append(link);
          });
        } else {
          return Promise.resolve(true);
        }
      }
    
     loadJs(signatureVar, url) {
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
    
     storageAvailable(type) {
        var storage;
        try {
          storage = window[type];
          var x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            (e.code === 22 ||
              e.code === 1014 ||
              e.name === "QuotaExceededError" ||
              e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            storage &&
            storage.length !== 0
          );
        }
      }


      elmHasStyle(targElm, prop){
        if(targElm.getAttribute("style") && targElm.getAttribute("style").indexOf(prop+":") != -1){
            return true;
        }
        return false;
      }
      
      smoothToggle(targElm, callback) {
       if(!this.elmHasStyle(targElm, 'transition')){
        targElm.style.transition = "all 0.2s ease-in-out";
       }

        targElm.style.opacity = 0;
        setTimeout(function(){
          callback();
          targElm.style.opacity = 1;
        },300);
    
      }
    
      
    isHidden(elm) 
    {
        if(!elm)
            return false;
        do 
        {
            if(!(elm instanceof Element))
                continue
                if (elm.hidden){
                  return true;
                }
            var style = window.getComputedStyle(elm);
            if (style.width == "0" || style.height == "0" || style.opacity == "0" || style.display == "none" || style.visibility == "hidden")
            {
                return true;
            }
        } while ((elm = elm.parentNode));
        return false;
    }
    
    searchUrlParam(name) {
      //@todo : test
      var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.href);
      if (results == null) {
        return null;
      } else {
        return results[1] || 0;
      }
    }
    }
    