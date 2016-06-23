define(['app'], function (myApp) {
    myApp.config(['stateHelperProvider','$stateProvider', '$urlRouterProvider',
            function (stateHelperProvider,$stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/m1/home");

                stateHelperProvider
                    .state({
                        name: 'm1',
                        url: '/m1',
                        views: {
                            'index': {
                                templateUrl: 'view/m1.html',
                                controller: 'm1_controller'
                            }
                        },
                        children: [
                            {
                                name: 'home',
                                url: '/home',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/home.html',
                                        controller: 'm1_home_controller'
                                    }
                                }
                            },
                            {
                                name: 'workspace',
                                url: '/workspace/:projectId',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/workspace.html',
                                        controller: 'm1_workspace_controller'
                                    }
                                },
                                children: [
                                    {
                                        name: 'edit',
                                        url: '/edit/:robotNodeId',
                                        views: {
                                            'workspace': {
                                                templateUrl: 'view/m1/workspace/edit.html',
                                                controller: 'm1_workspace_edit_controller'
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    });
            }]);
});
