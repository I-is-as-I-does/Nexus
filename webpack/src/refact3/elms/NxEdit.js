import { charMinMax, idPattern, supportedMediaTypes } from "../NxConstants.js";
import { NxState } from "../NxState.js";
import { NxMemory } from "../NxMemory.js";
import { NxTranslate } from "../NxTranslate.js";
import {
  baseViewLink,
  blockWrap,
  getElm,
  selectDropDown,
  setHistoryControls,
  setToggleOnDisplay,
  toggleNavEnd,
} from "./NxMeta.js";
import {
  easeIn,
  easeOut,
  elmIsHidden,
  insertDiversion,
} from "../../libr/Valva/Valva.js";
import { replaceDiacritics } from "../../libr/Jack/Trades/Help.js";

const editBuffer = NxState.getBuffertime();
const editHistoryMax = 10;
const providers = ["youtube", "vimeo", "soundcloud"];
const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
};
var editState = {
  dataUrl: "NxEdit",
  srcData: null,
  threadId: "/",
  threadIndex: -1,
};
var upDownEvent = new CustomEvent("IndexChange");
var redoRunning = false;
var actCtrls = {
  ctrls: {
    prev: { symbol: "↶", elm: null },
    next: { symbol: "↷", elm: null },
  },
  position: 0,
  count: 1,
};
var lastAction = [];
var editIndex = null;
var editLocal = null;
var editDistant = null;
var btnSymbols = {
  up: "↑",
  down: "↓",
};

function moveItem(from, to) {
  editState.srcData.index.splice(
    to,
    0,
    editState.srcData.index.splice(from, 1)[0]
  );
  editState.srcData.threads.splice(
    to,
    0,
    editState.srcData.threads.splice(from, 1)[0]
  );
}

function toggleActiveBtn(id, btn) {
  var idx = editState.srcData.index.indexOf(id);

  if (idx == 0) {
    btn["up"].disabled = true;
  } else {
    btn["up"].disabled = false;
  }
  if (idx + 1 == editState.srcData.index.length) {
    btn["down"].disabled = true;
  } else {
    btn["down"].disabled = false;
  }
}
function permuteThread(goingUp, goingDown) {
  editIndex.removeChild(goingUp);
  editIndex.insertBefore(goingUp, goingDown);
  goingDown.dispatchEvent(upDownEvent);
  goingUp.dispatchEvent(upDownEvent);
}

function moveItemHandler(li, it, id) {
  var act = function (redo) {
    var idx = editState.srcData.index.indexOf(id);
    var isUp = it == "up";
    if (!redo) {
      isUp = !isUp;
    }
    if (isUp && idx != 0) {
      moveItem(idx, idx - 1);
      permuteThread(li, li.previousSibling);
    } else if (!isUp && idx + 1 != editState.srcData.index.length) {
      moveItem(idx, idx + 1);
      permuteThread(li.nextSibling, li);
    }
  };

  setLastAction(act);
  act(true);
}
function setMoveBtns(li, id) {
  var dv = getElm("DIV", "nx-edit-move");
  var btn = {
    up: null,
    down: null,
  };
  li.addEventListener("IndexChange", function () {
    toggleActiveBtn(id, btn);
  });
  Object.keys(btn).forEach((it) => {
    btn[it] = getElm("BUTTON");
    btn[it].type = "button";
    btn[it].textContent = btnSymbols[it];
    dv.append(btn[it]);

    btn[it].addEventListener("click", function () {
      moveItemHandler(li, it, id);
    });
  });
  toggleActiveBtn(id, btn);
  li.append(dv);
}

function formCategory(name, subcount) {
  var p = getElm("P", "nx-edit-category");

  for (var i = 0; i < subcount; i++) {
    var sp = getElm("SPAN", "nx-edit-category-indent");
    sp.textContent = "|";
    p.append(sp);
  }
  var txtsp = getElm("SPAN");
  txtsp.textContent = NxTranslate.getTxt(name);
  NxState.registerTranslElm(txtsp, name);
  p.append(txtsp);
  return p;
}

function convertToId(name) {
  return replaceDiacritics(name.trim().replace(/[\s_]/, "-"));
}

function threadLocalForm(idx, nameCallback) {
  var form = getElm("FORM", "nx-thread-local-form");

  form.append(inputElm(["threads", idx, "name"], nameCallback));
  form.append(inputElm(["threads", idx, "description"]));

  form.append(formCategory("record", 1));

  ["timestamp", "main", "aside"].forEach((field) => {
    form.append(inputElm(["threads", idx, "record", field]));
  });

  form.append(formCategory("media", 2));

  var tcallback = function (val) {
    guessMediaType(form, val);
  };
  form.append(inputElm(["threads", idx, "record", "media", "url"], tcallback));
  ["type", "caption"].forEach((field) => {
    form.append(inputElm(["threads", idx, "record", "media", field]));
  });

  return form;
}

function deleteLinkBtn() {
  var btn = getElm("BUTTON", "nx-delete-link");
  btn.type = "button";
  btn.textContent = "-";
  return btn;
}

function addLinkBtn(form, id) {
  var btn = getElm("BUTTON", "nx-add-link");
  btn.type = "button";
  btn.textContent = "+";
  btn.addEventListener("click", () => {
    var idx = editState.srcData.index.indexOf(id);
    var act = function (redo) {
      if (redo) {
        var i = editState.srcData.threads[idx].linked.length;
        editState.srcData.threads[idx].linked.push({ url: "http", id: "/" });
        appendLinkInputs(form, idx, i);
      } else {
        editState.srcData.threads[idx].linked.pop();
        easeOut(form.lastChild, 200, function () {
          form.lastChild.remove();
        });
      }
    };

    setLastAction(act);
    act(true);
  });
  return btn;
}

function appendLinkInputs(form, idx, i) {
  var linkwrap = getElm("DIV", "nx-distant-link");
  ["url", "id"].forEach((field) => {
    insertDiversion(
      linkwrap,
      inputElm(["threads", idx, "linked", i, field]),
      false,
      true,
      200
    );
  });
  var dltBtn = deleteLinkBtn();
  var delwrap = getElm('DIV','nx-distant-link-action');
  delwrap.append(dltBtn);
  linkwrap.append(delwrap);
  dltBtn.addEventListener("click", () => {
    var act = function (redo) {
      if (redo) {
        easeOut(linkwrap, 200, function () {
          linkwrap.remove();
        });
      } else {
        if (i == editState.srcData.threads[idx].linked.length - 1) {
          insertDiversion(form, linkwrap, false, true, 200);
        } else {
          var nextSibling = form.childNodes[i];
          form.insertBefore(linkwrap, nextSibling);
          easeIn(linkwrap, 200);
        }
      }
    };
    setLastAction(act);
    act(true);
  });
  form.append(linkwrap);
}

function threadDistantForm(idx, id) {
  var form = getElm("FORM", "nx-thread-distant-form");

  var linked = editState.srcData.threads[idx].linked;

  if (linked.length) {
    for (var i = 0; i < linked.length; i++) {
      appendLinkInputs(form, idx, i);
    }
  }
  var formCnt = getElm("DIV");
  formCnt.append(form, addLinkBtn(form, id));
  return formCnt;
}

function threadLi(idx, id, form) {
  var li = getElm("LI");

  li.append(form);

  if (editState.threadId != id) {
    li.style.display = "none";
  }
  NxState.registerUpdateEvt(function (newState) {
    if (newState.dataUrl == editState.dataUrl) {
      editState = newState;
      var isHidden = elmIsHidden(li);
      if (newState.threadId == id && newState.threadIndex == idx && isHidden) {
        setTimeout(function () {
          easeIn(li, 200);
        }, 200);
      } else if (!isHidden) {
        easeOut(li, 200);
      }
    }
  });
  return li;
}

function guessMediaType(form, val) {
  var item = form.querySelector(
    ".nx-select-list li[data-item=" + resolveMediaType(val) + "]"
  );
  if (item) {
    item.click();
  }
}

function resolveMediaType(val) {
  for (var p = 0; p < providers.length; p++) {
    if (val.includes(providers[p])) {
      return providers[p];
    }
  }
  var ext = val.split(".").pop();
  for (let [type, exts] of Object.entries(guessMap)) {
    if (exts.includes(ext)) {
      return type;
    }
  }

  return "page";
}
function stateUpdate(idx, id) {
  var newState = Object.assign({}, editState);
  newState.threadId = id;
  newState.threadIndex = idx;
  return newState;
}
function indexLink(idx, id) {
  var itemState = stateUpdate(idx, id);
  var indLk = baseViewLink(itemState, false);
  setToggleOnDisplay(indLk, itemState);

  indLk.addEventListener("click", () => {
    /*  var prevState = Object.assign({}, editState);
    var act = function(redo){
      var state = itemState;
      if(!redo){
        state = prevState;
      }
      NxState.triggerUpdate(state);
    }
    setLastAction(act);*/
    NxState.triggerUpdate(itemState);
  });

  return indLk;
}

function setThread(idx, id) {
  var indexLi = getElm("LI");
  var indLk = indexLink(idx, id);

  indexLi.append(indLk);
  setMoveBtns(indexLi, id);

  var nameCallback = function (val) {
    var newId = convertToId(val);
    indLk.firstChild.textContent = newId;
    setNewValue(["threads", idx, "id"], newId);
  };

  var localLi = threadLi(idx, id, threadLocalForm(idx, nameCallback));

  var distantLi = threadLi(idx, id, threadDistantForm(idx, id));
  localLi.append(deleteThreadElm(localLi, distantLi, id));

  editIndex.append(indexLi);
  editLocal.append(localLi);
  editDistant.append(distantLi);
}

function setLastAction(callback) {
  if (actCtrls.position != actCtrls.count - 1) {
    lastAction.splice(actCtrls.position);
    actCtrls.count = lastAction.length + 1;
  }
  if (actCtrls.count === editHistoryMax) {
    lastAction.splice(0, 1);
  } else {
    actCtrls.count++;
  }

  lastAction.push(callback);
  actCtrls.position = actCtrls.count - 1;
  toggleNavEnd(actCtrls);
}

function deleteEvent(localLi, distantLi, id) {
  var idx = editState.srcData.index.indexOf(id);
  var indexNode = editIndex.childNodes[idx];
  var len = editState.srcData.index.length;
  var map = {
    index: id,
    threads: editState.srcData.threads[idx],
  };

  var act = function (redo) {
    if (redo) {
      NxState.triggerUpdate(stateUpdate(-1, "/"));
      Object.keys(map).forEach((field) => {
        editState.srcData[field].splice(idx, 1);
      });
      [distantLi, localLi, indexNode].forEach((elm) => {
        easeOut(elm, 200, function () {
          elm.remove();
        });
      });
      if (len > 1) {
        if (idx === 0) {
          indexNode.nextSibling.dispatchEvent(upDownEvent);
        } else if (idx === len - 1) {
          indexNode.previousSibling.dispatchEvent(upDownEvent);
        }
      }
    } else {
      Object.keys(map).forEach((field) => {
        editState.srcData[field].splice(idx, 0, map[field]);
      });
      if (idx < len - 1) {
        var next = editIndex.childNodes[idx];
        editIndex.insertBefore(indexNode, next);
        if (idx === 0) {
          next.dispatchEvent(upDownEvent);
        }
      } else {
        editIndex.append(indexNode);
        if (len > 1) {
          indexNode.previousSibling.dispatchEvent(upDownEvent);
        }
      }
      easeIn(indexNode, 200);
      editLocal.append(localLi);
      editDistant.append(distantLi);
      indexNode.firstChild.click();
    }
  };
  setLastAction(act);
  act(true);
}

function deleteThreadElm(localLi, distantLi, id) {
  var btn = getElm("BUTTON", "nx-delete-thread");
  btn.type = "button";
  btn.textContent = NxTranslate.getTxt("del");
  NxState.registerTranslElm(btn, "del");
  btn.addEventListener("click", function () {
    deleteEvent(localLi, distantLi, id);
  });
  return btn;
}

function setAuthorValue(ref, value) {
  if (!editState.srcData.author) {
    editState.srcData.author = {};
  }
  editState.srcData.author[ref[1]] = value;
  return;
}

function setThreadIndex(ref) {
  if (!editState.srcData.threads) {
    editState.srcData.threads = [];
  } else if (typeof editState.srcData.threads[ref[1]] === "undefined") {
    editState.srcData.threads[ref[1]] = {};
  }
}

function setThreadInfo(ref, value) {
  editState.srcData.threads[ref[1]][ref[2]] = value;
}

function setRecordValue(ref, value) {
  if (!editState.srcData.threads[ref[1]].record) {
    editState.srcData.threads[ref[1]].record = {};
  }
  if (ref[3] != "media") {
    editState.srcData.threads[ref[1]].record[ref[3]] = value;
    return;
  }
  if (!editState.srcData.threads[ref[1]].record.media) {
    editState.srcData.threads[ref[1]].record.media = {};
  }
  editState.srcData.threads[ref[1]].record.media[ref[4]] = value;
  return;
}

function setLinkedValue(ref, value) {
  if (!editState.srcData.threads[ref[1]].linked) {
    editState.srcData.threads[ref[1]].linked = [];
  } else if (
    typeof editState.srcData.threads[ref[1]].linked[ref[3]] === "undefined"
  ) {
    editState.srcData.threads[ref[1]].linked[ref[3]] = {};
  }
  editState.srcData.threads[ref[1]].linked[ref[3]][ref[4]] = value;
}

function setNewValue(ref, value) {
  if (!editState.srcData) {
    editState.srcData = {};
  }
  if (ref[0] == "author") {
    return setAuthorValue(ref, value);
  }
  setThreadIndex(ref);

  if (!["linked", "record"].includes(ref[2])) {
    return setThreadInfo(ref, value);
  }

  if (ref[2] == "record") {
    setRecordValue(ref, value);
  }
  setLinkedValue(ref, value);
}

function fieldValue(ref) {
  if (editState.srcData) {
    if (ref[0] == "author") {
      return editState.srcData[ref[0]][ref[1]];
    }

    if (!["linked", "record"].includes(ref[2])) {
      return editState.srcData.threads[ref[1]][ref[2]];
    }
    if (ref[2] == "record") {
      if (ref[3] != "media") {
        return editState.srcData.threads[ref[1]].record[ref[3]];
      }
      return editState.srcData.threads[ref[1]].record.media[ref[4]];
    }
    return editState.srcData.threads[ref[1]].linked[ref[3]][ref[4]];
  }
  return "";
}
function textInput(val) {
  var inp = getElm("INPUT", "nx-edit-text");
  inp.type = "text";
  inp.value = val;
  return inp;
}

function textareaInput(val) {
  var inp = getElm("TEXTAREA", "nx-edit-textarea");
  inp.textContent = val;
  return inp;
}
function dateInput(val) {
  var inp = getElm("INPUT");
  inp.type = "datetime-local";
  inp.value = val;
  return inp;
}

function baseLabel(field) {
  var lb = getElm("LABEL", "nx-edit-label");
  lb.for = field;
  var title = getElm("SPAN", "nx-edit-title");
  title.textContent = NxTranslate.getTxt(field);
  NxState.registerTranslElm(title, field);
  lb.append(title);
  return lb;
}


function inputElm(ref, callback = null) {
  var val = fieldValue(ref);

  var field = ref[ref.length - 1];
  var parent = ref[ref.length - 2];
  if (Number.isInteger(parent)) {
    parent = ref[ref.length - 3];
  }
  var inp;
  if (["about", "description", "main", "aside", "caption"].includes(field)) {
    inp = textareaInput(val);
  } else if (field == "timestamp") {
    inp = dateInput(val);
  } else {
    inp = textInput(val);
  }

  var hook = ref.join("-");
  inp.id = hook;
  inp.name = hook;
  if (
    ["handle", "name", "main", "id", "url", "type", "timestamp"].includes(field)
  ) {
    inp.required = true;
  }

  var lb = baseLabel(field);
  var indc = getElm("SPAN", "nx-edit-indication");
  var fdbck = invalidSp();
  lb.append(indc, fdbck);

  switch (field) {
    case "url":
      indc.textContent = "[http]";
      inp.pattern = "^https?://\\w+\\.\\w+.*";
      break;
    case "id":
      inp.pattern = idPattern;
      break;
    case "type":
      inp.pattern = "(" + supportedMediaTypes.join("|") + ")";
      break;
    case "timestamp":
      break;
    default:
      var minmax = charMinMax[field];
      indc.textContent = "[" + minmax[0] + "-" + minmax[1] + "]";
      inp.setAttribute("maxlength", minmax[1]);
      inp.setAttribute("minlength", minmax[0]);
  }

  setInputEvt(ref, inp, fdbck, callback);
  inputEvtHandler(ref, inp, fdbck, callback);

  var wrap = getElm("DIV", "nx-edit-input nx-edit-" + parent + "-" + field);
  wrap.append(lb);
  if (field == "type") {
    wrap.append(
      selectDropDown(supportedMediaTypes, inp, null, "nx-edit-media-type")
    );
  } else {
    wrap.append(inp);
  }

  return wrap;
}

function inputEvtHandler(ref, inp, fdbck, callback) {
  if (inp.checkValidity()) {
    setNewValue(ref, inp.value);
    if (typeof callback === "function") {
      callback(inp.value);
    }
    fdbck.textContent = "✓";
  } else {
    fdbck.textContent = "✗";
  }
}

function setInputEvt(ref, inp, fdbck, callback) {
  var undone = "";
  var prev = inp.value;
  inp.addEventListener("focus", function () {
    prev = inp.value;
  });
  inp.addEventListener("change", function () {
    inputEvtHandler(ref, inp, fdbck, callback);
    var act = function (redo) {
      if (redo) {
        inp.value = undone;
      } else {
        undone = inp.value;
        inp.value = prev;
      }
      inputEvtHandler(ref, inp, fdbck, callback);
    };
    setLastAction(act);
  });
}

function invalidSp() {
  var sp = getElm("SPAN", "nx-edit-feedback");
  return sp;
}

function triggerUndoRedo(ctrl) {
  if (!redoRunning) {
    var postn = actCtrls.position;
    var redo = false;
    if (ctrl == "next") {
      postn -= 1;
      redo = true;
    }

    lastAction[postn](redo);
    setTimeout(
      function () {
        redoRunning = false;
      }.bind(this),
      editBuffer
    );
  }
}

function authorForm() {
  var form = getElm("FORM", "nx-edit-author");
  ["handle", "url", "about"].forEach((field) => {
    form.append(inputElm(["author", field]));
  });

  return form;
}

export function editIndexBlock() {
  return blockWrap("index", null, [authorForm(), editIndex], true);
}
export function editLocalBlock() {
  return blockWrap("local", null, [editLocal], true);
}
export function editDistantBlock() {
  return blockWrap("distant", null, [editDistant], true);
}
export function setThreadsForms(state) {
  if (!state || !state.srcData) {
    var data = NxMemory.getStoredEditData();
    if (!data) {
      return;
    }
    state = {
      dataUrl: "NxEdit",
      srcData: data,
      threadId: "/",
      threadIndex: -1,
    };
  } else {
    NxMemory.registerEditData(state.srcData);
  }

  editIndex = getElm("UL", "nx-edit-index");
  editLocal = getElm("UL", "nx-edit-local");
  editDistant = getElm("UL", "nx-edit-distant");
  editState = state;

  var items = editState.srcData.index;
  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      setThread(i, items[i]);
    }
  }
}

export function editActions() {
  var wrp = getElm("DIV", "nx-edit-actions nx-history-nav");
  setHistoryControls(actCtrls, triggerUndoRedo);
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm); //@todo: save, new
  return wrp;
}

/*
function editBtn() {
  var btn = getElm("BUTTON", "nx-edit");
  btn.type = "button";
  btn.textContent = "✎";
  return btn;
}
  var act = function(redo){
      if (redo) {
        editState = state;
        var items = editState.srcData.index;
        if(items.length){
        for (var i = 0; i < items.length; i++) {
          setThread(i, items[i]);
        }
      }
      } else {
        editState ={
  dataUrl: "NxEdit",
  srcData: null,
  threadId: "/",
  threadIndex: -1,
};
[editIndex, editLocal].forEach(parent => {
  Array.from(parent.childNodes).forEach((elm) =>{
   easeOut(elm, 200,function(){
      elm.remove();
    })
  });
});
    
    } */

/*
function saveState() {
  NxMemory.registerEditData(editState.srcData);
  registerVersion();


}

function registerVersion() {
  if (actCtrls.count > 4) {
    editHistory.splice(0, 1);
  }
  actCtrls.count++;
  actCtrls.position++;

  editHistory.push(editState);
  toggleNavEnd(actCtrls);
}
*/

/*  editbtn.addEventListener('click', function(){
    editbtn.disabled = true;
    savebtn.disabled = false;
    ["handle", "url", "about"].forEach(field => {
        inputs[field].disabled = false;
  
    });
  });*/
