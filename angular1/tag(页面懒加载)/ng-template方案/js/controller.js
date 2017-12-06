if (angular && angular.module) {
    window.app = angular.module('myApp', []);
    app.run(['$rootScope', function ($rootScope) {
        console.log("run");
    }]); 
    app.controller("home", ["$scope", function (s) {
        console.log("home");
        s.tags = [
            {title:"1",src:'views/tag_1.html',active:true},
            {title:"2",src:'views/tag_1.html',active:false}
        ];
        s.add = function(){
            s.tags.push({title:"tag_2",src:'views/tag_2.html'});
        };
        s.clickTag = function(tag){
            s.tags.forEach(function(tag) {
                tag.active = false;
            });
            tag.active = true;
        };
    }]);
    app.controller("tag1", ["$scope", function (s) {
        console.log("tag1");
    }]);
    app.controller("tag2", ["$scope", function (s) {
        console.log("tag2");
    }]);
}