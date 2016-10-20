define(['app'], function(myApp){
    myApp.controller('m1_manage_controller', ['$scope','component', function (s,component) {
        console.log("m1_manage_controller");

        s.refreshMyProject = function () {
            s.api.project.myProjects()
                .success(function (data) {
                    console.log(data);
                    s.projects = data.data;
                });
        };
        s.refreshMyRelateProjects = function (relate) {
            s.api.project.myRelateProjects(relate)
                .success(function (data) {
                    console.log(data);
                    s[relate+"Projects"] = data.data;
                });
        };

        s.newProject = function () {
            s.api.project.new()
                .success(function (data) {
                    console.log(data);
                    var project = data.data;
                    project.name = "new project";
                    s.api.project.create(project)
                        .success(function () {
                            s.refreshMyProject();
                        });
                });

            // s.modalOption = {
            //     action:"New Project",
            //     close:function (data) {
            //         console.log(data);
            //         s.api.robotNode.create(data)
            //             .success(function () {
            //                 s.refreshProject();
            //             });
            //     },
            //     dismiss:function (data) {
            //         console.log(data);
            //     }
            // };
            // component.inputModal(s.modalOption);
        };

        s.enterProject = function (project) {
            s.mHelp.go("#/m1/workspace/" + project.robotNode);
        };
        s.editProject = function (project) {
            s.mHelp.go("#/m1/project/edit/" + project._id);
        };
        s.delProject = function (project) {
            s.api.project.del(project._id)
                .success(function (data) {
                    console.log(data);
                    s.refreshMyProject();
                })
        };

        s.refreshMyProject();
        s.refreshMyRelateProjects("member");
        s.refreshMyRelateProjects("guest");
    }]);
});