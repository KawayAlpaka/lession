let createEntry = function (pagesSrcDir){
    let pageArr = [
        // 'index/login',
        // 'index/index',
        // 'alert/index',
      ];
    let entry = {};
    pageArr.forEach((page) => {
        entry[page] = path.resolve(pagesSrcDir, page + '/page');
    });
    entry.main = "./src/js/main.js";
    return entry;
};

module.exports = createEntry;