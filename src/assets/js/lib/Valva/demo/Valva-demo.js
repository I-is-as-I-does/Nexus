import * as Valva from "../Valva.js";

function getHeader(text, num = 2) {
  let hd = document.createElement("H" + num);
  hd.textContent = text;
  return hd;
}
function getLabel(text) {
  let lab = document.createElement("LABEL");
  lab.textContent = text;
  return lab;
}
function getNumInp(val = 200) {
  var inp = document.createElement("INPUT");
  inp.type = "number";
  inp.value = val;
  return inp;
}
function getCheckbox() {
  var ck = document.createElement("INPUT");
  ck.type = "checkbox";
  return ck;
}
function getBtn(text) {
  var btn = document.createElement("BUTTON");
  btn.textContent = text;
  return btn;
}
function getDiv(text) {
  var div = document.createElement("DIV");
  div.textContent = text;
  return div;
}

function getOption(text) {
  var opt = document.createElement("OPTION");
  opt.textContent = text;
  return opt;
}

function genText() {
  var content = "I'm an element of random height. ";
  var num = randomInt(10, 25);
  return content.repeat(num);
}

function getLi(text) {
  var li = document.createElement("LI");
  li.textContent = text;
  return li;
}
function getcallback(txt) {
  var sp = document.createElement("SPAN");
  sp.textContent = txt;
  return sp;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getSelect() {
  var select = document.createElement("SELECT");
  return select;
}

var rdnElm = getDiv(genText());

var select1 = getSelect();
var anmtn = [
  "easeToggle",
  "timedEaseToggle",
  "easeIn",
  "easeOut",
  "fadeToggle",
  "timedFadeToggle",
  "fadeIn",
  "fadeOut",
  "slideToggle",
  "timedSlideToggle",
  "slideDown",
  "slideUp",
];
anmtn.forEach((am) => {
  select1.append(getOption(am));
});

var duratinp = getNumInp(200);
var delayinp = getNumInp(400);
delayinp.disabled = true;

var callbackinp = getCheckbox();

var tranbtn = getBtn("Trigger");
var callbackbox = document.createElement("DIV");
callbackbox.append(getcallback("..."));

var callbt = ["I'm a callback!", "But you, what are you?"];
var ci = 0;
var fCallback = function () {
  var idx = ci;
  ci = 0;
  if (idx === 0) {
    ci = 1;
  }
  Valva.replaceDiversion(callbackbox.firstChild, getcallback(callbt[idx]));
};
var anim = select1.options[0].text;

select1.addEventListener("change", function () {
  anim = select1.options[select1.selectedIndex].text;
  if (anim.includes("ade")) {
    duratinp.disabled = true;
  } else {
    duratinp.disabled = false;
  }
  if (anim.substr(0, 4) === "time") {
    delayinp.disabled = false;
  } else {
    delayinp.disabled = true;
  }
});

tranbtn.addEventListener("click", function () {
  if (anim) {
    var dely = false;
    if (!delayinp.disabled) {
      dely = delayinp.value;
    }
    var callb = null;
    if (callbackinp.checked) {
      callb = fCallback;
    }
    if (duratinp.disabled) {
      if (dely !== false) {
        return Valva[anim](rdnElm, dely, callb);
      }
      return Valva[anim](rdnElm, callb);
    }
    var durt = duratinp.value;
    if (dely !== false) {
      return Valva[anim](rdnElm, durt, dely, callb);
    }
    return Valva[anim](rdnElm, durt, callb);
  }
});

var list = document.createElement("UL");
list.append(getLi("I'm a list item"));

var select2 = getSelect();

["Prepend", "Append"].forEach((ac) => {
  select2.append(getOption(ac));
});

var easeBox = getCheckbox();
var divrbtn = getBtn("Insert");

var lic = 0;
var diversion = null;

divrbtn.addEventListener("click", function () {
  diversion = select2.options[select2.selectedIndex].text;
  if (diversion) {
    var ease = easeBox.checked;
    lic++;
    if (diversion == "Append") {
      Valva.insertDiversion(
        list,
        getLi("I'm just another list item"),
        false,
        ease,
        200
      );
    } else {
      Valva.insertDiversion(
        list,
        getLi("I'm a list item, again"),
        true,
        ease,
        200
      );
    }
  }
});

var replcbtn = getBtn("Replace");
replcbtn.addEventListener("click", function () {
  Valva.replaceDiversion(
    list.childNodes[randomInt(0, lic)],
    getLi("I'm a new list item!"),
    200
  );
});

var spFlidx = 1;
var spFlTexts = [
  "A Little from Column A, a Little from Column B",
  "A Day Late and a Dollar Short",
  "Fight Fire With Fire",
  "Wake Up Call",
  "It's Not All It's Cracked Up To Be",
  "Keep Your Eyes Peeled",
];
var splitFlapdiv = getDiv(spFlTexts[0]);
var splitFlapbtn = getBtn("SplitFlap");
var splitFlapinpt = getNumInp(20);

splitFlapbtn.addEventListener("click", function () {
  var text = spFlTexts[spFlidx];
  spFlidx++;
  if (spFlidx === 6) {
    spFlidx = 0;
  }
  Valva.splitFlap(splitFlapdiv, text, splitFlapinpt.value);
});

document.body.append(
  getHeader("Vâlvă", 1),
  getHeader("Fade Slide Ease", 2),
  rdnElm,
  getLabel("Animation"),
  select1,
  getLabel("Duration"),
  duratinp,
  getLabel("Delay"),
  delayinp,
  getLabel("Callback"),
  callbackinp,
  tranbtn,
  callbackbox,
  getHeader("Append Prepend Replace", 2),
  list,
  select2,
  getLabel("Ease"),
  easeBox,
  divrbtn,
  replcbtn,
  getHeader("Split Flap", 2),
  splitFlapdiv,
  getLabel("Speed"),
  splitFlapinpt,
  splitFlapbtn
);
