Remake.clientInit = function (options) {
    /*************************
     *                       *
     *     Remake Setup      *
     *                       *
     *************************/
  
    /*
  
      Note:
      
      The following code makes Remake run client-side.
      
      This is possible because Remake's client-side code is decoupled from
      its backend code.
  
      To run this code, you need:
      - handlebars.min.js (https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.min.js)
      - remake.min.js (https://github.com/remake/remake-framework/blob/master/_remake/dist/remake/js/remake.min.js)
      - Sortable.min.js (https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js)
      - crostini.umd.js (https://cdn.jsdelivr.net/npm/crostini@latest/dist/crostini.umd.js)
      
      Remake usually:
      - Renders all templates server-side (for performance and SEO)
      - Has opinionated file-based routing based on template names
      - Has user accounts that data is stored in
      - Calls a server endpoint to save data permanently
      - Calls a server endpoint to upload files permanently
      - Has the option to turn on unique ids that can be used to render
        specific data or save into a specific point in the data
      - Only loads its client-side behavior (including its editable areas) if 
        the current user is the page author
      
      This code:
      - Renders the app client-side (still using Handlebars) and overwrites the
        new item behavior so new items are rendered client-side too
      - Has no routing at all, it's just a single page
      - Does not have user accounts, since it's only a client-side demo
      - Overwrites the save behavior so data is saved locally in your browser
      - Overwrites the upload behavior so files (especially images) can be 
        loaded and rendered client-side
      - Does not have the concept of unique ids
      
      --- CUSTOM BACKEND ---
        
      To use this code with a custom backend, you'll want to:
      - Create user accounts for each of your users
      - Save data to the current user's account
      - Load data from the current user's account
      - Check if the current user can edit the page and only display Remake's
        editable areas then
      - Render new items to the page based on the names of components/partials 
        (like Remake's `new:` attribute does)
      - (optional) Handle routing if you want your app to have multiple pages
      - (optional) Upload files to the current user's account
      - (optional) Have the ability to add unique ids to every object in your 
        data, so you can render only that object or save into only that object
  
      If you do implement a custom backend for Remake, please let me know! 
      I'd love to share your work with the rest of the community!
  
    */
  
  
    /*
  
      Protect against user error breaking the demo
      
    */
  
    if (options.saveFunctions) {
      console.warn("REMAKE WARN: By overwriting 'saveFunctions', you may break the client-side Remake app");
    }
  
    if (options._defaultAddItemCallback) {
      console.warn("REMAKE WARN: By overwriting '_defaultAddItemCallback', you may break the client-side Remake app");
    }
  
    if (options._defaultUploadCallback) {
      console.warn("REMAKE WARN: By overwriting '_defaultUploadCallback', you may break the client-side Remake app");
    }
  
  
    /*
  
      Overwrite Remake's defaults to make the client-side demo run
      
    */
    
    let clientsideOptions = {
      saveFunctions: {
        // overwrite the default save behavior to save to localStorage for this demo
        // instead of sending data to a save AJAX endpoint
        _defaultSave: function ({data, path, saveToId, elem}) {
          saveData(data);
        }
      },
      // overwrite the default new item behavior to be client-rendered for this demo
      // instead of calling a new item AJAX endpoint and rendering server-side
      _defaultAddItemCallback: function ({templateName, listElem, whereToInsert, shouldTriggerEdit, triggerEditOnElem}) {
        let savedRenderFunc = newItemLookup[templateName];
        if (savedRenderFunc) {
          let data = {};
          let renderedPartial = savedRenderFunc(data);
          listElem.insertAdjacentHTML(whereToInsert, renderedPartial);
  
          let itemElem = whereToInsert === "afterbegin" ? listElem.firstElementChild : listElem.lastElementChild;
          if (shouldTriggerEdit) {
            triggerEditOnElem(itemElem);
          }
  
          Remake.callSaveFunction(listElem);
        }
      },
      // overwrite the default upload behavior to be client-side
      // instead of actually uploading the file to a server
      _defaultUploadCallback: function ({fileInputElem, keyName, resetFileInput, file}) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          let result = fileReader.result;
          // actually display the file
          Remake.setValueForClosestKey({elem: fileInputElem, keyName, value: result});
          resetFileInput(fileInputElem);
        }
        // start reading file from upload
        fileReader.readAsDataURL(file);
      }
    };
  
    // combine any user-defined options with the settings for the demo
    Object.assign(clientsideOptions, options);
  
  
    /*
  
      Handlebars Helpers
  
      Extend the Handlebars template library with some extra helpers
      
    */
  
    // a Handlebar's helper that's useful for displaying a default value
    // to get more helpers, use: https://github.com/helpers/handlebars-helpers
    clientsideOptions.Handlebars.registerHelper("default", function() {
      for (let i = 0; i < arguments.length - 1; i++) {
        if (arguments[i] != null) return arguments[i];
      }
      return '';
    });
  
    // add support for Remake's #for loop, which remembers the names of items
    // and lets the user add them to the page when clicking a new:* button
    let forLoopStringRegex = /\{\{#for\s+(\S+)\s+in\s+([^\}\s]+)/g;
    // for storing the name and inner template of each #for loop item
    let newItemLookup = {};
    clientsideOptions.Handlebars.registerHelper("for", function(context, helperOptions) {
      
      // save the inner template of the #for loop item
      newItemLookup[helperOptions.hash.itemName] = helperOptions.fn;
      
      // render {{else}} block
      if (!context || context.length === 0) {
        return helperOptions.inverse(this);
      }
      
      // contextItem has any data passed into the helper
      let overallRender = context.map(contextItem => {
        
        // move the context item inside the name of the #for loop item
        let data = {};
        if (helperOptions.hash.itemName) {
          data[helperOptions.hash.itemName] = contextItem;
        }
        
        // render the inner #for loop item template
        let renderedItem = helperOptions.fn(data);
        return renderedItem;
        
      }).join("");
      
      return overallRender;
    });
  
  
    var appDataDiv = document.getElementById(options.appdataId);
    var dlLink = document.getElementById(options.dlLinkId);
    var appWrap = document.getElementById(options.wrapId);
    /*
  
      Handle the rendering of the Remake app with client-side Handlebars
      
    */
  
    // get the HTML that makes up the Remake app and compile it into a Handlebars template
    function getAppTemplate () {
  
      // use everything in the app container as the starting Handlebars template
      let appTemplateString = Array.from(document.querySelectorAll("#"+options.wrapId+" > :not(script):not(style):not(link)")).reduce((memo, el) => memo + "\n" + el.outerHTML, "");
      
      // replace Remake #for loop with actual Handlebars syntax
      // this is so we can use: {{#for todo in todos}}
      // instead of the less elegant: {{#for todos itemName="todo"}}
      let appTemplateStringWithForLoop = appTemplateString.replace(forLoopStringRegex, '{{#for $2 itemName="$1"');
      
      let appTemplate = clientsideOptions.Handlebars.compile(appTemplateStringWithForLoop);
      return appTemplate;
    }
  
    let appTemplate = getAppTemplate();
  
    function renderApp () {
      let appData = loadData();
      let appHtml = appTemplate(appData);
  
      appWrap.innerHTML = appHtml;
  
      // Initialize Remake after the DOM is rendered with data
      Remake.init(clientsideOptions);
    }
  
    // Trigger initial render
    renderApp();
  
  
    /*
  
      Render Remake app data if the user toggles to view it
      
    */

      function setDownloadLink(){
       
        let pageData = loadData();
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pageData, null, 2));
        dlLink.setAttribute("href",     dataStr);
        dlLink.setAttribute("download", options.filename + ".json");
        dlLink.hidden = false;
      }
  
    function renderAppData () {
      // load the current app data from localStorage
      let pageData = loadData();
  
      // get the app data
      let dataAsString = JSON.stringify(pageData, null, 2);

    // syntax highlight json
      let iteration = 0;
      let highlightedString = dataAsString.replace(/[^\\]"/g, function (match) {
        if (iteration % 2 === 0) {
          iteration++;
          return match.replace('"', '<span class="green-code">"')
        } else {
          iteration++;
          return match.replace('"', '"</span>')
        }
      });
  
      appDataDiv.innerHTML = '<div class="remake-json">' + highlightedString + '</div>'; //@todo: change unsafe innerHTML
      setDownloadLink();
    }
  
    /*
  
      Remake's error/success notices
      
    */
  
    // called whenever data is saved in Remake
    Remake.onSave(function (res) {
      if (!res.success) {
        clientsideOptions.crostini("Error saving data", {type: "error"});
      }
    });
  
    // called whenever a file is uploaded in Remake
    Remake.onFileUpload(function (res) {
      if (res.success) {
        clientsideOptions.crostini("File upload successful");
      } else {
        clientsideOptions.crostini("Error uploading file", {type: "error"});
      }
    });
  
    // called whenever new item is added to the page in Remake
    Remake.onAddItem(function (res) {
      if (!res.ajaxResponse.success) {
        clientsideOptions.crostini("Error adding new item", {type: "error"});
      }
    });

  
  
    /*
  
      Custom event listeners for the top menu in this demo
      
      (not useful for a real Remake app)
      
    */
    document.addEventListener("click", function (event) {

      
      // Implement "View app data" button, which displays the current app data
      let toggleViewButton = event.target.closest(".js-toggle-view");
      if (toggleViewButton) {
        renderAppData();
      } else {

        let toggleResetButton = event.target.closest(".js-toggle-reset");
        if (toggleResetButton) {
            resetData();
        }
      }


    });
  
    /*
  
      localStorage helper functions 
      
    */
  
    // store app data to localStorage
    function saveData (data) {
      localStorage.setItem(clientsideOptions.demoLocalStorageNamespace, JSON.stringify(data));
    }
  
    // load app data from localStorage
    function loadData () {
      let savedData = localStorage.getItem(clientsideOptions.demoLocalStorageNamespace);
      let pageData = savedData ? JSON.parse(savedData) : clientsideOptions.demoStartingData;
      return pageData;
    }
  
    // reset app data back to the starting data
    function resetData () {
      saveData(clientsideOptions.demoStartingData);
    }
  
  }
  