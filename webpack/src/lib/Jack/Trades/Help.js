export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function charCut(string, limit) {
  if (string.length > limit) {
    string = string.substr(0, limit - 5) + "(...)";
  }
  return string;
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
