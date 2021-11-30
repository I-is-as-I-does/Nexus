import { editMenu, editDistantBlock, editIndexBlock, editLocalBlock, instanceSwitch, setThreadsForms } from "./NxEdit.js";
import { getElm, serviceWrap
 } from "../viewer/NxCommons.js";
import { viewerElms } from "../viewer/NxViewerInstance.js";

//@todo debug save nx-edit = custom key for each src + if edit version exists, override file
var viewerInst;
var editInst;


   export function editorElms(state){
     setThreadsForms(state);

      viewerInst = viewerElms(state);

     var indexPart = getElm("DIV");
     indexPart.append(editIndexBlock());
     var threadPart = getElm("DIV");
     threadPart.append(editLocalBlock(),editDistantBlock());
     
     editInst = serviceWrap
([editMenu()], [
      indexPart,
      threadPart
      ], [], "edit");
   
      return [editInst, instanceSwitch(viewerInst, editInst)];
   }