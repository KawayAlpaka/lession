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
                    s.mHelp.pullCurrentUser(function () {
                        s.mHelp.go('#/m1/user_center');
                    });
                });
        };
    }]);
    myApp.controller('m1_userCenter_debug_controller', ['$scope', function (s) {
        console.log("m1_userCenter_debug_controller");
    }]);
    myApp.controller('m1_userCenter_debug_index_controller', ['$scope', function (s) {
        console.log("m1_userCenter_debug_index_controller");

        s.refreshOptions = function () {
            s.api.debugOption.list()
                .success(function (data) {
                    console.log(data);
                    s.options = data.data
                });
        };

        s.refreshOptions();

        s.createOption = function () {
            s.api.debugOption.new()
                .success(function (data) {
                    s.api.debugOption.create(data.data)
                        .success(function (data) {
                            s.refreshOptions();
                        });
                });
        };
        s.editOption = function (option) {
            s.mHelp.go("#/m1/user_center/debug/edit/" + option._id);
        };
        s.delOption = function (option) {
            s.api.debugOption.del(option._id)
                .success(function (data) {
                    s.refreshOptions();
                });
        };

        s.stringify  =function (json) {
            return JSON.stringify(json);
        }

    }]);
    myApp.controller('m1_userCenter_debug_edit_controller', ['$scope', function (s) {
        console.log("m1_userCenter_debug_edit_controller");
        var optionId = s.$state.params.id;

        s.ways = ['add param after keyword'];

        s.api.debugOption.get(optionId)
            .success(function (data) {
                s.option = data.data;
            });

        s.save = function (option) {
            s.api.debugOption.update(option)
                .success(function (data) {
                    s.mHelp.go("#/m1/user_center/debug/index");
                });
        };


    }]);
});