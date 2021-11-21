
import { historyBlock } from "./NxHistory.js";
import { sourceBlock } from "./NxSource.js";

import { appBlock } from "./NxApp.js";
import { threadBlocks } from "./NxThread.js";
import { indexBlock } from "./NxIndex.js";
import { getElm, instanceWrap } from "./NxMeta.js";

export function viewerBlocks(state) {

    var indexPart = getElm("DIV");
    indexPart.append(indexBlock(state));
    var threadPart = getElm("DIV");
    threadPart.append(...threadBlocks(state));
  
   return instanceWrap([appBlock(), historyBlock(state)], [
     indexPart,
     threadPart
     ], [sourceBlock(state)]);
  }
  
