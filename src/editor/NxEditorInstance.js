import { editMenu, editDistantBlock, editIndexBlock, editLocalBlock, instanceSwitch, setThreadsForms } from "./NxEdit.js";
import { appBlock, getElm, instanceWrap } from "../viewer/NxCommons.js";
import { viewerElms } from "../viewer/NxViewerInstance.js";


var viewerInst;
var editInst;


   export function editorElms(state){
     setThreadsForms(state);

      viewerInst = viewerElms(state);

     var metaInst = getElm("DIV");

     var indexPart = getElm("DIV");
     indexPart.append(editIndexBlock());
     var threadPart = getElm("DIV");
     threadPart.append(editLocalBlock(),editDistantBlock());
     
     editInst = instanceWrap([appBlock(), editMenu()], [
      indexPart,
      threadPart
      ], [], "edit");
   

     metaInst.append(editInst, instanceSwitch(viewerInst, editInst));
      return metaInst;
   }