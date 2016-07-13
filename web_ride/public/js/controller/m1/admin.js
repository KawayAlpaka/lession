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
});