
import { historyBlock } from "./NxHistory.js";
import { indexBlock } from "./NxIndex.js";
import { getElm, instanceWrap } from "./NxCommons.js";
import { sourceBlock } from "./NxSource.js";
import { threadBlocks } from "./NxThread.js";


export function viewerElms(state){

    var indexPart = getElm("DIV");
    indexPart.append(indexBlock(state));
    var threadPart = getElm("DIV");
    threadPart.append(...threadBlocks(state));
    
    return instanceWrap([historyBlock(state)], [
     indexPart,
     threadPart
     ], [sourceBlock(state)]);
}