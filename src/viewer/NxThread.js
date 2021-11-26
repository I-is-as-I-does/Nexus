import { isNonEmptyStr } from "../libr/Jack/Check.js";
import { diversionToggle, insertDiversion, replaceDiversion } from "../libr/Valva/Valva.js";
import { registerUpdateEvt, resolveState } from "../core/state/NxUpdate.js";
import {
  authorIndexLink,
  authorUrl,
  viewLink,
} from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap, getElm,  setHistoryControls,  threadNameElm, toggleNavEnd } from "./NxCommons.js";
import { consoleLog } from "../core/logs/NxLog.js";

var currentElm;
var descrpElm;
var recordElm;

var linked = [];

var linkedCtrls = {
  "ctrls":{
    "prev": {"symbol":"⊼", "elm":null},
    "next": {"symbol":"⊻", "elm":null}
  },
   position:0,
   count:1
 }


function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state);

  var newRecord = threadRecord(newThreadData);
  var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
  replaceDiversion(descrpElm.firstChild, newDescrpTxt);
  replaceDiversion(recordElm.firstChild, newRecord);

  setDistantLinks(newThreadData);
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
  var slider = distantSlider();
  setDistantLinks(threadData);
  return blockWrap("distant", null, [slider], true);
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

function setDistantLinks(threadData){
  setLinkedItems(threadData).then(() =>  {

    linkedCtrls.position = 0;
    linkedCtrls.count = linked.length;
    toggleNavEnd(linkedCtrls); //@todo:test: useful?
    setCurrentLink();
  });

}

function setCurrentLink(){
//@todo:fix/improve
  var nw = linked[linkedCtrls.position];
  var prev = currentElm.firstChild;

  var callb;
  if(prev){
    callb = function(){
      replaceDiversion(prev, nw);
    };
  } else  {
    callb = function(){ insertDiversion(currentElm, nw, false, true, 200);};
  }
  diversionToggle(linkedCtrls.ctrls["next"].elm, callb, true, 200, 500, false);
}

function distantSlider(){
  var slider = getElm("DIV");
 currentElm = getElm("DIV","nx-distant-link");
 setHistoryControls(linkedCtrls, setCurrentLink);
 slider.append(linkedCtrls.ctrls["prev"].elm, currentElm, linkedCtrls.ctrls["next"].elm);
 return slider;
}
function linkedElm(distantState){
  
  var linkedAuthor = [
    authorIndexLink(distantState, false),
    authorUrl(distantState, false),
    viewLink(distantState, false),
  ];
  var elm = getElm("DIV");
  elm.append(...linkedAuthor);
  return elm;
}
function setLinkedItems(threadData) {

  if (threadData != null && threadData.linked.length) {
    var records = [];
    var indexes = [];
    var done = [];
    var promises = [];
    threadData.linked.forEach((item) => {
      if(item.url){
         var prc =  resolveState(item.url, item.id).then((distantState) => {
            var key = distantState.dataUrl+"#"+distantState.threadId;
            if(!done.includes(key)){
              done.push(key);
              var elm = linkedElm(distantState);
            if (distantState.threadId == "/") {                 
              indexes.push(elm);
            } else {
              elm.append(threadRecord(resolveThreadData(distantState)));
              records.push(elm);
            }
          }
          }).catch(err => {
            consoleLog(err);
          });
          promises.push(prc);
    }
    });
    return Promise.all(promises).then(()=>{
     
      if(!records.length && !indexes.length){
        linked = [noLink()];
      } else {
        linked = records.concat(indexes);
      }
     
    });
  
  } 
   return Promise.resolve(noLink()).then((elm)=> {
    linked = [elm];
   });
}

function noLink(){
  var elm = getElm("DIV");
  elm.textContent = "...";
  return elm;
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
