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

} from "../../libr/Valva/Valva.js";
import { replaceDiacritics } from "../../libr/Jack/Trades/Help.js";

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

var actCtrls = {
  ctrls: {
    prev: { symbol: "↶", elm: null },
    next: { symbol: "↷", elm: null },
  },
  position: 1,
  count: 1,
};
var lastAction;
var threadsIndex = null;
var threadsForms = null;
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
  threadsIndex.removeChild(goingUp);
  threadsIndex.insertBefore(goingUp, goingDown);
  goingDown.dispatchEvent(upDownEvent);
  goingUp.dispatchEvent(upDownEvent);
}

function moveItemHandler(li, it, id) {
  var idx = editState.srcData.index.indexOf(id);

  if (it == "up" && idx != 0) {
    moveItem(idx, idx - 1);
    permuteThread(li, li.previousSibling);
  } else if (it == "down" && idx + 1 != editState.srcData.index.length) {
    moveItem(idx, idx + 1);
    permuteThread(li.nextSibling, li);
  }
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

function threadForm(idx, nameCallback) {
  var form = getElm("FORM", "nx-thread-form");

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

function threadFormLi(idx, id, nameCallback) {
  var formLi = getElm("LI");

  formLi.append(threadForm(idx, nameCallback));

  if (editState.threadId != id) {
    formLi.style.display = "none";
  }
  NxState.registerUpdateEvt(function (newState) {
    if (newState.dataUrl == editState.dataUrl) {
      var isHidden = elmIsHidden(formLi);
      if (newState.threadId == id && newState.threadIndex == idx && isHidden) {
        setTimeout(function () {
          easeIn(formLi, 200);
        }, 200);
      } else if (!isHidden) {
        easeOut(formLi, 200);
      }
    }
  });
  formLi.append(deleteThreadElm(formLi, id));
  return formLi;
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
function stateUpdate(idx,id){
    var newState = Object.assign({}, editState);
    newState.threadId = id;
    newState.threadIndex = idx;
return newState;

}
function indexLink(idx, id) {
var itemState= stateUpdate(idx,id);
  var indLk = baseViewLink(itemState, false);
  //  indLk.textContent = id;
  setToggleOnDisplay(indLk, itemState);

  indLk.addEventListener("click", () => {
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
  var formLi = threadFormLi(idx, id, nameCallback);

  threadsIndex.append(indexLi);
  threadsForms.append(formLi);
}

function setLastAction(callback){
    lastAction = callback;
    actCtrls.count = 2;
    actCtrls.position = 2;
    toggleNavEnd(actCtrls);
}
function deleteThreadElm(formLi, id) {
  var btn = getElm("BUTTON", "nx-delete-thread");
  btn.type = "button";
  btn.textContent = NxTranslate.getTxt("del");
  NxState.registerTranslElm(btn, "del");
  btn.addEventListener("click", function () {
    var idx = editState.srcData.index.indexOf(id); //@doc cause could have been moved up/down
    var indexNode = threadsIndex.childNodes[idx];
    var siblingNode = indexNode.nextSibling;
    var previous = false;
    if(!siblingNode){
        siblingNode = indexNode.previousSibling;
        previous = true;
    }
    var data = editState.srcData.threads[idx];
   var act = function(redo){
        
        if(redo){
             NxState.triggerUpdate(stateUpdate(idx,'/'));
            editState.srcData.index.splice(idx,1); 
            editState.srcData.threads.splice(idx,1);  
          
 
            easeOut(indexNode, 200, function(){
                indexNode.remove();
            });
            easeOut(formLi, 200, function(){
                formLi.remove();
            });
        
        } else {
            editState.srcData.index.splice(idx, 0, id);
            editState.srcData.threads.splice(idx,0,data);  
            if(siblingNode && !previous){
            threadsIndex.insertBefore(indexNode, siblingNode);
            } else{
                threadsIndex.append(indexNode);
            }
            easeIn(indexNode, 200);

            threadsForms.append(formLi);
           NxState.triggerUpdate(stateUpdate(idx,id));
                  
        }     
        if(siblingNode){
            siblingNode.dispatchEvent(upDownEvent);
        }


    };
    setLastAction(act);
act(true);
   /* 
    easeOut(threadsIndex.childNodes[idx], 200, function () {
      threadsIndex.childNodes[idx].remove();
    });
    easeOut(formLi, 200, function () {
      formLi.remove();
    });
*/
  });
  return btn;
}

function editBtn() {
  var btn = getElm("BUTTON", "nx-edit");
  btn.type = "button";
  btn.textContent = "✎";
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
    var val = editState.srcData[ref[0]][ref[1]];
    if (ref[0] != "author") {
      val = val[ref[2]];
      if (["linked", "record"].includes(ref[2])) {
        val = val[ref[3]];
        if (ref[3] == "media" || ref[2] == "linked") {
          val = val[ref[4]];
        }
      }
    }
    return val;
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

  if (field == "url") {
    indc.textContent = "[http]";
    inp.pattern = "^https?://\\w+\\.\\w+.*";
  } else if (field == "type") {
    inp.pattern = "(" + supportedMediaTypes.join("|") + ")";
  } else if (field != "timestamp") {
    var minmax = charMinMax[field];
    indc.textContent = "[" + minmax[0] + "-" + minmax[1] + "]";
    inp.setAttribute("maxlength", minmax[1]);
    inp.setAttribute("minlength", minmax[0]);
    if (field == "id") {
      inp.pattern = idPattern;
    }
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


function inputEvtHandler(ref, inp, fdbck, callback){
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
    var undone = '';
    var prev = inp.value;
    inp.addEventListener("focus", function () {
        prev = inp.value;
});
    inp.addEventListener("change", function () {
        inputEvtHandler(ref, inp, fdbck, callback);
  var act = function(redo){
    if(redo){
        inp.value = undone;
    } else {
        undone= inp.value;
        inp.value= prev;
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

export function editActions() {
  var wrp = getElm("DIV", "nx-edit-actions");
  setHistoryControls(actCtrls, triggerUndoRedo);
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm); //@todo: save, new
  return wrp;
}

function triggerUndoRedo(position){
    if(typeof lastAction === 'function'){
       if(position === 1){
        lastAction(false);
        actCtrls.count++;
       } else{
        lastAction(true);
        actCtrls.count--;
       }
    }
    toggleNavEnd(actCtrls);
}
/*
function restoreVersion(position) {
  console.log(position);
  console.log(actCtrls.count);

  replaceDiversion(threadsIndex, editHistory[position].index);
  replaceDiversion(threadsForms, editHistory[position].threads);
  editState = editHistory[position].state;
  threadsIndex = editHistory[position].index;
  threadsForms = editHistory[position].threads;
}
*/
function authorForm() {
  var form = getElm("FORM", "nx-edit-author");
  ["handle", "url", "about"].forEach((field) => {
    form.append(inputElm(["author", field]));
  });

  return form;
}


export function editIndexBlock() {
  return blockWrap("index", null, [authorForm(), threadsIndex], true);
}
export function editThreadsBlock() {
  return blockWrap("local", null, [threadsForms], true);
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

  threadsIndex = getElm("UL", "nx-edit-index");
  threadsForms =getElm("UL", "nx-edit-thread");
  editState = state;
  var items = editState.srcData.index;

  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      setThread(i, items[i]);
    }
  }

}
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
