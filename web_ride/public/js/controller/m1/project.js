define(['app','common','WebUploader'], function(myApp,common,WebUploader){
    myApp.controller('m1_project_controller', ['$scope', function (s) {
        console.log("m1_project_controller");
    }]);
    myApp.controller('m1_project_edit_controller', ['$scope', function (s) {
        console.log("m1_project_edit_controller");
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

        s.enterProject = function (project) {
            s.mHelp.go("#/m1/workspace/" + project.robotNode);
        };

        // 上传项目文件
        var uploader = WebUploader.create({
            formData: {
                pid: 123
            },
            server: '/api/actions/importProject/'+projectId,
            pick: '#picker',
            resize: false
        });

        uploader.on( 'uploadSuccess', function( file,response  ) {
            console.log(response);
            s.project = response.data;
            s.$apply();
        });

        uploader.on( 'fileQueued', function( file ) {
            console.log('fileQueued');
            s.fileName = file.name;
            s.$apply();
        });

        $("#ctlBtn").on("click",function () {
            uploader.upload();
        });

    }]);
});