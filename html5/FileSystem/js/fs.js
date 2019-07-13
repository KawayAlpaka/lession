
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
function onInitFs(fs) {
  window.fs = fs;
  var hash = bizarre.Web.Hash.getHash();
  getEntry(hash.path).then(function(entry){
    console.log(entry);
    if(entry.isDirectory){
      currentDir = entry;
      hideEditor();
      refresh();
    }else if(entry.isFile){
      entry.getParent(function(parent){
        currentDir = parent;
        refresh()
          .then(()=>{
            selectFile(hash.path);
          });
      },errorHandler);
    }
  }).catch(function(e){
    console.log(e);
    currentDir = fs.root;
    bizarre.Web.Hash.setHash({path:currentDir.fullPath});
    refresh();
  });
}
function errorHandler(e) {
  console.log('Error: ' + e);
}

navigator.webkitPersistentStorage.requestQuota(1024 * 1024, function (grantedBytes) {
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);

}, function (e) {
  console.log('Error', e);
});

var showPanel = document.querySelector("#show-panel");
var cententEditor = document.querySelector("#centent-editor");
var editPanel = document.querySelector("#edit-panel");
var currentDir;
var refresh = function () {
  return new Promise((resolve,reject)=>{
    var dirReader = currentDir.createReader();
    var addEntryToView = function(temp,entry){
      var node = temp.cloneNode(true);
      node.classList.remove("template");
      node.querySelector(".entry-name").innerHTML = entry.name;
      node.setAttribute("data-path",entry.fullPath);
      showPanel.appendChild(node);
    };
    // Call the reader.readEntries() until no more results are returned.
    var readEntries = function () {
      dirReader.readEntries(function (results) {
        showPanel.innerHTML = "";
        var fileTemp = document.querySelector(".template.file-group");
        var dirTemp = document.querySelector(".template.dir-group");
        results.forEach(function(entry){
          if(entry.isDirectory){
            addEntryToView(dirTemp,entry);
          }
          if(entry.isFile){
            addEntryToView(fileTemp,entry);
          }
        });
        resolve();
      }, errorHandler);
    };
    readEntries(); // Start reading dirs.
  });
};

var createFile = function(){
  var fileName = document.querySelector("#file-name").value;
  if(!fileName || fileName.length <= 0){
    alert("请输入文件名");
  }else{
    currentDir.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
      console.log("创建：",fileEntry.fullPath);
      refresh();
    }, errorHandler);
  }
};

var createDir = function(){
  var dirName = document.querySelector("#dir-name").value;
  if(!dirName || dirName.length <= 0){
    alert("请输入目录名");
  }else{
    currentDir.getDirectory(dirName, {create: true}, function(dirEntry) {
      console.log("创建：",dirEntry.fullPath);
      refresh();
    }, errorHandler);
  }
};

var getFileContent = function(path){
  return new Promise(function(resolve,reject){
    currentDir.getFile(path, { create: true, exclusive: false }, function (fileEntry) {

      fileEntry.file(function (file) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
          resolve(this.result);
        };
        reader.readAsText(file);
      }, errorHandler);
  
    }, errorHandler);
  });
};

var saveFile = function(){
  getSelectEntry()
    .then((entry)=>{
      // console.log(entry);
      entry.createWriter(function (fileWriter) {
        // console.log(fileWriter);
        entry.remove(function() {
          fs.root.getFile(entry.fullPath, { create: true, exclusive: false }, function (fileEntry) {
            var bb = new Blob([cententEditor.value], { type: 'text/plain' });
            // fileWriter.truncate(bb.size);
            fileWriter.write(bb);
          }, errorHandler);
        }, errorHandler);
      }, errorHandler);
    });
};

var del = function(){
  getSelectEntry()
    .then((entry)=>{
      if(entry.isFile){
        entry.remove(function() {
          console.log('File removed.');
          refresh();
        }, errorHandler);
      }else if(entry.isDirectory){
        entry.removeRecursively(function() {
          console.log('Directory removed.');
          refresh();
        }, errorHandler);
      }
    });
};

var toUpDir = function(){
  if(currentDir.fullPath == fs.root.fullPath){
    alert("已经在顶层目录了");
  }else{
    currentDir.getParent(function(parent){
      currentDir = parent;
      refresh()
        .then(()=>{
          bizarre.Web.Hash.setHash({path:currentDir.fullPath});
        });
    });
  }
};

var getSelectEntry = function(){
  var selectDom = showPanel.querySelector(".entry-group.active");
  if(selectDom){
    return getEntry(selectDom.dataset.path,selectDom.dataset.type);
  }else{
    return Promise.reject();
  }
};

var getEntry = function(path,type){
  return new Promise(function(resolve,reject){
    var Catch = function(e){
      reject(e);
    };
    switch(type){
      case "file": 
        fs.root.getFile(path,{ create: false, exclusive: false },function(entry){
          resolve(entry);
        }, Catch);
        break;
      case "dir":
        fs.root.getDirectory(path, {create: false}, function(dirEntry) {
          resolve(dirEntry);
        }, Catch);
        break;
      default:
        fs.root.getFile(path,{ create: false, exclusive: false },function(entry){
          resolve(entry);
        }, function(){
          fs.root.getDirectory(path, {create: false}, function(dirEntry) {
            resolve(dirEntry);
          }, Catch);
        });
    }
  });
};

showPanel.addEventListener("click",function(e){
  e.stopPropagation();
  var entryGroup = e.path.find( node => {
    return node.classList && node.classList.contains("entry-group");
  });
  if(entryGroup){
    showPanel.querySelectorAll(".entry-group").forEach(function(node){
      node.classList.remove("active");
    });
    entryGroup.classList.add("active");
    if(entryGroup.dataset.type == "file"){
      bizarre.Web.Hash.setHash({path:entryGroup.dataset.path});
      getFileContent(entryGroup.dataset.path)
        .then((content)=>{
          cententEditor.value = content;
          showEditor();
        });
    }else{
      bizarre.Web.Hash.setHash({path:currentDir.fullPath});
      cententEditor.value = "";
      hideEditor();
    }
  }
},false);

showPanel.addEventListener("dblclick",function(e){
  e.stopPropagation();
  var entryGroup = e.path.find( node => {
    return node.classList && node.classList.contains("entry-group");
  });
  if(entryGroup){
    if(entryGroup.dataset.type == "dir"){
      getEntry(entryGroup.dataset.path,"dir")
        .then(function(entry){
          currentDir = entry;
          refresh()
            .then(()=>{
              bizarre.Web.Hash.setHash({path:currentDir.fullPath});
            });
        });
    }
  }
},false);

var showEditor = function(){
  editPanel.style.visibility = "visible";
};
var hideEditor = function(){
  editPanel.style.visibility = "hidden";
};

var selectFile = function(path){
  var entryGroups = showPanel.querySelectorAll(".entry-group");
  entryGroups.forEach(function(entryGroup){
    if(entryGroup.dataset.path == path){
      entryGroup.classList.add("active");
    };
  });
  getFileContent(path)
    .then((content)=>{
      cententEditor.value = content;
      showEditor();
    });
};
