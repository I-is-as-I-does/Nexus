/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { isNonEmptyStr } from "@i-is-as-i-does/jack-js/src/modules/Check.js";
import { easeIn, easeOut, insertDiversion, replaceDiversion } from "@i-is-as-i-does/valva/src/legacy/Valva-v1.js";
import { registerUpdateEvt, resolveState } from "../browser/NxState.js";
import {
  authorIndexLink,
  authorUrl,
  viewLink,
} from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap, getElm,  landmarkElm,  lines,  setHistoryControls,  threadTitleElm, toggleNavEnd, spinContainer } from "../browser/NxCommons.js";
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog.js";
import { splitUrlAndId } from "@i-is-as-i-does/nexus-core/src/validt/NxStamper.js";
import { Spinner } from "@i-is-as-i-does/nexus-core/src/data/NxSpin.js";

var threadBlocks

var currentElm;
var descrpElm;
var contentElm;
var distantNav;

var slider;
var linked = [];

var spinElm;
var spinner;
var ready = 0

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

 function setSpinner(){
 spinElm = spinContainer()
 spinner = new Spinner(spinElm)
 }

function countReady(){
  ready++
if(ready === 2){
  spinner.endSpin()
  spinElm.style.display = 'none'
    if(linked.length){
      linkedCtrls.count = linked.length;
      toggleNavEnd(linkedCtrls); 
      setFirstDistantContent(linked.length > 1);
    }
    easeIn(threadBlocks, 150)
}
}

function updateThreadBlocks(state) {
  ready = 0
  spinner.startSpin()

  easeOut(threadBlocks, 150, function(){
    spinElm.style.display = 'block'

    var newThreadData = resolveThreadData(state);
    resetDistantLinks(newThreadData);
  
    var newContent = threadContent(newThreadData, false);
    var newDescrpTxt = threadTextElm(newThreadData, ["description"]);
    descrpElm.firstChild.replaceWith(newDescrpTxt)
    contentElm.firstChild.replaceWith(newContent)
  })
}

function descriptionElm(threadData) {
  descrpElm = getElm("DIV", "nx-thread-description");
  descrpElm.append(threadTextElm(threadData, ["description"]));
  return descrpElm
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
  resolveLinkedThreads(threadData)
  return blockWrap("distant", [slider], distantLandmark);
}

function localThreadBlock(threadData) {
  setContentElm(threadData);
  return blockWrap("local", [contentElm], landmarkElm("local"));
}

function setContentElm(threadData) {
  contentElm = getElm("DIV", "nx-local-content");
  contentElm.append(threadContent(threadData, false));
}

function showDistantNav(){
  distantNav.style.visibility = 'visible'
}


function hideDistantNav(){
  distantNav.style.visibility = 'hidden'
}

function resetDistantLinks(threadData){

  hideDistantNav()
  toggleDistantLandmark(false)
  removeDistantContent(false);

   linked = [];
   linkedCtrls.position = 0;
   linkedCtrls.count = 0;
  toggleNavEnd(linkedCtrls);

  resolveLinkedThreads(threadData)
}

function resolveLinkedThreads(threadData){
  if (threadData && threadData.linked.length) {  
    setLinkedItems(threadData);
    } else {
      countReady()
    }
}

function removeDistantContent(transition = false){
  var prevElm = currentElm.firstChild;
  if(prevElm){
    if(transition){
      easeOut(prevElm,150,function(){
        prevElm.remove();
      });
    } else {
      prevElm.remove();
    }

  }
}

function setFirstDistantContent(showNav = false){
  /*  var callb = function(){
      toggleDistantLandmark(true)
      if(showNav){
        showDistantNav()
      }      
    }
  insertDiversion(currentElm, linked[0], false, true, 200, callb);*/
  toggleDistantLandmark(true)
      if(showNav){
        showDistantNav()
      }      
  currentElm.append(linked[0])
}

function setCurrentLink(){
  if(linked.length){
   var nw = linked[linkedCtrls.position];

  if(currentElm.firstChild){
      replaceDiversion(currentElm.firstChild, nw)
  } else {
    insertDiversion(currentElm, nw, false, true, 150, callb);
  }
} else {
  removeDistantContent(true);
}
}

function distantNavElm(){
  distantNav = getElm('NAV', 'nx-distant-nav')
  distantNav.append(linkedCtrls.ctrls["prev"].elm, currentElm, linkedCtrls.ctrls["next"].elm)
  hideDistantNav()
  return distantNav
}

function setDistantSlider(){
slider = getElm("DIV");
 currentElm = getElm("DIV","nx-distant-link");
 setHistoryControls(linkedCtrls, setCurrentLink);
 toggleNavEnd(linkedCtrls);
 slider.append(distantNavElm(), currentElm);

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
  var hidden = distantLandmark.style.display === "none";
  if(hasLinks && hidden){
    distantLandmark.style.display = 'block'
  }else if(!hasLinks && !hidden){
    distantLandmark.style.display = 'none'
  }
}
function setLinkedItems(threadData) {

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
              elm.append(threadContent(resolveThreadData(distantState), true));
              linked.push(elm);
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
      }  
      countReady()   
    });
}

function threadContent(threadData, isDistant = false) {
  var dv = getElm("DIV", "nx-content");
  var callb = null
  if(!isDistant){
    callb = countReady
  }
  var callbsent = false
  if (threadData) {
  var elms = [dateElm(threadData), contentBody(threadData)]
  if (threadData.content.media && threadData.content.media.url) {
    callbsent = true
    elms.push(mediaElm(threadData, callb))
  }
  dv.append(...elms);
} 
if(!callbsent && callb !== null){
  callb()
}
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
        data = lines(data)
      }
      return data;
    }
  }
  return "";
}

function threadHeader(state, threadData){
  var header = getElm('DIV', 'nx-thread-header')
  header.append(threadTitleElm(state, true), descriptionElm(threadData))
  return header
}

function localAndDistantBlocks(threadData){

  threadBlocks = getElm('DIV', 'nx-thread-blocks')
  threadBlocks.style.display = 'none'
  threadBlocks.append(localThreadBlock(threadData),  distantThreadBlock(threadData))

  return threadBlocks
}

export function threadTextElm(threadData, ref) {
  var dv = getElm("DIV", "nx-" + ref.join("-"));
  dv.append(threadFieldText(threadData, ref));
  return dv;
}

export function mainThreadBlock(state) {
  var threadData = resolveThreadData(state);
  var mainBlock = getElm('DIV', 'nx-main-block nx-thread')
 
  setSpinner()
  spinner.startSpin()
  
  var blocks = [
    threadHeader(state, threadData),
    spinElm, 
    localAndDistantBlocks(threadData)
  ];

  mainBlock.append(...blocks)

registerUpdateEvt(function (newState) {
    updateThreadBlocks(newState);
  });

  return mainBlock;
}
