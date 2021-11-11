
import { historyBlock } from "./NxHistory.js";
import { sourceBlock } from "./NxSource.js";

import { appBlock } from "../shared/NxApp.js";
import { threadBlocks } from "../shared/NxThread.js";
import { indexBlock } from "../shared/NxIndex.js";
import { getElm, instanceWrap } from "../shared/NxMeta.js";

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
  
