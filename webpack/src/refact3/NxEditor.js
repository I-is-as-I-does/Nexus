
import { appBlock } from "./elms/NxApp.js";
import { authorForm, editActions, setState } from "./elms/NxEdit.js";
import { getElm, instanceWrap, errorPrgr } from "./elms/NxMeta.js";
import { sourceBlock } from "./elms/NxSource.js";
import { threadBlocks } from "./elms/NxThread.js";



export function editorContent(success, state){
    if(!success){
        return errorPrgr();
    }

    setState(state);

    var indexPart = getElm("DIV");
    indexPart.append(authorForm());
    var threadPart = getElm("DIV");
    threadPart.append(...threadBlocks(state));
    
    return instanceWrap([appBlock(), editActions()], [
     indexPart,
     threadPart
     ], [sourceBlock(state,true)]);
}