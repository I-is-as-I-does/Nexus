import { init } from "./NxViewer";


export function initEdit(){
    var callback = function(state){
        console.log('im an editor for '+state.threadId);
    }
    init(callback);
}