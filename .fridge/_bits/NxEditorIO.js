(function () {
      import("../editor/NxEditorInstance.js").then((NxEditor)=> { 
      import("../page/NxInit.js").then((NxInit)=> { 
        NxInit.initPage(NxEditor.editorElms);
        });
      });
    })();
    