(function () {
  

  import("../servc/NxViewer.js").then((NxViewer)=> { 
  import("../load/NxInit.js").then((NxInit)=> { 
    NxInit.initPage(NxViewer.viewerContent);
    });
  });
})();
