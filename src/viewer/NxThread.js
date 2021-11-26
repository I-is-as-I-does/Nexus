import { isNonEmptyStr } from "../libr/Jack/Check.js";
import { insertDiversion, replaceDiversion } from "../libr/Valva/Valva.js";
import { registerUpdateEvt, resolveState } from "../core/state/NxUpdate.js";
import {
  authorIndexLink,
  authorUrl,
  viewLink,
} from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap, getElm,  threadNameElm } from "./NxCommons.js";

var linkedWrap;
var descrpElm;
var recordElm;

function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state);

  var newRecord = threadRecord(newThreadData);
  var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
  replaceDiversion(descrpElm.firstChild, newDescrpTxt);
  replaceDiversion(recordElm.firstChild, newRecord);

  var newLinkedElm = linkedItems(newThreadData);
  Array.from(linkedWrap.childNodes).forEach((list, ind) => {
    replaceDiversion(list, newLinkedElm[ind]);
  });
}

function setDescriptionElm(threadData) {
  descrpElm = getElm("DIV", "nx-thread-description");
  descrpElm.append(threadTextElm(threadData, ["description"]));
}

function resolveThreadData(state) {
  var threadData = null;
  if (state.threadId && state.threadId != "/") {
    threadData = state.srcData.threads[state.threadIndex];
  }
  return threadData;
}
function distantThreadBlock(threadData) {
  linkedWrap = getElm("DIV");
  linkedWrap.append(...linkedItems(threadData));
  return blockWrap("distant", null, [linkedWrap], true);
}

function localThreadBlock(state, threadData) {
  var headerElm = threadNameElm(state, true);
  setDescriptionElm(threadData);
  setRecordElm(threadData);

  return blockWrap("local", [headerElm], [descrpElm, recordElm], true);
}

function setRecordElm(threadData) {
  recordElm = getElm("DIV", "nx-local-record");
  recordElm.append(threadRecord(threadData));
}

function linkedItems(threadData) {
  var linked = [];
  if (threadData != null) {
    linked = threadData.linked;
  }

  var records = getElm("UL", "nx-distant-records");
  var indexes = getElm("UL", "nx-distant-indexes");

  if (linked.length) {
    var doneIndexes = [];
    linked.forEach((item) => {
      if(item.url){
      resolveState(item.url, item.id).then((distantState) => {
       
        var linkedAuthor = [
          authorIndexLink(distantState, false),
          authorUrl(distantState, false),
          viewLink(distantState, false),
        ];

        if (distantState.threadId == "/") {
          if (!doneIndexes.includes(distantState.threadId)) {
            doneIndexes.push(distantState.threadId);
            var li = getElm("LI");
            li.append(...linkedAuthor);
            insertDiversion(indexes, li, false, false, 200);
          }
        } else {
          var li = getElm("LI");
          li.append(...linkedAuthor);
          li.append(threadRecord(resolveThreadData(distantState)));
          insertDiversion(records, li, false, false, 200);
        }
      });
    }
    });
  } else {
    var li = getElm("LI");
    li.textContent = "...";
    records.append(li);
  }
  return [records, indexes];
}

function threadRecord(threadData) {
  var dv = getElm("DIV", "nx-record");
  dv.append(dateElm(threadData), recordBody(threadData), mediaElm(threadData));
  return dv;
}

function recordBody(threadData) {
  var bodydiv = getElm("DIV", "nx-record-body");
  bodydiv.append(
    threadTextElm(threadData, ["record", "main"]),
    threadTextElm(threadData, ["record", "aside"])
  );
  return bodydiv;
}

function dateElm(threadData) {
  var datediv = getElm("DIV", "nx-record-meta");
  var rdate = threadTextElm(threadData, ["record", "timestamp"]);
  datediv.append(rdate);
  return datediv;
}

function threadFieldText(threadData, ref = []) {
  if (threadData) {
    var data = Object.assign({}, threadData);
    for (var r = 0; r < ref.length; r++) {
      data = data[ref[r]];
    }
    if (isNonEmptyStr(data)) {
      return data;
    }
  }
  return "";
}

export function threadTextElm(threadData, ref) {
  var p = getElm("P", "nx-" + ref.join("-"));
  p.textContent = threadFieldText(threadData, ref);
  return p;
}

export function threadBlocks(state) {
  var threadData = resolveThreadData(state);
  var blocks = [
    localThreadBlock(state, threadData),
    distantThreadBlock(threadData),
  ];

registerUpdateEvt(function (newState) {
    updateThreadBlocks(newState);
  });

  return blocks;
}
