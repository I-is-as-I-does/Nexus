(function () {
      import("../elms/NxEditI.js").then((NxEditI)=> { 
      import("../procs/NxInit.js").then((NxIO)=> { 
        NxIO.Init(function(state){return NxEditI.editorBlocks(state)});
        });
      });
    })();
    