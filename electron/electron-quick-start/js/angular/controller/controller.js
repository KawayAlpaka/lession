if (angular && angular.module) {
    var mExtend = function (obj1, obj2) {
        for (key in obj2) {
            if (typeof obj2[key] == "function") {
            } else {
                obj1[key] = obj2[key];
            }
        }
    };
    var toLowerKey = function (obj) {
        for (key in obj) {
            obj[key.toLowerCase()] = obj[key];
        }
    };

    var setSelectOption = function (options, p, targetObj, AttrName) {
        targetObj[AttrName] = _.find(options, function (type) {
            return p == type.DictItemID || p == type;
        });
    };

    window.app = angular.module('myApp', []);
    app.run(['$rootScope', function ($rootScope,) {
        $rootScope.log = function (a) {
            console.log(a);
        };
        $rootScope.setValue = function (obj, value) {
            obj.value = value;
        };
    }]); 


    app.controller("index", ["$scope", "$scope", function (s, $scope) {
        console.log("index");
        s.name = "L";
    }]);
    app.controller("modal", ["$scope", "$scope", function (s, $scope) {
        console.log("modal");
        s.name = "L";
    }]);

    
}