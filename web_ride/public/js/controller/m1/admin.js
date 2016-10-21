define(['app'], function(myApp){
    myApp.controller('m1_admin_controller', ['$scope', function (s) {
        console.log("m1_admin_controller");
    }]);
    myApp.controller('m1_admin_users_controller', ['$scope', function (s) {
        console.log("m1_admin_users_controller");
    }]);
    myApp.controller('m1_admin_users_index_controller', ['$scope','mHelp', function (s,mHelp) {
        console.log("m1_admin_users_index_controller");


        var refreshList = function () {
            s.api.admin.users()
                .success(function (data) {
                    s.users = data.data;
                });
        };
        refreshList();

        s.createUser = function () {
            s.api.user.newUser()
                .success(function (data) {
                    console.log(data);
                    s.api.admin.createUser(data.data)
                        .success(function (data) {
                            console.log(data);
                            refreshList();
                        });
                });
        };
        s.editUser = function (user) {
            mHelp.go("#/m1/admin/users/edit/"+user._id);
        };
        s.delUser = function (user) {
            console.log(user);
            s.api.admin.delUser(user._id)
                .success(function (data) {
                    refreshList();
                });
        };

    }]);
    myApp.controller('m1_admin_users_edit_controller', ['$scope','mHelp', function (s,mHelp) {
        console.log("m1_admin_users_edit_controller");
        var userId = s.$state.params.id;
        
        s.roles = [
            "admin",
            "tester",
            "guest"
        ];
        
        s.api.admin.getUser(userId)
            .success(function (data) {
                console.log(data);
                s.user = data.data;
            });
        
        s.save = function () {
            s.api.admin.updateUser(s.user._id,s.user)
                .success(function (data) {
                    mHelp.go("#/m1/admin/users/index");
                });
        };
        
        s.back = function () {
            mHelp.go("#/m1/admin/users/index");
        };
        
    }]);


    myApp.controller('m1_admin_system_settings_controller', ['$scope', function (s) {
        console.log("m1_admin_system_settings_controller");
    }]);
    myApp.controller('m1_admin_system_settings_index_controller', ['$scope','mHelp', function (s,mHelp) {
        console.log("m1_admin_system_settings_index_controller");


        var refreshList = function () {
            s.api.admin.systemSetting.list()
                .success(function (data) {
                    s.systemSettings = data.data;
                });
        };
        refreshList();

        s.createSystemSetting = function () {
            s.api.admin.systemSetting.new()
                .success(function (data) {
                    s.api.admin.systemSetting.create(data.data)
                        .success(function () {
                            refreshList();
                        });
                });
        };
        s.editSystemSetting = function (systemSetting) {s
            mHelp.go("#/m1/admin/system_settings/edit/"+systemSetting._id);
        };
        s.delSystemSetting = function (systemSetting) {
            console.log(systemSetting);
            s.api.admin.systemSetting.del(systemSetting._id)
                .success(function () {
                    refreshList();
                });
        };

        s.refreshSystemSetting = function () {
            s.api.admin.systemSetting.refresh()
                .success(function (data) {
                    console.log(data);
                    s.msg = "刷新成功";
                });
        }
    }]);
    myApp.controller('m1_admin_system_settings_edit_controller', ['$scope','mHelp', function (s,mHelp) {
        console.log("m1_admin_system_settings_edit_controller");
        var systemSettingId = s.$state.params.id;



        s.api.admin.systemSetting.get(systemSettingId)
            .success(function (data) {
                s.systemSetting = data.data;
            });

        s.save = function () {
            s.api.admin.systemSetting.update(s.systemSetting)
                .success(function () {
                    mHelp.go("#/m1/admin/system_settings/index");
                });
        };

        s.back = function () {
            mHelp.go("#/m1/admin/system_settings/index");
        };

    }]);

});