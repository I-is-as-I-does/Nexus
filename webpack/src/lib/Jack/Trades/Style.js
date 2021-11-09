export function nonRenderedElmHeight(elm) {
  var clone = elm.cloneNode(true);
  clone.style.visibility = "hidden";
  document.append(clone);
  var height = clone.offsetHeight;
  document.removeChild(clone);
  return height;
}

export function elmHasStyle(elm, property) {
  if (
    elm.getAttribute("style") &&
    elm.getAttribute("style").indexOf(property + ":") != -1
  ) {
    return true;
  }
  return false;
}

//@doc: strenghts = 1,2,3
export function cssExtract(strength = 2) {
  var s = {
    tags: [],
    ids: [],
    classes: [],
    combos: [],
  };
  var fs = "";
  var loopcall = function (elms, prev = " ") {
    Array.from(elms).forEach((elm) => {
      var tag = elm.tagName.toLowerCase();
      var nprev;
      if (strength > 2) {
        nprev = prev + tag;
      }

      if (!s.tags.includes(tag)) {
        s.tags.push(tag);
      }
      if (strength > 2 && !s.tags.includes(nprev)) {
        s.tags.push(nprev);
      }
      if (elm.id) {
        s.ids.push("#" + elm.id);
      }
      if (elm.classList.length) {
        elm.classList.forEach((classn) => {
          if (!s.classes.includes("." + classn)) {
            s.classes.push("." + classn);
          }
          if (strength > 1 && !s.combos.includes(tag + "." + classn)) {
            s.combos.push(tag + "." + classn);
          }
          if (strength > 2 && !s.combos.includes(nprev + "." + classn)) {
            s.combos.push(nprev + "." + classn);
          }
          if (elm.id && !s.combos.includes("#" + elm.id + "." + classn)) {
            s.combos.push("#" + elm.id + "." + classn);
          }
        });
      }
      if (tag != "html" && elm.children.length) {
        loopcall(elm.children, tag + " ");
      }
    });
  };

  document.addEventListener(
    "DOMContentLoaded",
    function () {
      setTimeout(function () {
        loopcall([document.querySelector("html"), document.body]);
        for (let [k, v] of Object.entries(s)) {
          fs += "/*" + k + "*/\r\n";
          v.forEach((itm) => {
            fs += itm + " {\r\n}\r\n";
          });
        }
        var outputElm = document.createElement("TEXTAREA");
        outputElm.textContent = fs;
        document.body.append(outputElm);
      }, 3000);
    },
    false
  );
}
