define(['app','controller/m1/home','controller/m1/workspace','controller/m1/test'], function(myApp){
    myApp.controller('m1_controller', ['$scope', function (s) {
        console.log("m1_controller");

        s.setSelectedNode = function (node) {
            s.selectedNode = node;
        };

        s.setShowContextMenu = function (bool) {
            s.showContextMenu = bool;
        };
        
        
        s.showContextMenu = false;

    }]);
});