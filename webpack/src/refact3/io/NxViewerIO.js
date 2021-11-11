(function () {
  import("../NxViewer.js").then((NxViewer)=> { 
  import("../NxInit.js").then((NxInit)=> { 
    NxInit.initPage(NxViewer.viewerContent);
    });
  });
})();
