
export function embedCheckbox(embedInput) {
    var checkbx = document.createElement("INPUT");
    checkbx.type = "checkbox";
    checkbx.name = "embed-toggle";
    checkbx.checked = true;
    var label = document.createElement("LABEL");
    label.for = "embed-toggle";
    var text = "embed";
    label.textContent = text;
    NxNimrod.registerTextElm(label, text);
    checkbx.addEventListener("click", () => {
      var repl = ["false", "true"];
      if (embedInput.dataset.embed == "true") {
        repl.reverse();
        embedInput.dataset.embed = "false";
      } else {
        embedInput.dataset.embed = "true";
      }
      embedInput.textContent = embedInput.textContent.replace(
        "data-embed=" + repl[0],
        "data-embed=" + repl[1]
      );
    });
    var wrap = document.createElement("div");
    wrap.append(checkbx, label);
    return wrap;
  }

  
export function srcLink(dataSrc) {
  var srcLink = actionLink("open", "↗", dataSrc);
  srcLink.target = "_blank";
  srcLink.href = dataSrc;
  NxThalamus.registerUpdateEvt(function (e) {
    srcLink.href = e.dataSrc;
  }, true);
  return srcLink;
}