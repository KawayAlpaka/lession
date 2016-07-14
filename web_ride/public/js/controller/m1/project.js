define(['app'], function(myApp){
    myApp.controller('m1_project_controller', ['$scope', function (s) {
        console.log("m1_project_controller");
    }]);
    myApp.controller('m1_project_edit_controller', ['$scope', function (s) {
        console.log("m1_project_edit_controller");
        console.log(s.$state.params.id);
    }]);
});