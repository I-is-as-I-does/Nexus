/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { isNonEmptyStr } from "@i-is-as-i-does/jack-js/src/modules/Check.js";
import {easeOut, fadeIn, fadeOut, insertDiversion, replaceDiversion } from "@i-is-as-i-does/valva/src/modules/aliases.js";
import { registerUpdateEvt, resolveState } from "../NxState.js";
import {
  authorIndexLink,
  authorUrl,
  viewLink,
} from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap, convertLineBreaks, getElm,  landmarkElm,  setHistoryControls,  threadTitleElm, toggleNavEnd } from "./NxCommons.js";
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog.js";
import { splitUrlAndId } from "@i-is-as-i-does/nexus-core/src/validt/NxStamper.js";

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
   count:0
 }

 var distantLandmark;

 function setDistantLandmark(){
  distantLandmark = landmarkElm("distant");
  distantLandmark.style.display ="none";
 }


function updateThreadBlocks(state) {
  var newThreadData = resolveThreadData(state);

  var newContent = threadContent(newThreadData);
  var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
  replaceDiversion(descrpElm.firstChild, newDescrpTxt);
  replaceDiversion(contentElm.firstChild, newContent);

  resetDistantLinks(newThreadData);
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
  setDistantLandmark();
  setDistantSlider();
  setLinkedItems(threadData);
  return blockWrap("distant", null, [slider], distantLandmark);
}

function localThreadBlock(state, threadData) {
  var headerElm = threadTitleElm(state, true);
  setDescriptionElm(threadData);
  setContentElm(threadData);

  return blockWrap("local", [headerElm], [descrpElm, contentElm], landmarkElm("local"));
}

function setContentElm(threadData) {
  contentElm = getElm("DIV", "nx-local-content");
  contentElm.append(threadContent(threadData));
}

function hideDistantNav(){
  toggleNavEnd(linkedCtrls);
 
  linkedCtrls.ctrls["next"].elm.style.visibility = 'hidden';
  linkedCtrls.ctrls["prev"].elm.style.visibility = 'hidden';
}

function resetDistantLinks(threadData){

  linked = [];
   linkedCtrls.position = 0;
  linkedCtrls.count = 0;

  hideDistantNav();
  removeDistantContent();
  toggleDistantLandmark(false);
  setLinkedItems(threadData);
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
    return restr;
  
}

function restr(){
  if((linkedCtrls.position + 1) !== linkedCtrls.count){
  linkedCtrls.ctrls["next"].elm.style.visibility = 'visible';
  }
}

function removeDistantContent(){
  var prevElm = currentElm.firstChild;
  if(prevElm){
    easeOut(prevElm,200,function(){
      prevElm.remove();
    });

  }
}

function setFirstDistantContent(){
  toggleDistantLandmark(true);
  insertDiversion(currentElm, linked[0], false, true, 200, restr);
}

function setCurrentLink(){
  setPrevCtrlVisb();
  var restr = nextCtrlCallb();

  if(linked.length){
   var  nw = linked[linkedCtrls.position];

  if(currentElm.firstChild){
    replaceDiversion(currentElm.firstChild, nw, restr);
  } else {
    insertDiversion(currentElm, nw, false, true, 200, restr);
  }
} else {
  removeDistantContent();
}
}

function setDistantSlider(){
slider = getElm("DIV");
 currentElm = getElm("DIV","nx-distant-link");
 setHistoryControls(linkedCtrls, setCurrentLink);
 hideDistantNav();
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

function toggleDistantLandmark(hasLinks){

  var hidden = distantLandmark.style.display == "none";
  if(hasLinks && hidden){
    fadeIn(distantLandmark);
  }else if(!hasLinks && !hidden){
    fadeOut(distantLandmark);
  }
}
function setLinkedItems(threadData) {


  if (threadData != null && threadData.linked.length) {
    var indexes = [];
    var done = [];
    var promises = [];
    threadData.linked.forEach((url) => {
      if(url){
        var extract = splitUrlAndId(url);
         var prc = resolveState(extract.url, extract.id).then((distantState) => {
            var key = distantState.dataUrl+"#"+distantState.threadId;
    
            if(!done.includes(key)){
              done.push(key);
              var elm = linkedElm(distantState);
            if (distantState.threadId == "/") {                 
              indexes.push(elm);
            } else {
              elm.append(threadContent(resolveThreadData(distantState)));
              linked.push(elm);


              if(linkedCtrls.count === 0){
            setFirstDistantContent();
              }
              linkedCtrls.count++;
              toggleNavEnd(linkedCtrls); 
            }
          }
          }).catch(err => {
            logErr(err.message);
          });
          promises.push(prc);
    }
    });
   Promise.all(promises).then(()=>{
     
      if(indexes.length){
        linked = linked.concat(indexes);
        if(linkedCtrls.count === 0){
          setFirstDistantContent();
        }
        linkedCtrls.count = linked.length;
        toggleNavEnd(linkedCtrls); 
      } 
     
    });
  
  }
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
      }else if(["description", "main", "aside", "caption"].includes(ref[ref.length-1])){
        data = convertLineBreaks(data);
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
