(function () {
  import("../elms/NxViewI.js").then((NxViewI)=> { 
  import("../procs/NxInit.js").then((NxIO)=> { 
    var buildCallback = function(state){return NxViewI.viewerBlocks(state)};
    NxIO.Init(buildCallback);
    });
  });
})();
