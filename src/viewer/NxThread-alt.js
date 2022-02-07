/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */

// @doc: all linked threads are loaded and displayed; no slider

import { isNonEmptyStr } from "@i-is-as-i-does/jack-js/src/modules/Check.js";
import { easeIn, easeOut} from "@i-is-as-i-does/valva/src/legacy/Valva-v1.js";
import { registerUpdateEvt, resolveState } from "../browser/NxState.js";
import {
  authorIndexLink,
  authorUrl,
  viewLink,
} from "./NxIdent.js";
import { mediaElm } from "./NxMedia.js";
import { blockWrap, getElm,  landmarkElm,  lines,  threadTitleElm, spinContainer } from "./NxCommons.js";
import { logErr } from "@i-is-as-i-does/nexus-core/src/logs/NxLog.js";
import { splitUrlAndId } from "@i-is-as-i-does/nexus-core/src/validt/NxStamper.js";
import { Spinner } from "@i-is-as-i-does/nexus-core/src/data/NxSpin.js";

var threadBlocks
var distantThreadsElm

var descrpElm;
var contentElm;

var spinElm;
var spinner;
var ready = 0

var hasLinked = false

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
    if(hasLinked){
      toggleDistantLandmark(true) 
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
  resolveLinkedThreads(threadData)
  distantThreadsElm = getElm('DIV', 'nx-distant-threads')
  return blockWrap("distant", [distantThreadsElm], distantLandmark);
}

function localThreadBlock(threadData) {
  setContentElm(threadData);
  return blockWrap("local", [contentElm], landmarkElm("local"));
}

function setContentElm(threadData) {
  contentElm = getElm("DIV", "nx-local-content");
  contentElm.append(threadContent(threadData, false));
}


function resetDistantLinks(threadData){
  hasLinked = false
  distantThreadsElm.textContent = '';
  toggleDistantLandmark(false)
  resolveLinkedThreads(threadData)
}

function resolveLinkedThreads(threadData){
  if (threadData && threadData.linked.length) {  
    setLinkedItems(threadData);
    } else {
      countReady()
    }
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
  var linked = []
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
        linked = linked.concat(indexes)
      }  
      if(linked.length){
        hasLinked = true
        distantThreadsElm.append(...linked)
      }
      countReady()   
    });
}

function threadContent(threadData, isDistant = false) {
  var dv = getElm("DIV", "nx-content");
  if (threadData) {
  var elms = [dateElm(threadData), contentBody(threadData)]
  if (threadData.content.media && threadData.content.media.url) {
    var callb = null
    if(!isDistant){
      callb = countReady
    }
    elms.push(mediaElm(threadData, callb))
  } else if(!isDistant) {
    countReady()
  }
  dv.append(...elms);
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
