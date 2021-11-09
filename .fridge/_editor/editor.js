class NexusEditor {
    constructor(utils, lang){
      
       this.setTexts(lang);
        this.utils = utils;
        this.loadLibraries().then(()=>this.loadEditor());

    }
   
    setTexts(lang){
        if(!lang){
            lang = document.querySelector("html").lang;
        }
        var transl = {
            'en':{
               'invalid-file':'invalid file'
            },
            'fr':{
               'invalid-file':'fichier non valide'
            }
        };
        if(!transl.hasOwnProperty(lang)){
            lang = 'en';
        }
        this.lang = lang;
        this.txt = transl[lang];
    }
    loadLibraries(){
   
        return this.utils.loadJs("UIkit", "https://cdn.jsdelivr.net/npm/uikit@3.7.3/dist/js/uikit.min.js").
        then(()=>this.utils.loadJs("UIkitIcons", "https://cdn.jsdelivr.net/npm/uikit@3.7.3/dist/js/uikit-icons.min.js")).
        then(()=>this.utils.loadJs("UiKitDragDropper", "dragdropper.js")).
        then(()=>this.utils.loadCss(".uk-section","https://cdn.jsdelivr.net/npm/uikit@3.7.3/dist/css/uikit.min.css")).
        then(()=>this.utils.loadCss("#nexus-editor", "editor.css"));
    }

    setJson(file){
      
        var reader = new FileReader();
        reader.onload = function(event){
            this.onReaderLoad(event)}.bind(this);
        reader.readAsText(file);   
    }

    onReaderLoad(event){
      
        var obj = JSON.parse(event.target.result);
       if(!obj || !obj.hasOwnProperty("Nexus")){
           return this.unproperFile();
       }
        this.NexusData = obj;
        this.resetFeedback();
        this.toggleForm();
    }

    toggleForm(){
        var callback = function(){
            if(this.dragdropElm.hidden == true){
                this.formElm.hidden = true;
                this.dragdropElm.hidden = false;
            } else {
                this.fillForm();
                this.dragdropElm.hidden = true;
                this.formElm.hidden = false;
            }
            
        }.bind(this);
        this.utils.smoothToggle(this.editorElm, callback);
    }
    
    fillForm(){
        if(this.NexusData){

        }
    }
    resetFeedback(){
        if(this.feedbackActive){

            var callback = function(){
                this.feedbackElm.textContent = "";
            }.bind(this);
           this.utils.smoothToggle(this.feedbackElm, callback);
            
        }
       
    }

    unproperFile(){
        this.feedbackActive = true;
        this.feedbackElm.textContent = this.txt['invalid-file'];
    }

    loadDragDropper(){
        var wrapid = "drag-dropper";
        var ddoptions = {wrapid:wrapid, accept:"application/json", loadCallback:function(file){return this.setJson(file)}.bind(this), rejectCallback:function(){return this.unproperFile()}.bind(this), lang:this.lang, width:250, height:150};

        this.dragdropElm = document.createElement('DIV');
        this.dragdropElm.id = wrapid;
        return Promise.resolve(this.editorElm.prepend(this.dragdropElm)).then(function(){
            var dragdropper = new UiKitDragDropper(ddoptions);
            dragdropper.load();
        });

       
    }

    toggleButn(){
        this.toggleBtn = document.createElement('BUTTON');
        this.toggleBtn.classList.add('uk-button uk-button-default uk-button-small'); 
        var label = `<span uk-icon="icon: refresh"></span>${this.txt['change-file']}`;
    }

    formTmplt(){
        return `<button class="uk-button uk-button-default uk-button-small"><span uk-icon="icon: refresh"></span></button>`;
    }

    loadFormElm(){
        this.formElm = document.createElement('FORM');
        this.formElm.id = "nexus-editor-form";     
        this.formElm.innerHTML = this.formTmplt();
        this.formElm.hidden = true;
        return Promise.resolve(this.editorElm.appendChild(this.formElm));
    }

    loadFeedbackElm(){
        this.feedbackElm = document.createElement('P');
        this.feedbackElm.id = "nexus-editor-feedback";
        return Promise.resolve(this.editorElm.appendChild(this.feedbackElm));
    }
   
    loadEditor(){
            this.editorElm = document.createElement('DIV');
            this.editorElm.id = "nexus-editor";

            Promise.resolve(document.body.appendChild(this.editorElm)).then(()=> this.loadFeedbackElm()).then(()=>this.loadFormElm()).then(()=>this.loadDragDropper());
        } 
    
}

window.onload = function () {
    var utils = new Utils();
    var editor = new NexusEditor(utils);

  };
  