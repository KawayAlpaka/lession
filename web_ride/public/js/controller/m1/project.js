define(['app'], function(myApp){
    myApp.controller('m1_project_controller', ['$scope', function (s) {
        console.log("m1_project_controller");
    }]);
    myApp.controller('m1_project_edit_controller', ['$scope', function (s) {
        console.log("m1_project_edit_controller");
        console.log(s.$state.params.id);

        s.api.project.get(s.$state.params.id)
            .success(function (data) {
                console.log(data);
                s.project = data.data;
            });
        
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