define(['app'], function(myApp){
    myApp.controller('m1_workspace_controller', ['$scope', function (s) {
        console.log("m1_workspace_controller");
        console.log(s.$state.params.projectId);
    }]);
    myApp.controller('m1_workspace_edit_controller', ['$scope', function (s) {
        console.log("m1_workspace_edit_controller");
        console.log(s.$state.params.robotNodeId);
    }]);
});