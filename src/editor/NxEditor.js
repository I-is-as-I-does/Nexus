import { getElm, serviceWrap } from "../viewer/NxCommons.js";
import { viewerElms } from "../viewer/NxViewer.js";
import { editDistantBlock, editIndexBlock, editLocalBlock, editMenu, setEditState, instanceSwitch } from "./NxEdit.js";

export function editorElms(state){
    setEditState(state);

    var viewerInst = viewerElms(state)[0];
  
   var indexPart = getElm("DIV");
   indexPart.append(editIndexBlock());
   var threadPart = getElm("DIV");
   threadPart.append(editLocalBlock(),editDistantBlock());
   
   var editInst = serviceWrap
  ([editMenu()], [
    indexPart,
    threadPart
    ], [], "edit");
  
    return [editInst, instanceSwitch(viewerInst, editInst)];
  }
  