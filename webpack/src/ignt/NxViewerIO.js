(function () {
  import("../elms/viewr/NxViewI.js").then((NxViewI)=> { 
  import("../procs/NxInit.js").then((NxIO)=> { 
    NxIO.Init(function(state){return NxViewI.viewerBlocks(state)});
    });
  });
})();
