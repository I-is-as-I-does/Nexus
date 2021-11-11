(function () {
      import("../NxEditor.js").then((NxEditor)=> { 
      import("../NxInit.js").then((NxInit)=> { 
        NxInit.initPage(NxEditor.editorContent);
        });
      });
    })();
    