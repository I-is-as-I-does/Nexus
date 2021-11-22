import { editActions, editDistantBlock, editIndexBlock, editLocalBlock, setThreadsForms } from "./editor/NxEdit.js";
import { appBlock, getElm, instanceWrap } from "./NxCommons.js";
import { viewerElms } from "./NxViewerInstance.js";
import { replaceDiversion  } from "../libr/Valva/Valva.js";

var viewerInst;
var editInst;

function instanceSwitch(){
var btn = getElm("BUTTON","nx-edit-switch");
btn.textContent ="👁";

btn.addEventListener('click',function(){
    if(btn.textContent == "✎"){
        btn.textContent ="👁";
        replaceDiversion(viewerInst, editInst);
    } else {
        btn.textContent ="✎";
        replaceDiversion(editInst, viewerInst);
    }

});

return btn;
}

   export function editorElms(state){
     setThreadsForms(state);

      viewerInst = viewerElms(state);

     var metaInst = getElm("DIV");

     var indexPart = getElm("DIV");
     indexPart.append(editIndexBlock());
     var threadPart = getElm("DIV");
     threadPart.append(editLocalBlock(),editDistantBlock());
     
     editInst = instanceWrap([appBlock(), editActions()], [
      indexPart,
      threadPart
      ], [], "edit");
   

     metaInst.append(editInst, instanceSwitch());
      return metaInst;
   }