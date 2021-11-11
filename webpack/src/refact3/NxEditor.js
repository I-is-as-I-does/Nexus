
import { appBlock } from "./elms/NxApp.js";
import { historyBlock } from "./elms/NxHistory.js";
import { indexBlock } from "./elms/NxIndex.js";
import { getElm, instanceWrap, errorPrgr } from "./elms/NxMeta.js";
import { sourceBlock } from "./elms/NxSource.js";
import { threadBlocks } from "./elms/NxThread.js";


export function editorContent(success, state){
    if(!success){
        return errorPrgr();
    }
    var indexPart = getElm("DIV");
    indexPart.append(indexBlock(state));
    var threadPart = getElm("DIV");
    threadPart.append(...threadBlocks(state));
    
    return instanceWrap([appBlock(), historyBlock(state,true)], [
     indexPart,
     threadPart
     ], [sourceBlock(state,true)]);
}