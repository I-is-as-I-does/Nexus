 Remake.clientInit({
    filename:"nexus-test",
     wrapId:"nexus-editor",
     appdataId:"app-data",
     dlLinkId:"data-download",
    // Log data to console when page is 
    // saved, useful for debugging
    logDataOnSave: true,
    // Load Sortable library for drag and 
    // drop reordering (only use if your 
    // app  needs drag-and-drop reordering)
    sortable: {sortablejs: Sortable},
    // Load crostini for displaying 
    // temporary success/error notices
    crostini: crostini,
    // Load Handlebars for rendering the 
    // demo on the client-side
    Handlebars: Handlebars,
    // Where in localStorage to store data
    demoLocalStorageNamespace: "nexus-editor-app",
    // Initial data to load into the demo app
    demoStartingData: {
        "title": "Prototype I : Pelote",
          "author":"Anon",
        "records": [{"content":"blabla"}]  }     
    
  });