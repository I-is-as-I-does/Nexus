/*! Nexus | (c) 2021 I-is-as-I-does | AGPLv3 license */

import { historyBlock } from "./NxHistory.js.js";
import { indexBlock } from "./NxIndex.js.js";
import { getElm, serviceWrap
 } from "./NxCommons.js";
import { sourceBlock } from "./NxSource.js.js";
import { threadBlocks } from "./NxThread.js.js";


export function viewerElms(state){

    var indexPart = getElm("DIV");
    indexPart.append(indexBlock(state));
    var threadPart = getElm("DIV");
    threadPart.append(...threadBlocks(state));
    
    return [serviceWrap
([historyBlock(state)], [
     indexPart,
     threadPart
     ], [sourceBlock(state)])];
}