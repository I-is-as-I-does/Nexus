import { conciseUrl } from "../libr/Jack/Web.js";
import { registerTranslElm } from "../core/transl/NxElmTranslate.js";


export function getEditDataList(){
    return getStorageKeys('local', editprefix);

  }

  export function getStorageKeys(storage = 'local', prefix = null){
    var store = resolveStore(storage);
    var keys = [];
    if (store != null) {
      keys = Object.keys(store);
  
      if(prefix){
        var len = prefix.length;
        keys = keys.filter((k)=>
  k.substr(0,len) == prefix);
      }
  
    }
   return keys;
  }
  
  

var serverListElm;
var serverSrcList = {};
var serverAuth = false;


function storedList(){
  var keys = getEditDataList();
  var list = getElm("UL","nx-open-list nx-open-browser-list");

  keys.forEach(k => {
    var name = k.substr(8);
    var li = fileListItm(list, name, function(){
      resetData(getStoredEditData(name));  
    });
    list.append(li);
  });
  if(!keys.includes("nx-edit#nexus-tmp")){
    var li = fileListItm(list, "nexus-tmp", function(){
      resetData(newData());  
    });
    list.append(li);
  }
  return list;
}

function serverList(){
  serverListElm = getElm("UL","nx-open-list nx-open-server-list");
for(let [name, url] of serverSrcList){

    serverListElm.append(fileListItm(serverListElm, name, function(){
      getSrcData(url).then(data => {
        resetData(data);
      })    
    }));
  }
  return serverListElm;
}

function fileListItm(list, name, dataCall){
  var li = getElm('LI');
  var lk = getElm('A');
  lk.textContent = name;
  if(name ==editName){
    lk.classList.add('nx-on-display');
  }
  lk.addEventListener('click', function(){
    if(name !=editName){
      editName = name;
      dataCall();
      list.querySelector('.nx-on-display').classList.remove('nx-on-display');
      lk.classList.add('nx-on-display');
    }
  
  });
  li.append(lk);
  return li;
}


function menuCloseElm(targetElm){
  var cls = getElm("SPAN", 'nx-edit-close-menu');
  cls.textContent = 'X';
  cls.addEventListener('click', function () {
    easeToggle(targetElm, 200);
    });
    return cls;
}

function openMenu(){
  var hd = getElm('P',"nx-storage-header");
  var txtk = 'Storage'
  hd.textContent = getTxt();
  registerTranslElm(hd, txtk);
var openMenu = getElm('DIV', 'nx-open-menu');
openMenu.style.display = 'none';
var catg ={"browser":storedList()};
if(serverAuth && serverSrcList.length){
  catg['server'] = serverList();
}
openMenu.append(menuCloseElm(openMenu));
for(let [k,v] of Object.entries(catg)){
  openMenu.append(menuCategory(k), v);
}
return openMenu;
}

function storedBtn(openMenu){
  var strBtn = getElm('BUTTON', 'nx-stored-doc');
  strBtn.type = "button";
  strBtn.textContent = "🗀";
  strBtn.addEventListener('click', function () {
    easeToggle(openMenu);
  });

  return strBtn;
}


function setEditName(url){
  editName = "nexus-tmp";
  if (url) {
   
    if(editName.substr(-1) !== '/'){
      editName = url.split('/').pop();
      if(editName.substr(-5) == '.json'){
        editName = editName.substr(0,editName.length-5);
      }
    } else {
      editName = "nexus-dft";
    }
  }
}



export function menuCategory(name, subcount = 1) {
    var p = getElm("P", "nx-edit-category");
  
    for (var i = 0; i < subcount; i++) {
      var sp = getElm("SPAN", "nx-edit-category-indent");
      sp.textContent = "|";
      p.append(sp);
    }
    var txtsp = getElm("SPAN");
    txtsp.textContent = getTxt(name);
  registerTranslElm(txtsp, name);
    p.append(txtsp);
    return p;
  }

/*
.nx .nx-edit-category-indent {
    padding-left: 2px;
}



.nx .nx-edit-category span:last-of-type {
    padding-left: 4px;
}

.nx .nx-edit-category {
    margin-bottom: 1em;
    font-family: "Inconsolata", "Courier New", Courier, monospace;
    text-transform: capitalize;
}


*/