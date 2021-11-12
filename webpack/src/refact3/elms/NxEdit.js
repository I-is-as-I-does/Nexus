import { charMinMax, idPattern } from "../NxConstants.js";
import { NxState } from "../NxState.js";
import { NxMemory } from "../NxMemory.js";
import { NxTranslate } from "../NxTranslate.js";
import { blockWrap, getElm, setHistoryControls } from "./NxMeta.js";

var editState = {
  dataUrl: null,
  srcData: null,
  threadId: "/",
  threadIndex: -1
};
var editHistory = [];
var actCtrls = {
    "ctrls":{
    "prev": {"symbol":"↶", "elm":null},
     "next": {"symbol":"↷", "elm":null},
    },
     position:0,
     count:0
   }

function editBtn() {
  var btn = getElm("BUTTON", "nx-edit");
  btn.type = "button";
  btn.textContent = "✎";
  return btn;
}
function setAuthorValue(ref, value){
    if(!editState.srcData.author){
        editState.srcData.author = {};
    }
    editState.srcData.author[ref[1]] = value;
    return;
}

function setThreadIndex(ref){
    if(!editState.srcData.threads){
        editState.srcData.threads = [];
    } else if(typeof editState.srcData.threads[ref[1]] === 'undefined'){
        editState.srcData.threads[ref[1]] = {};
    }
}

function setThreadInfo(ref, value){
    editState.srcData.threads[ref[1]][ref[2]] = value;
}

function setRecordValue(ref, value){
    if(!editState.srcData.threads[ref[1]].record){
        editState.srcData.threads[ref[1]].record = {};
    }
    if(ref[3] != "media"){
        editState.srcData.threads[ref[1]].record[ref[3]] = value;
        return;
    }
    if(!editState.srcData.threads[ref[1]].record.media){
        editState.srcData.threads[ref[1]].record.media = {};
    }
    editState.srcData.threads[ref[1]].record.media[ref[4]] = value; 
    return;
}

function setLinkedValue(ref, value){
if(!editState.srcData.threads[ref[1]].linked){
    editState.srcData.threads[ref[1]].linked = [];
} else if (typeof editState.srcData.threads[ref[1]].linked[ref[3]] === 'undefined'){
    editState.srcData.threads[ref[1]].linked[ref[3]] = {};
}
editState.srcData.threads[ref[1]].linked[ref[3]][ref[4]] = value;
}

function setNewValue(ref, value){
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

if(ref[2] == "record"){
    setRecordValue(ref, value);
}
setLinkedValue(ref, value);
}


function fieldValue(ref) {
  if (editState.srcData) {
    var val = editState.srcData[ref[0]][ref[1]];
    if (ref[0] != "author") {
      val = val[ref[2]];
      if (["linked", "record"].includes(ref[2])) {
        val = val[ref[3]];
        if (ref[3] == "media" || ref[2] == 'linked') {
          val = val[ref[4]];
        } 
      }
    }
    return val;
  }
  return "";
}
function textInput(val){
    var inp = getElm("INPUT", "nx-edit-text");
    inp.type = "text";
    inp.value = val;
    return inp;
}
function mediaTypeInput(val) {


}
function textareaInput(val){
    var inp = getElm("TEXTAREA", "nx-edit-textarea");
    inp.textContent = val;
    return inp;
}
function dateInput(val) {
    inp = getElm("INPUT", "nx-edit-date");
    inp.type = "datetime-local";
    inp.value = val;
   return inp;
}

function getInpt(val, field){
    var inp;
    if (["about", "description", "main", "aside", "caption"].includes(field)) {
        inp = textareaInput(val);
      } else if( field == "timestamp") {
       inp = dateInput(val);
      } else if(field == "type") {
        inp = mediaTypeInput(val);
      } else {
        inp =textInput(val);
      }
      return inp;
}
function baseLabel(field){
    var lb = getElm("LABEL", "nx-edit-label");
    lb.for = field;
    var title = getElm("SPAN", "nx-edit-title");
    title.textContent = NxTranslate.getTxt(field);
    NxState.registerTranslElm(title, field);
    lb.append(title);
    return lb;
}

function inputElm(ref) {

  var val = fieldValue(ref);
  var field = ref[ref.length - 1];
  var inp = getInpt(val, field);

  var hook = ref.join("-");
  inp.id = hook;
  inp.name = hook;
  if (["handle", "name", "main", "id", "url", "type", "timestamp"].includes(field)) {
    inp.required = true;
  }

var lb =  baseLabel(field);
  var indc = getElm("SPAN", "nx-edit-indication");
  lb.append(indc);

  if (field == "url") {
    indc.textContent = "[http]";
    inp.pattern = "^https?://\\w+\\.\\w+.*";

  } else if (!["timestamp", "type"].includes(field)) {

    var minmax = charMinMax[field];
    indc.textContent = "[" + minmax[0] + "-" + minmax[1] + "]";
    inp.setAttribute('maxlength',minmax[1]);
    inp.setAttribute('minlength',minmax[0]);
    if (field == "id") {
        inp.pattern = idPattern;
      } 
  }
  var fdbck = invalidSp();
  setListener(ref, inp, fdbck);

  return {label: lb, input: inp,  feedback:fdbck };
}

function inputEvt(ref, inp, fdbck){
    if(inp.checkValidity()){
        setNewValue(ref, inp.value);
        fdbck.textContent = '✓';
    } else {
        fdbck.textContent = '✗';
    }
}

function setListener(ref, inp, fdbck){
    inp.addEventListener('input',function(){
        inputEvt(ref, inp, fdbck);
    });
    inputEvt(ref, inp, fdbck);
}

function invalidSp(){
    var sp = getElm("SPAN", "nx-edit-feedback");
   // sp.style.display = 'none';
    return sp;
}

function updateInputs(){

}

export function editActions(){
 var wrp = getElm('DIV','nx-edit-actions');
    setHistoryControls(actCtrls, function(position){
        setState(editHistory[position]);
        updateInputs();
    });
    wrp.append(actCtrls.ctrls['prev'].elm, actCtrls.ctrls['next'].elm); //@todo: save, new
    return wrp;
}

export function authorForm() {
   
  var form = getElm("FORM", "nx-edit-author");
  ["handle", "url", "about"].forEach(field => {
    var elms = inputElm(["author",field]);
    form.append(elms.label, elms.input, elms.feedback);
  });

  return blockWrap("author", null, [form], true);
}

export function setState(state){
    if(!state || !state.srcData){
        editState.srcData = NxMemory.getStoredEditData();
    } else {
        NxMemory.registerEditData(state.srcData);
        editState = state;
    }
    if(state.srcData){     
        if(actCtrls.count === 5){
            editHistory.splice(0, 1);
        }
        editHistory.push(state);
        actCtrls.count++;
        actCtrls.position++;
    }
}
/*  editbtn.addEventListener('click', function(){
    editbtn.disabled = true;
    savebtn.disabled = false;
    ["handle", "url", "about"].forEach(field => {
        inputs[field].disabled = false;
  
    });
  });*/