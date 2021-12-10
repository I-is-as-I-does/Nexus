export class ssituDragDropper {

  constructor(options) {
    var defaults = {
      wrapid: "drag-dropper",
      accept: "application/json,image/jpeg,image/gif,image/png,image/x-icon,image/svg+xml,image/tiff,image/webp,image/bmp",
      loadCallback: function (file) {
        this.autoDisplay(file);
      }.bind(this),
      rejectCallback: function () {
        console.log("file type not accepted");
      },
      width: 250,
      height: 150,
    };
    if (!options) {
      options = defaults;
    } else {
      for (let [idx, val] of Object.entries(defaults)) {
        if (!options.hasOwnProperty(idx)) {
          options[idx] = val;
        }
      }
    }

    this.wrap = document.getElementById(options.wrapid);
    if (this.wrap) {
      this.options = options;
      this.accepted = options.accept.replace(' ', '').split(",");
      this.#load();
    } else {
      console.log("ssituDragDropper require wrap element");
    }
  }

  #load() {
    return Promise.resolve(this.#setCss())
      .then(() => Promise.resolve(this.#setHtml()))
      .then(() => this.#listen());
  }

  #listen() {
    this.input = document.querySelector(
      "#" + this.options.wrapid + " .ssitu-drag-drop input"
    );
    this.overlay = document.querySelector(
      "#" + this.options.wrapid + " .ssitu-drag-drop section"
    );
    this.dropIcon = document.querySelector(
      "#" + this.options.wrapid + " .ssitu-drag-drop svg"
    );
    this.dragoverClass = "drag-dropper-over";

    this.input.addEventListener("change", (e) => this.#onFileInput(e));

    ["dragstart", "dragenter", "dragover", "dragleave", "drag", "drop"].forEach(
      (evt) =>
        document.body.addEventListener(evt, function (e) {
          e.preventDefault();
          e.stopPropagation();
        })
    );
    ["dragenter", "dragleave", "drop", "click"].forEach((evt) =>
      this.overlay.addEventListener(evt, (e) => this.#handleTargetEvent(e))
    );
  }

  #setCss() {
    var style = document.createElement("style");
    style.innerHTML = this.#cssTmplt();
    document.head.appendChild(style);
  }

  #cssTmplt() {
    var svgMiddle = (this.options.height - 20) / 2;
    var svgCenter = (this.options.width - 20) / 2;
    return `
    .ssitu-drag-drop * {
        box-sizing: border-box;
    }
    .ssitu-drag-drop {
      width: ${this.options.width}px;
      height: ${this.options.height}px;
      display:block;
      cursor: pointer;
      border: 1px dashed #c1c1c1;
      position:relative;
    }
    .ssitu-drag-drop svg {       
        position:relative;
        top:${svgMiddle}px;
        left:${svgCenter}px;
        opacity:1;
        transition:opacity 0.2s ease-in-out;
    }
    .ssitu-drag-drop .ssitu-hide {
      opacity:0;
    }
    .ssitu-drag-drop section {
        width: 100%;
        height: 100%;  
        display: flex;  
        position: absolute;
        top: 0;
        left: 0;
        background-color: transparent;
        transition:all 0.2s linear;
      }
      .ssitu-drag-drop section p {
        margin:auto;
        font-family:'Lucida Console', Monaco, 'Courier New', Courier, monospace;
        font-size:12px; 
      }
    .drag-dropper-over, .ssitu-drag-drop section:hover {
        background-color: rgb(225 225 225 / 45%);
      }
      .ssitu-drag-drop img {
        margin:auto;
        max-width:${this.options.width}px;
        max-height:${this.options.height}px;
      }
      `;
  }

  #setHtml() {
    this.wrap.innerHTML = this.#htmlTmplt();
  }

  #htmlTmplt() {
    return ` 
        <div class="ssitu-drag-drop">
        <input type="file" accept="${this.options.accept}" id="drag-dropper-file" name="drag-dropper-file" hidden>
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="4,5 1,5 1,9 2,9 2,6 4,6"></polygon><polygon points="1,16 2,16 2,18 4,18 4,19 1,19"></polygon><polygon points="14,16 14,19 11,19 11,18 13,18 13,16"></polygon><rect fill="none" stroke="#000" x="5.5" y="1.5" width="13" height="13"></rect><rect x="1" y="11" width="1" height="3"></rect><rect x="6" y="18" width="3" height="1"></rect></svg>
        <section></section>
        </div>    
        `;
  }

  #onFileInput(e) {
    if (e.target.files) {
      this.#handleFile(e.target.files[0]);
    }
  }

  #handleFile(file) {
    if (this.accepted.includes(file.type)) {
      this.options.loadCallback(file);
    } else {
      this.options.rejectCallback();
    }
  }
  #handleTargetEvent(e) {
    switch (e.type) {
      case "click":
        e.preventDefault();
        e.stopPropagation();
        this.input.click();
        break;
      case "dragenter":
        this.overlay.classList.add(this.dragoverClass);
        break;
      case "dragleave":
        this.overlay.classList.remove(this.dragoverClass);
        break;
      case "drop":
        var files = e.dataTransfer.files;
        if (files.length) {
          this.input.files = files;
          this.#handleFile(files[0]);
        }

        this.overlay.classList.remove(this.dragoverClass);

        break;
      default:
    }
  }
  showDropIcon() {
    this.dropIcon.classList.remove("ssitu-hide");
  }
  hideDropIcon() {
    this.dropIcon.classList.add("ssitu-hide");
  }

  displayContent(content) {
    this.hideDropIcon();
    this.overlay.style.opacity = 0;
    setTimeout(
      function () {
        var prev = this.overlay.firstChild;
        if (prev) {
          this.overlay.removeChild(prev);
        }
        this.overlay.append(content);
        this.overlay.style.opacity = 1;
      }.bind(this),
      300
    );
  }

  autoDisplay(file) {
    if (file.type.includes("image")) {
      this.displayImg(file);
    } else {
      this.displayFilename(file);
    }
  }

  displayFilename(file) {
    var p = document.createElement("P");
    p.textContent = file.name;
    this.displayContent(p);
  }

  displayImg(file) {
    var reader = new FileReader();
    reader.onload = (e) => this.onImgReaderLoad(e);
    reader.readAsDataURL(file);
  }

  onImgReaderLoad(e) {
    var img = new Image();
    img.onload = () => this.displayContent(img);
    img.src = e.target.result;
  }
}
