import { isNonEmptyStr } from "../lib/Jack/Trades/Check.js";
import { insertDiversion, replaceDiversion } from "../lib/Valva/Valva.js";
import NxThalamus from "../NxThalamus.js";
import { authorIndexLink, authorUrl, threadName, viewLink } from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap } from "./NxMeta.js";

export function threadBlock(dataSrc, threadId) {
  var thread = null;
  if (threadId != "/") {
    thread = NxThalamus.threadData(dataSrc, threadId);
  }
  var headerElms = [threadName(dataSrc, threadId, true)];

  var descrp = descriptionElm(thread);
  var record = threadRecord(thread);

  NxThalamus.registerUpdateEvt(function (e) {
    var nthread = NxThalamus.threadData(e.dataSrc, e.threadId);
    var nrecord = threadRecord(nthread);
    var ndescrp = threadTextElm(nthread, ["description"]);
    replaceDiversion(descrp.firstChild, ndescrp);
    replaceDiversion(descrp.nextElementSibling, nrecord);
  });

  return blockWrap("local", headerElms, [descrp, record], true);
}

export function linkedBlock(dataSrc, threadId) {
  var wrap = document.createElement("DIV");
  wrap.append(...linkedItems(dataSrc, threadId));

  NxThalamus.registerUpdateEvt(function (e) {
    var nlinkedElm = linkedItems(e.dataSrc, e.threadId);
    Array.from(wrap.children).forEach((list, ind) => {
      replaceDiversion(list, nlinkedElm[ind]);
    });
  });
  return blockWrap("distant", null, [wrap], true);
}

export function linkedItems(dataSrc, threadId) {
  var linked = [];
  if (threadId != "/") {
    linked = NxThalamus.threadData(dataSrc, threadId).linked;
  }

  var records = document.createElement("UL");
  records.classList.add("nx-distant-records");
  var indexes = document.createElement("UL");
  indexes.classList.add("nx-distant-indexes");

  if (linked.length) {
    var doneIndexes = [];
    linked.forEach((item) => {
      NxThalamus.loadData(item.url).then(() => {
        if (item.id != "/") {
          item.id = NxThalamus.resolveThreadId(item.url, item.id);
        }
        var linkedAuthor = [
          authorIndexLink(item.url, false),
          authorUrl(item.url, false),
          viewLink(item.url, item.id, false),
        ];

        if (item.id == "/") {
          if (!doneIndexes.includes(item.id)) {
            doneIndexes.push(item.id);
            var li = document.createElement("LI");
            li.append(...linkedAuthor);
            insertDiversion(indexes, li, false, false, 200);
          }
        } else {
          var li = document.createElement("LI");
          li.append(...linkedAuthor);
          li.append(threadRecord(NxThalamus.threadData(item.url, item.id)));
          insertDiversion(records, li, false, false, 200);
        }
      });
    });
  } else {
    var li = document.createElement("LI");
    li.textContent = "...";
    records.append(li);
  }
  return [records, indexes];
}

export function threadRecord(thread) {
  var dv = document.createElement("DIV");
  dv.classList.add("nx-record");

  dv.append(dateElm(thread), recordBody(thread), mediaElm(thread));

  return dv;
}

export function recordBody(thread) {
  var bodydiv = document.createElement("DIV");
  bodydiv.classList.add("nx-record-body");
  bodydiv.append(
    threadTextElm(thread, ["record", "main"]),
    threadTextElm(thread, ["record", "aside"])
  );
  return bodydiv;
}

export function dateElm(thread) {
  var datediv = document.createElement("DIV");
  datediv.classList.add("nx-record-meta");
  datediv.append(threadTextElm(thread, ["record", "timestamp"]));
  return datediv;
}

export function descriptionElm(thread) {
  var dv = document.createElement("DIV");
  dv.classList.add("nx-thread-description");
  var p = threadTextElm(thread, ["description"]);
  dv.append(p);

  return dv;
}

export function threadFieldText(thread, ref = []) {
  if (thread) {
    var data = thread;
    for (var r = 0; r < ref.length; r++) {
      data = data[ref[r]];
    }
    if (isNonEmptyStr(data)) {
      return data;
    }
  }
  return "";
}

export function threadTextElm(thread, ref) {
  var p = document.createElement("P");
  p.classList.add("nx-" + ref.join("-"));
  p.textContent = threadFieldText(thread, ref);

  return p;
}
