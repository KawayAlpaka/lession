(function(){
    let createScope = function(pScope){
        let scope = {};
        scope._pScope = pScope
        return scope;
    };

    let rootScope = createScope();
    let scopes = {};
    Object.defineProperty(scopes,"rootScope",{
        configurable: false,
        // writable: true, // 不能和get,set并存
        enumerable: true,
        // value: {}, // 不能和get,set并存
        get: function(){
            // console.log("get:");
            return this._rootScope;
        },
        set:function(v){
            console.log("set:");
            this._rootScope = v;
        }
    });
    scopes.a = "a";
    scopes.rootScope = rootScope;
    scopes.rootScope.a = "a";


    let controllers = {};
    controllers["hello-licontroller"] = function(scope){
        console.log("hello-licontroller");
        scope.name = "lilei";
    };
    controllers["hello2-licontroller"] = function(scope){
        console.log("hello2-licontroller");
        scope.name = "lilei2";
    };

    let refreshAll = function(){
        scopes.rootScope.scopes.forEach(function(s){
            let liBindEles = s.ele.querySelectorAll("[li-bind]");
            liBindEles.forEach(function(ele){
                let bindKey =  ele.attributes["li-bind"].value;
                ele.innerHTML = s.scope[bindKey];
            });
            let liModelEles = s.ele.querySelectorAll("[li-model]");
            liModelEles.forEach(function(ele){
                let modelKey =  ele.attributes["li-model"].value;
                ele.value = s.scope[modelKey];
            });
        });
    };


    scopes.rootScope.scopes = [];
    document.querySelectorAll("[li-controller]").forEach(function(liControllerEle){
        let s = {
            ele:liControllerEle,
            scope:createScope()
        };
        scopes.rootScope.scopes.push(s);
        let liModelEles = liControllerEle.querySelectorAll("[li-model]");
        liModelEles.forEach(function(ele){
            let modelName = ele.attributes["li-model"].value;
            ele.addEventListener("input",function(){
                s.scope[modelName] = this.value;
                refreshAll();
            });
        });
    });
    scopes.rootScope.scopes.forEach(function(s){
        let controllerName = s.ele.attributes["li-controller"].value;
        controllers[controllerName](s.scope);
    });
    refreshAll();

})();

