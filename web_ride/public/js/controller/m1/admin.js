define(['app'], function(myApp){
    myApp.controller('m1_admin_controller', ['$scope', function (s) {
        console.log("m1_admin_controller");
    }]);
    myApp.controller('m1_admin_users_controller', ['$scope', function (s) {
        console.log("m1_admin_users_controller");
    }]);
    myApp.controller('m1_admin_users_index_controller', ['$scope', function (s) {
        console.log("m1_admin_users_index_controller");
    }]);
    myApp.controller('m1_admin_users_edit_controller', ['$scope', function (s) {
        console.log("m1_admin_users_edit_controller");
    }]);
});