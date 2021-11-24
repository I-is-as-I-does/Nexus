
// load file, save file
// add thread btn / func
// switch to preview = fixed state (when deleted especially)

import { charMinMax, idPattern, supportedMediaTypes } from "../../validt/NxSpecs.js";
import {
  baseViewLink,
  blockWrap,
  getElm,
  selectDropDown,
  setHistoryControls,
  setToggleOnDisplay,
  toggleNavEnd,
} from "../NxCommons.js";
import {
  diversionToggle,
  easeIn,
  easeOut,
  insertDiversion,
  replaceDiversion,
  splitFlap,
  timedFadeToggle
} from "../../libr/Valva/Valva.js";
import { randomString, replaceDiacritics } from "../../libr/Jack/Help.js";
import { getBuffertime, registerUpdateEvt, triggerUpdate } from "../../state/NxUpdate.js";
import { registerTranslElm } from "../../transl/NxElmTranslate.js";
import { getTxt } from "../../transl/NxCoreTranslate.js";
import {getStoredEditData, registerEditData } from "../../storg/NxMemory.js";
import { validData } from "../../validt/NxStamper.js";
import { getHost } from "../../base/NxContainer.js";
import { newData, newThread } from "./NxStarters.js";



const editBuffer =getBuffertime();
const editHistoryMax = 10;
const providers = ["youtube", "vimeo", "soundcloud"];
const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
};
var editState = {
  dataUrl: "nx-edit",
  srcData: null,
  threadId: "/",
  threadIndex: -1,
};
var upDownEvent = new CustomEvent("IndexChange");
var prcRunning = false;
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
var authorForm;
var btnSymbols = {
  up: "↑",
  down: "↓",
};
var saveBtn;
var actionFdbck;
var authorInputs = {
"handle":null,
"url":null,
"about":null
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
  txtsp.textContent = getTxt(name);
registerTranslElm(txtsp, name);
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



function addThreadBtn(){
  var btn = addBtn();
  btn.addEventListener('click', function(){

        var randomId = randomString(10);  
        var idx = editState.srcData.index.length; 
        editState.srcData.threads.push(newThread(randomId));
        editState.srcData.index.push(randomId);
        var map = threadElms(idx, randomId);
      
        ['local','distant'].forEach(k => {
          map[k].parent.append(map[k].child);
        });
       
        insertDiversion( map.index.parent, map.index.child, false, true, 200);
        editIndex.childNodes[idx-1].dispatchEvent(upDownEvent);     
        saveBtn.disabled = false;
  });

   return btn;
}

function addLinkAct(form, idx){
 
  return function (redo) {
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
}

function addBtn() {
  var btn = getElm("BUTTON", "nx-add-link");
  btn.type = "button";
  btn.textContent = "+";
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
  var addBtnElm = addBtn();
  addBtnElm.addEventListener("click", () => {
    var idx = editState.srcData.index.indexOf(id);
    var act = addLinkAct(form, idx);
    setLastAction(act);
    act(true);
  

  });

  formCnt.append(form, addBtnElm);
  return formCnt;
}

function threadLi(id, form) {
  var li = getElm("LI");

  li.append(form);

  if (editState.threadId != id) {
    li.style.display = "none";
  }
 registerUpdateEvt(function (newState) {
 
    if (newState.dataUrl == "nx-edit") {
      editState = newState;
      if (newState.threadId == id) {
        setTimeout(function () {
          easeIn(li, 200);
        }, 200);
      } else {
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
   var nidx = editState.srcData.index.indexOf(id);

triggerUpdate(stateUpdate(nidx, id),true);
  });

  return indLk;
}

function threadElms(idx, id){
  var map =  {
    'index':{"parent":editIndex, "child":null, "link":null },
    'local':{"parent":editLocal, "child":null,"del":null},
    'distant':{"parent":editDistant, "child":null}};

      map.index.child = getElm("LI");
      map.index.link = indexLink(idx, id); 
         map.index.child.append(map.index.link);
         setMoveBtns(map.index.child, id);
     
         var nameCallback = function (val) {
           var newId = convertToId(val);
           map.index.link.firstChild.textContent = newId;
           setNewValue(["threads", idx, "id"], newId);
         };
         map.distant.child =threadLi(id, threadDistantForm(idx, id));
         map.local.child =threadLi(id, threadLocalForm(idx, nameCallback));

         map.local.del = deleteThreadElm(map.local.child, map.distant.child, id);
         map.local.child.append(map.local.del);

         return map;
}


function setThread(idx, id) {
  var map = threadElms(idx, id);
  Object.values(map).forEach(elmSet => {
      elmSet.parent.append(elmSet.child);
  });
 
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
  saveBtn.disabled = false;
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
     
      Object.keys(map).forEach((field) => {
        editState.srcData[field].splice(idx, 1);
      });

      editState.threadId = '/';
      editState.threadIndex = -1;

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
  btn.textContent = getTxt("del");
registerTranslElm(btn, "del");
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
  title.textContent = getTxt(field);
registerTranslElm(title, field);
  lb.append(title);
  return lb;
}


function inputElm(ref, callback = null, store = null) {
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
if(store){
  store[field] = inp;
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
  if (!prcRunning) {
    var postn = actCtrls.position;
    var redo = false;
    if (ctrl == "next") {
      postn -= 1;
      redo = true;
    }

    lastAction[postn](redo);
    setTimeout(
      function () {
        prcRunning = false;
      }.bind(this),
      editBuffer
    );
    saveBtn.disabled = false;
  }
}

function setAuthorForm() {
  authorForm = getElm("FORM", "nx-edit-author");
  ["handle", "url", "about"].forEach((field) => {
    authorForm.append(inputElm(["author", field], null,authorInputs));
  });
}

function setSaveBtn(){
  saveBtn = getElm('BUTTON', 'nx-save');
  saveBtn.type= "button";
  saveBtn.textContent = "🖫";
  saveBtn.disabled = true;
  saveBtn.addEventListener('click', function(){
    if(!saveBtn.disabled){
      registerEditData(editState.srcData);
      saveBtn.disabled = true;
      displayFeedback("saved");
    }
   
  });

}

function downloadBtn(){
  var dlBtn = getElm('BUTTON', 'nx-download');
  dlBtn.type= "button";
  dlBtn.textContent = "⭳";
  dlBtn.addEventListener('click', function(e){
      var data = Object.assign({}, editState.srcData);
      delete data.index;
      var check = validData(data);
      if(!check){
        displayFeedback('/!\\ invalid Nexus data');  
      }
      data = JSON.stringify(data,undefined,2);
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
      var anchor = getElm('A');
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute("download", "Nexus.json");
      getHost().appendChild(anchor); 
      anchor.click();
      anchor.remove();
  });
return dlBtn;
}
function newState(data){
  return {
    dataUrl: "nx-edit",
    srcData: data,
    threadId: "/",
    threadIndex: -1,
  }
}

function resetAuthorForm(){
  for(let [field, input] of Object.entries(authorInputs)){
  input.value = editState.srcData.author[field];
  }
}

function resetData(nData){
  var prevData = editState.srcData;
  var change = function(data){
    if(editState.srcData.threads.length){
      [editIndex, editLocal, editDistant].forEach(parent => {
        Array.from(parent.childNodes).forEach(child=> {
          easeOut(child, 100, function(){
            child.remove();
          })
        })
      });
    }
  
    editState = newState(data);
    resetAuthorForm();
    setThreads();
  };
  var act = function(redo){
    if(redo){
      change(nData);
    }else {
      change(prevData);
    }
  };
  setLastAction(act);
  act(true);
 
}

function newDocumenBtn(){
  var newBtn = getElm('BUTTON', 'nx-new');
  newBtn.type= "button";
  newBtn.textContent = "🗋";
  newBtn.addEventListener('click', function(){
    resetData(newData());
   
});
return newBtn;
}


function displayFeedback(msg){
  splitFlap(actionFdbck, getTxt(msg), 20);
  setTimeout(function(){
splitFlap(actionFdbck, "", 20);
  },2000);
}

function setActionFeedback(){
actionFdbck = getElm('P','nx-action-feedback');

}


function editNav() {
  var wrp = getElm("DIV", "nx-edit-nav");
  setActionFeedback();
  setSaveBtn();
  var links = getElm('DIV');
  links.append(newDocumenBtn(), saveBtn, downloadBtn() );
wrp.append(links, actionFdbck);
  return wrp;
}
function editActions() {
  var wrp = getElm("DIV", "nx-edit-actions nx-history-nav");
  setHistoryControls(actCtrls, triggerUndoRedo);
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm);
  return wrp;
}

export function editIndexBlock() {
  setAuthorForm();
  return blockWrap("index", null, [authorForm, editIndex, addThreadBtn()], true);
}
export function editLocalBlock() {
  return blockWrap("local", null, [editLocal], true);
}
export function editDistantBlock() {
  return blockWrap("distant", null, [editDistant], true);
}

export function instanceSwitch(viewerInst, editInst){
  var btn = getElm("BUTTON","nx-edit-switch");
  btn.textContent ="👁";
  
  btn.addEventListener('click',function(){
      if(btn.textContent == "✎"){
          btn.textContent ="👁";
          replaceDiversion(viewerInst, editInst);
      } else {

          triggerUpdate(editState, true, true);
        
          btn.textContent ="✎";
          replaceDiversion(editInst, viewerInst);
      }
  
  });
  
  return btn;
  }


 export function editMenu(){
  var dv = getElm("DIV", "nx-edit-menu");

  dv.append(editNav(), editActions());
  return dv;
 } 

export function setThreadsForms(state) {
  if (!state || !state.srcData) {
    var data = getStoredEditData();
    if (!data) {
      data = newData();
    }
    state = newState(data);
  } else {
    state.dataUrl= "nx-edit";
registerEditData(state.srcData);
  }

  editIndex = getElm("UL", "nx-edit-index");
  editLocal = getElm("UL", "nx-edit-local");
  editDistant = getElm("UL", "nx-edit-distant");
  editState = state;
  setThreads();

}

function setThreads(){
  var items = editState.srcData.index;
  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      setThread(i, items[i]);
    }
  }
}

