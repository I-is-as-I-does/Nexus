/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */
import { appHeaderWithLang, getElm, instanceWrap, serviceWrap } from "../browser/NxCommons.js";
import { viewerElms } from "../viewer/NxViewer.js";
import { editDistantBlock, editIndexBlock, editLocalBlock, getEditMenu, setEditState, instanceSwitch } from "./NxEdit.js";

export function editorElms(seed){

    setEditState(seed.state, seed.nxelm);

    var viewerInst = viewerElms(seed);
  
   var indexPart = getElm("DIV");
   indexPart.append(editIndexBlock());
   var threadPart = getElm("DIV");
   threadPart.append(editLocalBlock(),editDistantBlock());
   
   var editInst = instanceWrap(appHeaderWithLang(),[serviceWrap
  ([getEditMenu()], [
    indexPart,
    threadPart
    ], [], "edit")]);

    var editor = getElm('DIV','nx-editor')
    editor.append(editInst, instanceSwitch(viewerInst, editInst))
    
    return editor
  }
  