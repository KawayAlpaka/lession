define(['app'], function(myApp){
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
        
        var getMembers = function () {
            s.api.project.getMembers(projectId)
                .success(function (data) {
                    console.log(data);
                    s.members = data.data;
                });
        };
        getMembers();

        s.memberUser = "";
        s.createMember = function () {
            s.api.project.createMember(projectId,{user:s.memberUser})
                .success(function (data) {
                    console.log(data);
                    if(data.logicState != 0){
                        s.createMemberMsg = data.msg;
                    }else{
                        s.createMemberMsg = data.msg;
                        getMembers();
                    }
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