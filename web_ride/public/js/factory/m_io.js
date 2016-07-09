define(['app','socket'], function (myApp,io) {
    myApp.factory('mIo', ['$rootScope',function ($rootScope) {
        var mIo = {};
        var socket;
        mIo.start = function () {
            //socket.io
            socket = io.connect();
            $rootScope.socket = socket;
            $rootScope.count = {};
            socket.on('workingOnProjectCount', function (data) {
                console.log(data);
                $rootScope.count.workingOnProjectCount = data.count;
                $rootScope.$apply();
            });
            socket.on('workingOnNodeCount', function (data) {
                console.log(data);
                $rootScope.count.workingOnNodeCount = data.count;
                $rootScope.$apply();
            });
        };
        mIo.leaveWorkspace = function () {
            socket.emit('leaveWorkspace', {});
        };

        return mIo;
    }]);
});