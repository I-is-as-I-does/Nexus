

import { charMinMax, idPattern, distantIdPattern, supportedMediaTypes, urlPattern } from "../core/validt/NxSpecs.js";
import {
  landmarkElm,
  baseViewLink,
  blockWrap,
  getElm,
  selectDropDown,
  setHistoryControls,
  setToggleOnDisplay,
  toggleNavEnd,
  serviceWrap,
} from "../viewer/NxCommons.js";
import {
  easeIn,
  easeOut,
  insertDiversion,
  replaceDiversion,
  splitFlap,
} from "../libr/Valva/Valva.js";
import { randomString } from "../libr/Jack/Help.js";
import { getBuffertime, registerUpdateEvt, triggerUpdate } from "../core/state/NxUpdate.js";

import { getTxt } from "../core/transl/NxCoreTranslate.js";
import { getStoredEditData, registerEditData } from "../core/storg/NxMemory.js";
import { validData } from "../core/validt/NxStamper.js";
import { getHost } from "../core/base/NxContainer.js";
import { newData, newThread } from "./NxStarters.js";
import { loadSrcFile } from "../core/load/NxData.js";
import { dateInput, baseLabel, textareaInput, textInput, invalidSp, deleteLinkBtn, addBtn } from "./NxEditComps.js";
import { convertToId, updateDistantDropdown, newState, resolveMediaType } from "./NxEditPrc.js";
import { viewerElms } from "../viewer/NxViewer.js";


const editBuffer = getBuffertime();
const editHistoryMax = 10;

var editState = {
  dataUrl: "nexus-tmp",
  srcData: null,
  threadId: "/",
  threadIndex: -1,
};
var originData = null;


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
var saveBtn, resetBtn;
var actionFdbck;
var authorInputs = {
  "handle": null,
  "url": null,
  "about": null
};
var feedbackrun = null;
var instanceBtn;

var viewerInst;
var editInst;


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
    btn[it] = getElm("BUTTON", "nx-edit-move-" + it);
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


function threadLocalForm(idx, titleCallback) {
  var form = getElm("FORM", "nx-thread-local-form");

  var fieldset1 = getElm('FIELDSET');

  fieldset1.append(inputElm(["threads", idx, "title"], titleCallback));
  fieldset1.append(inputElm(["threads", idx, "description"]));


  var fieldset2 = getElm('FIELDSET');

  ["timestamp", "main", "aside"].forEach((field) => {
    fieldset2.append(inputElm(["threads", idx, "content", field]));
  });

  var fieldset3 = getElm('FIELDSET');
 

var typeInp = inputElm(["threads", idx, "content", "media", "type"]);
  var tcallback = function (val, valid) {
    if (valid) {
      var item = typeInp.querySelector(
        "[data-item=" + resolveMediaType(val) + "]"
      );
      if (item) {
        item.click();
      }
    }
  };
  fieldset3.append(inputElm(["threads", idx, "content", "media", "url"], tcallback));
  fieldset3.append(typeInp);
  fieldset3.append(inputElm(["threads", idx, "content", "media", "caption"]));

  form.append(landmarkElm("local thread"), fieldset1 , landmarkElm("content"), fieldset2, landmarkElm("media",2), fieldset3);
  return form;
}


function addThreadBtn() {
  var btn = addBtn();
  btn.addEventListener('click', function () {
   
    var randomId = randomString(10);
    var idx = editState.srcData.index.length;
    editState.srcData.threads.push(newThread(randomId));
    editState.srcData.index.push(randomId);
    var map = threadElms(idx, randomId);

    ['local', 'distant'].forEach(k => {
      map[k].parent.append(map[k].child);
    });

    var callb = null;
    if (editIndex.childNodes.length) {
      callb = function () {
        editIndex.childNodes[idx - 1].dispatchEvent(upDownEvent);
      };
    }
    insertDiversion(map.index.parent, map.index.child, false, true, 200, callb);
    saveBtn.disabled = false;

  });

  return btn;
}


function appendLinkInputs(form, idx, i) {
  var linkwrap = getElm("DIV", "nx-edit-distant-link");
  var elms = { url: null, id: null, list: getElm('DIV', 'nx-distant-ids') };
  var inputs = { id: null, url: null };
  elms["id"] = inputElm(["threads", idx, "linked", i, "id"], null, inputs);
  elms["url"] = inputElm(["threads", idx, "linked", i, "url"], function (val, valid) {
    updateDistantDropdown(inputs, elms, val, valid);
  }, inputs);

  Object.values(elms).forEach((elm) => {
    if (elm) {

      insertDiversion(
        linkwrap,
        elm,
        false,
        true,
        200
      );

    }
  });


  var dltBtn = deleteLinkBtn();
  var delwrap = getElm('DIV', 'nx-distant-link-action');
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
    var i = editState.srcData.threads[idx].linked.length;
    editState.srcData.threads[idx].linked.push({ url: "", id: "/" });
    appendLinkInputs(form, idx, i);
  });

  formCnt.append(landmarkElm("linked threads"),form, addBtnElm);
  return formCnt;
}

function threadLi(id, form) {
  var li = getElm("LI");

  li.append(form);

  if (editState.threadId != id) {
    li.style.display = "none";
  }
  registerUpdateEvt(function (nState) {

    if (nState.dataUrl == editState.dataUrl) {
      editState = nState;
      if (nState.threadId == id) {
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

    triggerUpdate(stateUpdate(nidx, id), true);
  });

  return indLk;
}

function setThread(idx, id,ease = false) {
  var map = threadElms(idx, id);
    for(let [k, elmSet] of Object.entries(map)){
      if(ease  && (k == "index" ||  id == editState.threadId)){
        insertDiversion(elmSet.parent, elmSet.child,false, true,200);
            }else {
              elmSet.parent.append(elmSet.child);
            }
           
    }
}
function threadElms(idx, id) {
  var map = {
    'index': { "parent": editIndex, "child": null, "link": null, "del": null },
    'local': { "parent": editLocal, "child": null },
    'distant': { "parent": editDistant, "child": null }
  };

  map.index.child = getElm("LI");
  map.index.link = indexLink(idx, id);
  map.index.child.append(map.index.link);
  setMoveBtns(map.index.child, id);

  var titleCallback = function (val, valid) {
    if (valid) {
      var newId = convertToId(val);
      map.index.link.firstChild.textContent = newId;
      setNewValue(["threads", idx, "id"], newId);
    }

  };
  map.distant.child = threadLi(id, threadDistantForm(idx, id));
  map.local.child = threadLi(id, threadLocalForm(idx, titleCallback));

  map.index.del = deleteThreadElm(map.local.child, map.distant.child, id);
  map.index.child.append(map.index.del);

  return map;
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
  btn.textContent = "-";

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

function setContentValue(ref, value) {
  if (!editState.srcData.threads[ref[1]].content) {
    editState.srcData.threads[ref[1]].content = {};
  }
  if (ref[3] != "media") {
    editState.srcData.threads[ref[1]].content[ref[3]] = value;
    return;
  }
  if (!editState.srcData.threads[ref[1]].content.media) {
    editState.srcData.threads[ref[1]].content.media = {};
  }
  editState.srcData.threads[ref[1]].content.media[ref[4]] = value;
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

  if (editState.srcData === null) {
    editState.srcData = {};
  }
  if (ref[0] == "author") {
    return setAuthorValue(ref, value);
  }
  setThreadIndex(ref);

  if (!["linked", "content"].includes(ref[2])) {
    return setThreadInfo(ref, value);
  }

  if (ref[2] == "content") {
    setContentValue(ref, value);
  }
  setLinkedValue(ref, value);
}

function fieldValue(ref) {
  if (editState.srcData) {
    if (ref[0] == "author") {
      return editState.srcData[ref[0]][ref[1]];
    }

    if (!["linked", "content"].includes(ref[2])) {
      return editState.srcData.threads[ref[1]][ref[2]];
    }
    if (ref[2] == "content") {
      if (ref[3] != "media") {
        return editState.srcData.threads[ref[1]].content[ref[3]];
      }
      return editState.srcData.threads[ref[1]].content.media[ref[4]];
    }
    return editState.srcData.threads[ref[1]].linked[ref[3]][ref[4]];
  }
  return "";
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
    ["handle", "title", "main", "id", "url", "type", "timestamp"].includes(field)
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
      inp.pattern = urlPattern;
      break;
    case "id":
      if (ref.includes('linked')) {
        inp.pattern = distantIdPattern;
      } else {
        inp.pattern = idPattern;
      }
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

  if (store) {
    store[field] = inp;
  }

  var wrap = getElm("DIV", "nx-edit-input nx-edit-" + parent + "-" + field);
  wrap.append(lb);
  if (field == "type" || (field == "id" && ref[2] == "linked")) {

    var items = [];
    if (field == "type") {
      items = supportedMediaTypes;
    } else {
      items = ['/'];
      if (val != '/') {
        items.push(val);
      }
    }
    wrap.append(
      selectDropDown(items, inp, null, "nx-edit-" + ref[2] + "-" + field)
    );
  } else {
    wrap.append(inp);
  }

  setInputEvt(ref, inp, fdbck, callback);
  inputEvtHandler(ref, inp, fdbck, callback);

  return wrap;
}

function inputEvtHandler(ref, inp, fdbck, callback) {
  var valid = false;

  if (inp.checkValidity()) {
    valid = true;
    setNewValue(ref, inp.value);
    fdbck.textContent = "✓";
  } else {
    fdbck.textContent = "✗";
  }
  if (typeof callback === "function") {
    callback(inp.value, valid);
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
    authorForm.append(inputElm(["author", field], null, authorInputs));
  });
}

function setSaveBtn() {
  saveBtn = getElm('BUTTON', 'nx-save');
  saveBtn.type = "button";
  saveBtn.textContent = "🖫";
  saveBtn.disabled = true;
  saveBtn.addEventListener('click', function () {
    if (!saveBtn.disabled) {
      
      registerEditData(editState.dataUrl, editState.srcData);    
      displayFeedback("saved");
      saveBtn.disabled = true;
      setResetStatus();
    }
  });

}

function setResetStatus(){
  var disb = true;

  if(originData != JSON.stringify(editState.srcData)){
    disb = false;
  } 
  if(resetBtn.disabled !== disb){
    resetBtn.disabled = disb;
  }

}

function setResetBtn(){
resetBtn = getElm('BUTTON', 'nx-reset');
  resetBtn.type = "button";
  resetBtn.textContent = "⭯";

  setResetStatus();
  resetBtn.addEventListener('click', function () {

    if(!resetBtn.disabled){

      resetData(JSON.parse(originData));
      resetBtn.disabled = true;

    }
   
  });

}

function downloadBtn() {
  var dlBtn = getElm('BUTTON', 'nx-download');
  dlBtn.type = "button";
  dlBtn.textContent = "⇣";
  dlBtn.addEventListener('click', function (e) {
    var data = Object.assign({}, editState.srcData);
    delete data.index;
    var check = validData(data);
    if (!check) {
      displayFeedback('Invalid Nexus data');
    }
    data = JSON.stringify(data, undefined, 2);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
    var anchor = getElm('A');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", "nexus.json");
    getHost().appendChild(anchor);
    anchor.click();
    anchor.remove();
  });
  return dlBtn;
}

function resetAuthorForm() {
  for (let [field, input] of Object.entries(authorInputs)) {
    input.value = editState.srcData.author[field];
  }
}

function resetData(nData) {
  var prevData = Object.assign({}, editState.srcData);

  if(nData === null){
    nData = newData();
  }

  var act = function (redo) {
    if (editState.srcData.threads.length) {
      [editIndex, editLocal, editDistant].forEach(parent => {
        Array.from(parent.childNodes).forEach(child => {
          easeOut(child, 200, function () {
            child.remove();
          })
        })
      });
    }
    if (redo) {
      editState.srcData = nData;
    } else {
      editState.srcData = prevData;
    }
    
    editState.threadIndex = 0;
    editState.threadId =editState.srcData.threads[0].id;

    resetAuthorForm();
    setThreads(true);
   
  };

  setLastAction(act);
  act(true);

}

function newDocumenBtn() {
  var newBtn = getElm('BUTTON', 'nx-new');
  newBtn.type = "button";
  newBtn.textContent = "🗋";
  newBtn.addEventListener('click', function () {
    resetData(newData());
  });
  return newBtn;
}

function openBtn() {
  var inp = fileInput();
  var btn = getElm('BUTTON', 'nx-open-file');
  btn.type = 'button';
  btn.textContent = "🗁";
  btn.addEventListener('click', function () {
    inp.click();
  });
  var wrap = getElm('SPAN');
  wrap.append(inp, btn);
  return wrap;
}


function fileInput(){
  var inp = getElm('INPUT');
  inp.type = "file";
  inp.accept = "application/json";
  inp.addEventListener('change', function (evt) {
    loadSrcFile(evt).then(data => {
      resetData(data);
    }).catch(() => {
      displayFeedback('Invalid source');
    })
  });
  inp.style.display = 'none';
return inp;
}


function displayFeedback(msg) {
  var txt = getTxt(msg);
if(feedbackrun){
  clearTimeout(feedbackrun);
}
    splitFlap(actionFdbck, txt, 20);
    feedbackrun = setTimeout(function () {
      splitFlap(actionFdbck, "", 20);
    }, 2000 + (txt.length * 20));
}

function setActionFeedback() {
  actionFdbck = getElm('SPAN', 'nx-action-feedback');
}

function editNav() {
  var wrp = getElm("DIV", "nx-edit-nav");
  setActionFeedback();
  setResetBtn();
  setSaveBtn();


  var links = getElm('DIV');


  links.append(resetBtn, newDocumenBtn(), openBtn(),saveBtn, downloadBtn());
  wrp.append(actionFdbck, links);
  return wrp;
}
function editActions() {
  var wrp = getElm("DIV", "nx-edit-actions nx-history-nav");
  setHistoryControls(actCtrls, triggerUndoRedo);
  wrp.append(actCtrls.ctrls["prev"].elm, actCtrls.ctrls["next"].elm);
  return wrp;
}

function setThreads(ease =false) {

  var items = editState.srcData.index;
  if (items.length) {
    for (var i = 0; i < items.length; i++) {
      setThread(i, items[i], ease);
    }
  }
}

function authorPart(){
 
  var dv = getElm('DIV', "nx-edit-author-form");
  dv.append(landmarkElm("author"), authorForm);
  return dv;
}
function indexPart(){
  var dv = getElm('DIV', "nx-edit-list");
  dv.append(landmarkElm("threads"), editIndex);
  return dv;
}
function editIndexBlock() {
  setAuthorForm();
  return blockWrap("index", null, [authorPart(),  indexPart(), addThreadBtn()], false);
}
function editLocalBlock() {
  return blockWrap("local", null, [editLocal], false);
}
function editDistantBlock() {
  return blockWrap("distant", null, [editDistant], false);
}

function setInstanceSwitch() {
  instanceBtn = getElm("BUTTON", "nx-edit-switch");
  instanceBtn.textContent = "👁";

  instanceBtn.addEventListener('click', function () {
    if (instanceBtn.textContent == "✎") {
      instanceBtn.textContent = "👁";
      replaceDiversion(viewerInst, editInst);
    } else {
      triggerUpdate(editState, true, true);

      instanceBtn.textContent = "✎";
      replaceDiversion(editInst, viewerInst);
    }

  });

  return instanceBtn;
}


function editMenu() {
  var dv = getElm("DIV", "nx-edit-menu");

  dv.append(editNav(), editActions());
  return dv;
}


function setThreadsForms() {
  
  editIndex = getElm("UL", "nx-edit-index");
  editLocal = getElm("UL", "nx-edit-local");
  editDistant = getElm("UL", "nx-edit-distant");
  setThreads();

}

function setEditState(state){
  var url= "nexus-tmp";

  if(state.dataUrl){
    url =state.dataUrl;
  }
  var data = getStoredEditData(url);
  if (data === null) {
    if(state.srcData !== null) {
      data =state.srcData;
    } else {
      data = newData();
        }
  registerEditData(url, data);
  } 

  if(state.srcData !== null){
    originData = JSON.stringify(state.srcData);
  } else {
    originData = JSON.stringify(data);
  }

  var id = data.threads[0].id;
  var idx = 0;
  if(state && state.threadId != '/' && data.index.includes(state.threadId)){
    id = state.threadId;
    idx = data.index.indexOf(state.threadId);
  }

 editState = newState(data, url, id, idx);


}
export function editorElms(state){
  setEditState(state);
  setThreadsForms();

  viewerInst = viewerElms(editState)[0];

 var indexPart = getElm("DIV");
 indexPart.append(editIndexBlock());
 var threadPart = getElm("DIV");
 threadPart.append(editLocalBlock(),editDistantBlock());
 
 editInst = serviceWrap
([editMenu()], [
  indexPart,
  threadPart
  ], [], "edit");

  setInstanceSwitch();
  return [editInst, instanceBtn];
}

