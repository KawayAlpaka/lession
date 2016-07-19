define(['app'], function(myApp){
    myApp.controller('m1_userCenter_controller', ['$scope', function (s) {
        console.log("m1_userCenter_controller");
    }]);
    myApp.controller('m1_userCenter_profile_controller', ['$scope', function (s) {
        console.log("m1_userCenter_profile_controller");

        s.mHelp.pullCurrentUser(function () {
            s.currentUser = s.mHelp.getCurrentUser();
        });
        s.updateCurrentUser = function () {
            s.api.user.updateCurrentUser(s.currentUser)
                .success(function (data) {
                    s.mHelp.go('#/m1/user_center');
                });
        };
    }]);
    myApp.controller('m1_userCenter_debug_controller', ['$scope', function (s) {
        console.log("m1_userCenter_debug_controller");
    }]);
    myApp.controller('m1_userCenter_debug_index_controller', ['$scope', function (s) {
        console.log("m1_userCenter_debug_index_controller");
    }]);
    myApp.controller('m1_userCenter_debug_edit_controller', ['$scope', function (s) {
        console.log("m1_userCenter_debug_edit_controller");
    }]);
});