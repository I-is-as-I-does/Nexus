(function () {
  import("../viewer/NxViewerInstance.js").then((NxViewer)=> { 
  import("../core/load/NxInit.js").then((NxInit)=> { 
    NxInit.initPage(NxViewer.viewerElms);
    });
  });
})();
