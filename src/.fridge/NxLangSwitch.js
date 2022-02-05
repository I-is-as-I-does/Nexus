function appHeader() {
    var header = getElm('HEADER');
    header.append(appLink(), langDropDown());
    return header;
  }
  
  function langDropDown() {
    //@todo add in editor only
    var toggle = getElm('P');
    toggle.textContent = getLang();
    return selectDropDown(getAvailableLangs(), toggle, function(nlang){
      triggerTranslate(nlang);
    }, "nx-lang-switch");
  }