import { isNonEmptyStr } from "../libr/Jack/Check.js";
import {insertDiversion, replaceDiversion } from "../libr/Valva/Valva.js";
import { registerUpdateEvt, resolveState } from "../core/state/NxUpdate.js";
import {
  authorIndexLink,
  authorUrl,
  viewLink,
} from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap, getElm,  setHistoryControls,  threadTitleElm, toggleNavEnd } from "./NxCommons.js";
import { consoleLog } from "../core/logs/NxLog.js";
import { strHasValidMaxLength } from "../core/validt/NxStamper.js";

var currentElm;
var descrpElm;
var contentElm;

var slider;

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

  var newContent = threadContent(newThreadData);
  var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
  replaceDiversion(descrpElm.firstChild, newDescrpTxt);
  replaceDiversion(contentElm.firstChild, newContent);

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
  setDistantSlider();
  setDistantLinks(threadData);
  return blockWrap("distant", null, [slider], true);
}

function localThreadBlock(state, threadData) {
  var headerElm = threadTitleElm(state, true);
  setDescriptionElm(threadData);
  setContentElm(threadData);

  return blockWrap("local", [headerElm], [descrpElm, contentElm], true);
}

function setContentElm(threadData) {
  contentElm = getElm("DIV", "nx-local-content");
  contentElm.append(threadContent(threadData));
}

function setDistantLinks(threadData){
  setLinkedItems(threadData).then(() =>  {

    linkedCtrls.position = 0;
    linkedCtrls.count = linked.length;
    toggleNavEnd(linkedCtrls); //@todo:test: useful?
    setCurrentLink();
  });

}

function setPrevCtrlVisb(){
  if(linkedCtrls.position === 0){
    linkedCtrls.ctrls["prev"].elm.style.visibility = 'hidden';
  } else if(linkedCtrls.position === 1) {
    linkedCtrls.ctrls["prev"].elm.style.visibility = 'visible';
  }

}

function nextCtrlCallb(){
  linkedCtrls.ctrls["next"].elm.style.visibility = 'hidden';

  var restr = null;
  if((linkedCtrls.position + 1) !== linkedCtrls.count){
    restr = function(){
      linkedCtrls.ctrls["next"].elm.style.visibility = 'visible';
    };
  }
 return restr;
}

function setCurrentLink(){
  var nw = linked[linkedCtrls.position];
  var prevElm = currentElm.firstChild;
  setPrevCtrlVisb();
  var restr = nextCtrlCallb();
  if(prevElm){
    replaceDiversion(prevElm, nw, restr);
  } else {
    insertDiversion(currentElm, nw, false, true, 200, restr);
  }

}

function setDistantSlider(){
slider = getElm("DIV");
 currentElm = getElm("DIV","nx-distant-link");
 setHistoryControls(linkedCtrls, setCurrentLink);
 slider.append(linkedCtrls.ctrls["prev"].elm, currentElm, linkedCtrls.ctrls["next"].elm);

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
    var contents = [];
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
              elm.append(threadContent(resolveThreadData(distantState)));
              contents.push(elm);
            }
          }
          }).catch(err => {
            consoleLog(err);
          });
          promises.push(prc);
    }
    });
    return Promise.all(promises).then(()=>{
     
      if(!contents.length && !indexes.length){
        linked = [noLink()];
      } else {
        linked = contents.concat(indexes);
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

function threadContent(threadData) {
  var dv = getElm("DIV", "nx-content");
  dv.append(dateElm(threadData), contentBody(threadData), mediaElm(threadData));
  return dv;
}

function contentBody(threadData) {
  var bodydiv = getElm("DIV", "nx-content-body");
  bodydiv.append(
    threadTextElm(threadData, ["content", "main"]),
    threadTextElm(threadData, ["content", "aside"])
  );
  return bodydiv;
}

function dateElm(threadData) {
  var datediv = getElm("DIV", "nx-content-meta");
  var rdate = threadTextElm(threadData, ["content", "timestamp"]);
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
     
      if(ref.includes("timestamp") && data.includes('T')){
data = data.replace('T'," ");
      }
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
