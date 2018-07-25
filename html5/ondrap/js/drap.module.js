(function(angular){
  var myDrap = angular.module("myDrap",[],function(){
    console.log("myDrap");
  });
  myDrap.directive('ngDrap', [function () {
    return {
        restrict: 'A',
        scope: {
          ngDrap:'&',
        },
        link: function (s, element, attrs) {
          element[0].addEventListener("dragstart",function(event){
  
            s.ngDrap();
          });
        }
    };
  }]);
  // ng已经自带ngDragend指令
  // maApp.directive('ngDragend', [function () {
  //     return {
  //         restrict: 'A',
  //         scope: {
  //           ngDrop:'&'
  //         },
  //         link: function (s, element, attrs) {
  //           element[0].addEventListener("dragend", function(event) {
  //             s.ngDragend();
  //           });
  //         }
  //     };
  // }]);
  myDrap.directive('ngDrop', [function () {
    return {
        restrict: 'A',
        scope: {
          ngDrop:'&'
        },
        link: function (s, element, attrs) {
          element[0].addEventListener("drop", function(event) {
            s.ngDrop();
            event.preventDefault();
            s.$apply();
          });
          element[0].addEventListener("dragover", function(event) {
            event.preventDefault();
          });
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

