
export function authorBlock(state){
    var elms = [authorHandle(state, false),aboutElm(state),authorUrl(state,false)];
   return blockWrap("nx-author",elms);
}


function aboutElm(state) {
    var ab = getElm("DIV", "nx-about-author");
    if(state.srcData){
        ab.textContent = convertLineBreaks(state.srcData.author.about);
      }
    return ab;
  }
