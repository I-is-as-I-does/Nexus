"use strict";
(self["webpackChunknexus"] = self["webpackChunknexus"] || []).push([["NxBrowserEditor"],{

/***/ "./src/editor/NxEdit.js":
/*!******************************!*\
  !*** ./src/editor/NxEdit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEditMenu": () => (/* binding */ getEditMenu),
/* harmony export */   "instanceSwitch": () => (/* binding */ instanceSwitch),
/* harmony export */   "setEditState": () => (/* binding */ setEditState),
/* harmony export */   "editIndexBlock": () => (/* binding */ editIndexBlock),
/* harmony export */   "editLocalBlock": () => (/* binding */ editLocalBlock),
/* harmony export */   "editDistantBlock": () => (/* binding */ editDistantBlock)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/* harmony import */ var _viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewer/NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @i-is-as-i-does/valva/src/legacy/Valva-v1.js */ "./node_modules/@i-is-as-i-does/valva/src/legacy/Valva-v1.js");
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../browser/NxState.js */ "./src/browser/NxState.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/storg/NxMemory.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/storg/NxMemory.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxStamper.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxStamper.js");
/* harmony import */ var _NxStarters_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NxStarters.js */ "./src/editor/NxStarters.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NxEditComps.js */ "./src/editor/NxEditComps.js");
/* harmony import */ var _NxEditPrc_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./NxEditPrc.js */ "./src/editor/NxEditPrc.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/base/NxHost.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/base/NxHost.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_logs_NxLog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/logs/NxLog */ "./node_modules/@i-is-as-i-does/nexus-core/src/logs/NxLog.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
















var hostElm
const editBuffer = (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.getBuffertime)();
const editHistoryMax = 10;
var editMenu
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
  var dv = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-move");
  var btn = {
    up: null,
    down: null,
  };
  li.addEventListener("IndexChange", function () {
    toggleActiveBtn(id, btn);
  });
  Object.keys(btn).forEach((it) => {
    btn[it] = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("BUTTON", "nx-edit-move-" + it);
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
  var form = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FORM", "nx-thread-local-form");

  var fieldset1 = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('FIELDSET');

  fieldset1.append(inputElm(["threads", idx, "title"], titleCallback));
  fieldset1.append(inputElm(["threads", idx, "description"]));


  var fieldset2 = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('FIELDSET');

  ["timestamp", "main", "aside"].forEach((field) => {
    fieldset2.append(inputElm(["threads", idx, "content", field]));
  });

  var fieldset3 = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('FIELDSET');
 

var typeInp = inputElm(["threads", idx, "content", "media", "type"]);
  var tcallback = function (val, valid) {
    if (valid) {
      var item = typeInp.querySelector(
        "[data-item=" + (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_11__.resolveMediaType)(val) + "]"
      );
      if (item) {
        item.click();
      }
    }
  };
  fieldset3.append(inputElm(["threads", idx, "content", "media", "url"], tcallback));
  fieldset3.append(typeInp);
  fieldset3.append(inputElm(["threads", idx, "content", "media", "caption"]));

  form.append((0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("local thread"), fieldset1 , (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("content"), fieldset2, (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("media",2), fieldset3);
  return form;
}


function addThreadBtn() {
  var btn = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.addBtn)();
  btn.addEventListener('click', function () {
   
    var randomId = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_3__.randomString)(10);
    var idx = editState.srcData.index.length;
    editState.srcData.threads.push((0,_NxStarters_js__WEBPACK_IMPORTED_MODULE_8__.newThread)(randomId));
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
    (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(map.index.parent, map.index.child, false, true, 200, callb);
    saveBtn.disabled = false;

  });

  return btn;
}


function appendLinkInputs(form, idx, i) {
  var linkwrap = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-distant-link");
  var elm = inputElm(["threads", idx, "linked", i]);

  (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(linkwrap,elm,false,true,200);

  var dltBtn = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.deleteLinkBtn)();
  var delwrap = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', 'nx-distant-link-action');
  delwrap.append(dltBtn);
  linkwrap.append(delwrap);
  dltBtn.addEventListener("click", () => {
    var act = function (redo) {
      if (redo) {
        (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(linkwrap, 200, function () {
          linkwrap.remove();
        });
      } else {
        if (i === editState.srcData.threads[idx].linked.length - 1) {
          (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(form, linkwrap, false, true, 200);
        } else {
          var nextSibling = form.childNodes[i];
          form.insertBefore(linkwrap, nextSibling);
          (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeIn)(linkwrap, 200);
        }
      }
    };
    setLastAction(act);
    act(true);
  });
  form.append(linkwrap);
}

function threadDistantForm(idx, id) {
  var form = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FORM", "nx-thread-distant-form");

  var linked = editState.srcData.threads[idx].linked;

if (linked.length) {
  for (var i = 0; i < linked.length; i++) {
  //  appendLinkInputs(form, idx, i);
  }
}
var formCnt = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV");
var addBtnElm = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.addBtn)();
addBtnElm.addEventListener("click", () => {
  var idx = editState.srcData.index.indexOf(id);
  var i = editState.srcData.threads[idx].linked.length;
  editState.srcData.threads[idx].linked.push("https://");
  appendLinkInputs(form, idx, i);
});

  formCnt.append((0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("linked threads"),form, addBtnElm);
  return formCnt;
}

function threadLi(id, form) {
  var li = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("LI");

  li.append(form);

  if (editState.threadId != id) {
    li.style.display = "none";
  }
  (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.registerUpdateEvt)(function (nState) {

    if (nState.dataUrl == editState.dataUrl) {
      editState = nState;
      if (nState.threadId == id) {
        setTimeout(function () {
          (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeIn)(li, 200);
        }, 200);
      } else {
        (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(li, 200);
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
  var indLk = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.baseViewLink)(itemState, false);
  (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setToggleOnDisplay)(indLk, itemState);

  indLk.addEventListener("click", () => {
    var nidx = editState.srcData.index.indexOf(id);

    (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.triggerUpdate)(stateUpdate(nidx, id), true);
  });

  return indLk;
}


function threadElms(idx, id) {
  var map = {
    'index': { "parent": editIndex, "child": null, "link": null, "del": null },
    'local': { "parent": editLocal, "child": null },
    'distant': { "parent": editDistant, "child": null }
  };

  map.index.child = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("LI");
  map.index.link = indexLink(idx, id);
  map.index.child.append(map.index.link);
  setMoveBtns(map.index.child, id);

  var titleCallback = function (val, valid) {
    if (valid) {
      var newId = (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_11__.convertToId)(val);
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

  (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.toggleNavEnd)(actCtrls);
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
        (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(elm, 200, function () {
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
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeIn)(indexNode, 200);
      editLocal.append(localLi);
      editDistant.append(distantLi);
      indexNode.firstChild.click();
    }
  };
  setLastAction(act);
  act(true);
}

function deleteThreadElm(localLi, distantLi, id) {
  var btn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("BUTTON", "nx-delete-thread");
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
    editState.srcData.threads[ref[1]].linked.indexOf(ref[3]) === -1
  ) {
    editState.srcData.threads[ref[1]].linked.push(value)
  } else {
    editState.srcData.threads[ref[1]].linked[ref[3]] = value;
  }
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
    return editState.srcData.threads[ref[1]].linked[ref[3]];
  }
  return "";
}



function inputElm(ref, callback = null, store = null) {
  var val = fieldValue(ref);

  var pos = ref.length - 1
  if (Number.isInteger(ref[pos])) {
    pos--
  }
  var field = ref[pos];

  var inp;
  if (["about", "description", "main", "aside", "caption"].includes(field)) {
    inp = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.textareaInput)(val);
  } else if (field == "timestamp") {
    inp = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.dateInput)(val);
  } else {
    inp = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.textInput)(val);
  }

  var hook = ref.join("-");
  inp.id = hook;
  inp.name = hook;
  if (
    ["handle", "title", "main", "id", "url", "type", "timestamp", "linked"].includes(field)
  ) {
    inp.required = true;
  }
  var ident = field
  if(field === 'linked'){
    ident = 'url'
  }

  var lb = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.baseLabel)(ident);
  var indc = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("SPAN", "nx-edit-indication");
  var fdbck = (0,_NxEditComps_js__WEBPACK_IMPORTED_MODULE_10__.invalidSp)();
  lb.append(indc, fdbck);


  switch (ident) {
    case "url":
      indc.textContent = "[http]";
      inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.urlPattern;
      break;
    case "id":
      inp.pattern = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.idPattern;
      break;
    case "type":
      inp.pattern = "(" + _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.supportedMediaTypes.join("|") + ")";
      break;
    case "timestamp":
      break;
    default:
      var minmax = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.charMinMax[field];
      indc.textContent = "[" + minmax[0] + "-" + minmax[1] + "]";
      inp.setAttribute("maxlength", minmax[1]);
      inp.setAttribute("minlength", minmax[0]);
  }

  if (store) {
    store[field] = inp;
  }

  var wrap = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-input nx-edit-select-" + field);
  wrap.append(lb);
  if (field === "type") {
// || field === "linked"
    var items = _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_0__.supportedMediaTypes;
    wrap.append(
      (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.selectDropDown)(items, inp, null, "nx-edit-" + ref[2] + "-" + field)
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
  authorForm = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("FORM", "nx-edit-author");
  ["handle", "url", "about"].forEach((field) => {
    authorForm.append(inputElm(["author", field], null, authorInputs));
  });
}

function setSaveBtn() {
  saveBtn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('BUTTON', 'nx-save');
  saveBtn.type = "button";
  saveBtn.textContent = "🖫";
  saveBtn.disabled = true;
  saveBtn.addEventListener('click', function () {
    if (!saveBtn.disabled) {
      
      (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_6__.registerEditData)(editState.dataUrl, editState.srcData);    
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
resetBtn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('BUTTON', 'nx-reset');
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
  var dlBtn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('BUTTON', 'nx-download');
  dlBtn.type = "button";
  dlBtn.textContent = "⇣";
  dlBtn.addEventListener('click', function (e) {
    var data = Object.assign({}, editState.srcData);
    delete data.index;
    var check = (0,_i_is_as_i_does_nexus_core_src_validt_NxStamper_js__WEBPACK_IMPORTED_MODULE_7__.validData)(data);
    if (!check) {
      displayFeedback('Invalid Nexus data');
    }
    data = JSON.stringify(data, undefined, 2);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(data);
    var anchor = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('A');
    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", "nexus.json");
    hostElm.appendChild(anchor);
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
    nData = (0,_NxStarters_js__WEBPACK_IMPORTED_MODULE_8__.newData)();
  }

  var act = function (redo) {

    if (editState.srcData.threads.length) {
    [editIndex, editLocal, editDistant].forEach(parent => {
        Array.from(parent.childNodes).forEach(child => {
          (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.easeOut)(child, 150,function () {
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
  var newBtn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('BUTTON', 'nx-new');
  newBtn.type = "button";
  newBtn.textContent = "🗋";
  newBtn.addEventListener('click', function () {
    resetData((0,_NxStarters_js__WEBPACK_IMPORTED_MODULE_8__.newData)());
  });
  return newBtn;
}

function openBtn() {
  var inp = fileInput();
  var btn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('BUTTON', 'nx-open-file');
  btn.type = 'button';
  btn.textContent = "🗁";
  btn.addEventListener('click', function () {
    inp.click();
  });
  var wrap = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('SPAN');
  wrap.append(inp, btn);
  return wrap;
}


function fileInput(){
  var inp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('INPUT');
  inp.type = "file";
  inp.accept = "application/json";
  inp.addEventListener('change', function (evt) {
    (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_9__.loadSrcFile)(evt).then(data => {
      data.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_9__.getThreadsList)(data)
     resetData(data);
    }).catch((err) => {
      (0,_i_is_as_i_does_nexus_core_src_logs_NxLog__WEBPACK_IMPORTED_MODULE_13__.logErr)(err.message)
      displayFeedback('Invalid source');
    })
  });
  inp.style.display = 'none';
return inp;
}


function displayFeedback(msg) {
  var txt = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_5__.getTxt)(msg);
if(feedbackrun){
  clearTimeout(feedbackrun);
}
    (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.splitFlap)(actionFdbck, txt, 25);
    feedbackrun = setTimeout(function () {
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.splitFlap)(actionFdbck, "",25);
    }, 2000 + (txt.length * 20));
}

function setActionFeedback() {
  actionFdbck = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('SPAN', 'nx-action-feedback');
}

function editNav() {
  var wrp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-nav");
  setActionFeedback();
  setResetBtn();
  setSaveBtn();


  var links = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV');


  links.append(resetBtn, newDocumenBtn(), openBtn(),saveBtn, downloadBtn());
  wrp.append(actionFdbck, links);
  return wrp;
}
function editActions() {
  var wrp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-actions nx-history-nav");
  (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.setHistoryControls)(actCtrls, triggerUndoRedo);
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

function setThread(idx, id,ease = false) {
  var map = threadElms(idx, id);
    for(let [k, elmSet] of Object.entries(map)){
      if(ease  && (k == "index" ||  id == editState.threadId)){

        (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.insertDiversion)(elmSet.parent, elmSet.child,false, true,200);
            }else {
              elmSet.parent.append(elmSet.child);
            }
           
    }
}

function authorPart(){
  setAuthorForm();
  var dv = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', "nx-edit-author-form");
  dv.append((0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("author"), authorForm);
  return dv;
}
function indexPart(){
  var dv = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)('DIV', "nx-edit-list");
  dv.append((0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.landmarkElm)("threads"), editIndex, addThreadBtn());
  return dv;
}

function setThreadsForms() {
  
  editIndex = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-edit-index");
  editLocal = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-edit-local");
  editDistant = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("UL", "nx-edit-distant");
  setThreads();

}
function setEditMenu() {
  editMenu= (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("DIV", "nx-edit-menu");

  editMenu.append(editNav(), editActions());
  
}

function getEditMenu(){
  return editMenu
}

function instanceSwitch(viewerInst, editInst) {
  instanceBtn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.getElm)("BUTTON", "nx-edit-switch");
  instanceBtn.textContent = "👁";

  instanceBtn.addEventListener('click', function () {
    if (instanceBtn.textContent == "✎") {
      instanceBtn.textContent = "👁";
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.replaceDiversion)(viewerInst, editInst);
    } else {
      (0,_browser_NxState_js__WEBPACK_IMPORTED_MODULE_4__.triggerUpdate)(editState, true, true);

      instanceBtn.textContent = "✎";
      (0,_i_is_as_i_does_valva_src_legacy_Valva_v1_js__WEBPACK_IMPORTED_MODULE_2__.replaceDiversion)(editInst, viewerInst);
    }

  });

  return instanceBtn;
}



function setEditState(state, nxelm){

  hostElm = nxelm
  var url= "nexus-tmp";
  var data;

  if((0,_i_is_as_i_does_nexus_core_src_base_NxHost_js__WEBPACK_IMPORTED_MODULE_12__.getQuery)("new")){
    data = (0,_NxStarters_js__WEBPACK_IMPORTED_MODULE_8__.newData)();
    state = null;
  }  else {

  if(state.dataUrl){
    url =state.dataUrl;
  }
  data = (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_6__.getStoredEditData)(url);
  if (data === null) {
    if(state.srcData !== null) {
      data =state.srcData;
    } else {
      data = (0,_NxStarters_js__WEBPACK_IMPORTED_MODULE_8__.newData)();
        }
  (0,_i_is_as_i_does_nexus_core_src_storg_NxMemory_js__WEBPACK_IMPORTED_MODULE_6__.registerEditData)(url, data);
  } 
  }

  if(!data.index){
    data.index = (0,_i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_9__.getThreadsList)(data)
  }

  if(state !== null && state.srcData !== null){
    originData = JSON.stringify(state.srcData);
  } else {
    originData = JSON.stringify(data);
  }

  var id = data.threads[0].id;
  var idx = 0;

  if(state && state.threadId !== '/' && data.index.includes(state.threadId)){
    id = state.threadId;
    idx = data.index.indexOf(state.threadId);
  }

 editState = (0,_NxEditPrc_js__WEBPACK_IMPORTED_MODULE_11__.newState)(data, url, id, idx);
 setEditMenu()
 setThreadsForms();

}

function editIndexBlock() {
 
  return (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("index", null, [authorPart(),  indexPart()], false);
}
function editLocalBlock() {
  return (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("local", null, [editLocal], false);
}
function editDistantBlock() {
  return (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_1__.blockWrap)("distant", null, [editDistant], false);
}



/***/ }),

/***/ "./src/editor/NxEditComps.js":
/*!***********************************!*\
  !*** ./src/editor/NxEditComps.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textInput": () => (/* binding */ textInput),
/* harmony export */   "textareaInput": () => (/* binding */ textareaInput),
/* harmony export */   "dateInput": () => (/* binding */ dateInput),
/* harmony export */   "baseLabel": () => (/* binding */ baseLabel),
/* harmony export */   "deleteLinkBtn": () => (/* binding */ deleteLinkBtn),
/* harmony export */   "addBtn": () => (/* binding */ addBtn),
/* harmony export */   "invalidSp": () => (/* binding */ invalidSp)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxCoreTranslate.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/transl/NxElmTranslate.js");
/* harmony import */ var _viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../viewer/NxCommons.js */ "./src/viewer/NxCommons.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */




  function textInput(val) {
    var inp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("INPUT", "nx-edit-text");
    inp.type = "text";
    inp.value = val;
    return inp;
  }
  
  function textareaInput(val) {
    var inp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("TEXTAREA", "nx-edit-textarea");
    inp.textContent = val;
    return inp;
  }
  function dateInput(val) {
    var inp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("INPUT");
    inp.type = "datetime-local";
    inp.value = val;
    return inp;
  }
  
  function baseLabel(field) {
    var lb = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("LABEL", "nx-edit-label");
    lb.for = field;
    var title = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", "nx-edit-title");
    title.textContent = (0,_i_is_as_i_does_nexus_core_src_transl_NxCoreTranslate_js__WEBPACK_IMPORTED_MODULE_0__.getTxt)(field);
  (0,_i_is_as_i_does_nexus_core_src_transl_NxElmTranslate_js__WEBPACK_IMPORTED_MODULE_1__.registerTranslElm)(title, field);
    lb.append(title);
    return lb;
  }

  
function deleteLinkBtn() {
  var btn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("BUTTON", "nx-delete-link");
  btn.type = "button";
  btn.textContent = "-";
  return btn;
}

function addBtn() {
  var btn = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("BUTTON", "nx-add-link");
  btn.type = "button";
  btn.textContent = "+";
  return btn;
}

function invalidSp() {
  var sp = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__.getElm)("SPAN", "nx-edit-feedback");
  return sp;
}



/***/ }),

/***/ "./src/editor/NxEditPrc.js":
/*!*********************************!*\
  !*** ./src/editor/NxEditPrc.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveMediaType": () => (/* binding */ resolveMediaType),
/* harmony export */   "convertToId": () => (/* binding */ convertToId),
/* harmony export */   "newState": () => (/* binding */ newState)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_load_NxSrc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/load/NxSrc.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/load/NxSrc.js");
/* harmony import */ var _viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../viewer/NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */





const providers = ["youtube", "vimeo", "soundcloud"];
const guessMap = {
  image: ["jpg", "jpeg", "gif", "svg", "png", "webp"],
  video: ["mp4", "webm"],
  audio: ["mp3"],
};

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

function convertToId(title) {
    return (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.replaceDiacritics)(title.trim().replace(/[\s_]/, "-"));
  }

  /*
export function updateDistantDropdown(input, url, valid){
 
    var prc = function(items = []){  
      var ndropdown = selectDropDown(items,input,null,"nx-edit-select-linked");
     // input.nextSibling.replaceWith(ndropdown.lastChild);
      console.log()
    };
 
    if(!url || !valid){
      prc();
      return;
      }
    getSrcData(url).then((data)=> {
      prc(getThreadsList(data));
    }).catch(() => {
      input.pattern = urlPattern+"(?<!"+escapeRegExp(url)+")";
      input.dispatchEvent(new window.Event('change'));
    });
  }
*/
  
  function newState(data, url = "nexus-tmp", id = "/", idx = -1){
    return {
      dataUrl: url,
      srcData: data,
      threadId: id,
      threadIndex: idx,
    };
  }
  

/***/ }),

/***/ "./src/editor/NxEditor.js":
/*!********************************!*\
  !*** ./src/editor/NxEditor.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "editorElms": () => (/* binding */ editorElms)
/* harmony export */ });
/* harmony import */ var _viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../viewer/NxCommons.js */ "./src/viewer/NxCommons.js");
/* harmony import */ var _viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../viewer/NxViewer.js */ "./src/viewer/NxViewer.js");
/* harmony import */ var _NxEdit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NxEdit.js */ "./src/editor/NxEdit.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */




function editorElms(seed){

    (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.setEditState)(seed.state, seed.nxelm);

    var viewerInst = (0,_viewer_NxViewer_js__WEBPACK_IMPORTED_MODULE_1__.viewerElms)(seed);
  
   var indexPart = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__.getElm)("DIV");
   indexPart.append((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.editIndexBlock)());
   var threadPart = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__.getElm)("DIV");
   threadPart.append((0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.editLocalBlock)(),(0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.editDistantBlock)());
   
   var editInst = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__.instanceWrap)((0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__.appHeaderWithLang)(),[(0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__.serviceWrap)
  ([(0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.getEditMenu)()], [
    indexPart,
    threadPart
    ], [], "edit")]);

    var editor = (0,_viewer_NxCommons_js__WEBPACK_IMPORTED_MODULE_0__.getElm)('DIV','nx-editor')
    editor.append(editInst, (0,_NxEdit_js__WEBPACK_IMPORTED_MODULE_2__.instanceSwitch)(viewerInst, editInst))
    
    return editor
  }
  

/***/ }),

/***/ "./src/editor/NxStarters.js":
/*!**********************************!*\
  !*** ./src/editor/NxStarters.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newData": () => (/* binding */ newData),
/* harmony export */   "newThread": () => (/* binding */ newThread)
/* harmony export */ });
/* harmony import */ var _i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @i-is-as-i-does/jack-js/src/modules/Help.js */ "./node_modules/@i-is-as-i-does/jack-js/src/modules/Help.js");
/* harmony import */ var _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @i-is-as-i-does/nexus-core/src/validt/NxSpecs.js */ "./node_modules/@i-is-as-i-does/nexus-core/src/validt/NxSpecs.js");
/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */




function newData() {

    var randomId = (0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.randomString)(10);
       return { "nexus": _i_is_as_i_does_nexus_core_src_validt_NxSpecs_js__WEBPACK_IMPORTED_MODULE_1__.appUrl,
        "author": {
          "handle": "Anonymous-"+(0,_i_is_as_i_does_jack_js_src_modules_Help_js__WEBPACK_IMPORTED_MODULE_0__.randomInt)(100,999),
          "about": "",
          "url": "http://"
        },
        "threads": [
            newThread(randomId)
        ],
        "index":[randomId]
};
}

function newThread(randomId){
    return {
      "id": randomId,
      "title": randomId,
      "description": "...",
      "content": {
        "timestamp": new Date().toISOString().substring(0,16),
        "main": "...",
        "aside": "",
        "media": {
          "url": "",
          "type": "",
          "caption": ""
        }
      },
      "linked": [
      ]
    };
  }
  

/***/ })

}]);
//# sourceMappingURL=NxBrowserEditor.js.map