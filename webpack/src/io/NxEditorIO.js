(function () {
      import("../servc/NxEditor.js").then((NxEditor)=> { 
      import("../load/NxInit.js").then((NxInit)=> { 
        NxInit.initPage(NxEditor.editorContent);
        });
      });
    })();
    