(function () {
      import("../elms/NxEditorInstance.js").then((NxEditor)=> { 
      import("../load/NxInit.js").then((NxInit)=> { 
        NxInit.initPage(NxEditor.editorElms);
        });
      });
    })();
    