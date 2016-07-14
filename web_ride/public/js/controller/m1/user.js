define(['app','common','jquery'], function(myApp){
    myApp.controller('m1_user_controller', ['$scope', function (s) {
        console.log('m1_user_controller');
    }]);

    myApp.controller('m1_user_login_controller', ['$scope','$cookies','mHelp', function (s,$cookies,mHelp) {
        console.log('m1_user_login_controller');

        if(s.mHelp.isLogin()){
            s.mHelp.go("#/m1/manage");
        }

        s.user = {};
        s.login = function () {
            s.api.user.login(s.user)
                .success(function (data) {
                    console.log(data);
                    if(data.logicState == 0){
                        s.mHelp.setLoginData(data.data.session._id,data.data.user);
                        s.mHelp.go("#/m1/manage");
                    }
                })
        };
    }]);
});