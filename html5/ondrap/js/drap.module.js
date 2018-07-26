(function(angular){
  var myDrap = angular.module("myDrap",[],function(){
    console.log("myDrap");
  });
  myDrap.directive('ngDrap', ["$parse",function ($parse) {
    return {
        restrict: 'A',
        compile: function($element, attr) {
          var fn = $parse(attr["ngDrap"]);
          return function ngEventHandler(scope, element) {
            var ele = element[0];
            element.on('dragstart', function(event) {
              if(event.target == ele && !isParent(event.relatedTarget,ele) ){
                var callback = function() {
                  fn(scope, {
                    $event: event
                  });
                };
                scope.$apply(callback);
              }
            });
          };
        }
    };
  }]);
  // ng已经自带ngDragend指令
  myDrap.directive('ngDrop', ["$parse",function ($parse) {
    return {
        restrict: 'A',
        compile: function($element, attr) {
          var fn = $parse(attr["ngDrop"]);
          return function ngEventHandler(scope, element) {
            var ele = element[0];
            element.on('drop', function(event) {
              var callback = function() {
                fn(scope, {
                  $event: event
                });
              };
              scope.$apply(callback);
            });
            element.on('dragover', function(event) {
              event.preventDefault();
            });
          };
        }
    };
  }]);
  var isParent = function(ele1,ele2){
    if(!ele1){
      return false;
    }
    var _ele =  ele1.parentNode;
    while(true){
      if(_ele == ele2){
        return true;
      }
      if(_ele == null){
        return false;
      }
      _ele = _ele.parentNode;
    }
  };
  myDrap.directive('ngDragenter', ["$parse",function ($parse) {
    return {
        restrict: 'A',
        compile: function($element, attr) {
          var fn = $parse(attr["ngDragenter"]);
          return function ngEventHandler(scope, element) {
            var ele = element[0];
            element.on('dragenter', function(event) {
              if(event.target == ele && !isParent(event.relatedTarget,ele) ){
                var callback = function() {
                  fn(scope, {
                    $event: event
                  });
                };
                scope.$apply(callback);
              }
            });
          };
        }
    };
  }]);
  myDrap.directive('ngDragleave', ["$parse",function ($parse) {
    return {
        restrict: 'A',
        compile: function($element, attr) {
          var fn = $parse(attr["ngDragleave"]);
          return function ngEventHandler(scope, element) {
            var ele = element[0];
            element.on('dragleave', function(event) {
              if(event.target == ele && !isParent(event.relatedTarget,ele)){
                var callback = function() {
                  fn(scope, {
                    $event: event
                  });
                };
                scope.$apply(callback);
              }
            });
          };
        }
    };
  }]);
})(angular);

