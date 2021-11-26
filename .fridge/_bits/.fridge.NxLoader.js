
/*
var doneLoadingEvt = new CustomEvent("Done");
dispatchEvent(doneLoadingEvt);
*/
export function loader() {
    var texts = ["|", "|..."];
    var dv = document.createElement("DIV");
    dv.classList.add("nx-loader");
    dv.textContent = texts[0];
    var idx = 1;
    var intr = setInterval(function () {
      splitFlap(dv, texts[idx], 100);
      if (idx === 1) {
        idx = 0;
      } else {
        idx++;
      }
    }, 400);
    dv.addEventListener("Done", function () {
      clearInterval(intr);
    });
    return dv;
  }
