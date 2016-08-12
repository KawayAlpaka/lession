define(['app','socket','env'], function (myApp,io,env) {
    myApp.factory('mIo', ['$rootScope',function ($rootScope) {
        var mIo = {};
        var socket;
        mIo.start = function () {
            //socket.io
            var server = "";
            if(env.server){
                server = env.server;
            }
            socket = io.connect(server);
            $rootScope.socket = socket;
            $rootScope.count = {};

            socket.on('reconnect', function() {
                console.log("重新连接到服务器");
            });
            socket.on('disconnect', function() {
                console.log("disconnect");
            });

            socket.on('currentProjectCount', function (data) {
                console.log(data);
                $rootScope.count.currentProjectCount = data.count;
                $rootScope.$apply();
            });
            socket.on('currentNodeCount', function (data) {
                console.log(data);
                $rootScope.count.currentNodeCount = data.count;
                $rootScope.$apply();
            });

            socket.on('nodeUpdate', function (data) {
                console.log('nodeUpdate');
                console.log(data);
                $rootScope.$broadcast("nodeUpdate", data);
            });
            socket.on('debugResult', function (data) {
                console.log('debugResult');
                console.log(data);
                $rootScope.$broadcast("debugResult", data);
            });
            socket.on('debugProcess', function (data) {
                console.log('debugProcess');
                console.log(data);
                $rootScope.$broadcast("debugProcess", data);
            });
        };
        mIo.leaveWorkspace = function () {
            socket.emit('leaveWorkspace', {});
        };
        mIo.currentProject = function (ProjectId) {
            socket.emit('currentProject', { node: ProjectId });
        };
        mIo.currentNode = function (nodeId) {
            socket.emit('currentNode', { node: nodeId });
        };
        mIo.debug = function (nodeId,options) {
            socket.emit('debug', { node: nodeId ,options:options });
        };

        return mIo;
    }]);
});