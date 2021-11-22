(function () {
  

  import("../elms/NxViewerInstance.js").then((NxViewer)=> { 
  import("../load/NxInit.js").then((NxInit)=> { 
    NxInit.initPage(NxViewer.viewerElms);
    });
  });
})();
