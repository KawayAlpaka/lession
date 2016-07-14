define(['app','common'], function(myApp,common){
    myApp.controller('m1_project_controller', ['$scope', function (s) {
        console.log("m1_project_controller");
    }]);
    myApp.controller('m1_project_edit_controller', ['$scope', function (s) {
        console.log("m1_project_edit_controller");
        console.log(s.$state.params.id);
        var projectId = s.$state.params.id;
        s.api.project.get(projectId)
            .success(function (data) {
                console.log(data);
                s.project = data.data;
            });

        var getUsers = function (relate) {
            s.api.project.getUsers(projectId,relate)
                .success(function (data) {
                    console.log(data);
                    s[relate+"s"] = data.data;
                });
        };
        getUsers("member");
        getUsers("guest");
        
        s.memberUser = "";
        s.createUser = function (relate,user) {
            s.api.project.createUser(projectId,relate,{user:user})
                .success(function (data) {
                    var fUpRelate = common.strHelp.firstUpper(relate);
                    // s.createMemberMsg = data.msg;
                    s["create"+fUpRelate+"Msg"] = data.msg;
                    getUsers(relate);
                });
        };
        
        s.save = function (project) {
            s.api.project.update(project)
                .success(function (data) {
                    console.log(data);
                    s.mHelp.go("#/m1/manage");
                });
        };
        s.back = function () {
            s.mHelp.go("#/m1/manage");
        };
        
    }]);
});