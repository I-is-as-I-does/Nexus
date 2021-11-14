
import { appBlock } from "./elms/NxApp.js";
import { editIndexBlock, editActions,  setThreadsForms, editLocalBlock, editDistantBlock} from "./elms/NxEdit.js";
import { getElm, instanceWrap, errorPrgr } from "./elms/NxMeta.js";
import { sourceBlock } from "./elms/NxSource.js";


export function editorContent(success, state){
    if(!success){
        return errorPrgr();
    }

    setThreadsForms(state);

    var indexPart = getElm("DIV");
    indexPart.append(editIndexBlock());
    var threadPart = getElm("DIV");
    threadPart.append(editLocalBlock(),editDistantBlock());
    
    var instWrap = instanceWrap([appBlock(), editActions()], [
     indexPart,
     threadPart
     ],[]);
     instWrap.classList.add('nx-edit');
     return instWrap;
}