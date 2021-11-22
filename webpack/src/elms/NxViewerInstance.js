
import { historyBlock } from "./viewer/NxHistory.js";
import { indexBlock } from "./viewer/NxIndex.js";
import { getElm, instanceWrap, appBlock } from "./NxCommons.js";
import { sourceBlock } from "./viewer/NxSource.js";
import { threadBlocks } from "./viewer/NxThread.js";


export function viewerElms(state){

    var indexPart = getElm("DIV");
    indexPart.append(indexBlock(state));
    var threadPart = getElm("DIV");
    threadPart.append(...threadBlocks(state));
    
    return instanceWrap([appBlock(), historyBlock(state)], [
     indexPart,
     threadPart
     ], [sourceBlock(state)]);
}