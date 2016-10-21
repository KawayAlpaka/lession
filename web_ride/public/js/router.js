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
                                name: 'manage',
                                url: '/manage',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/manage.html',
                                        controller: 'm1_manage_controller'
                                    }
                                }
                            },
                            {
                                name: 'user',
                                url: '/user',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/user.html',
                                        controller: 'm1_user_controller'
                                    }
                                },
                                children: [
                                    {
                                        name: 'login',
                                        url: '/login',
                                        views: {
                                            'user': {
                                                templateUrl: 'view/m1/user/login.html',
                                                controller: 'm1_user_login_controller'
                                            }
                                        }
                                    }
                                ]
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
                            },
                            {
                                name: 'project',
                                url: '/project',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/project.html',
                                        controller: 'm1_project_controller'
                                    }
                                },
                                children: [
                                    {
                                        name: 'edit',
                                        url: '/edit/:id',
                                        views: {
                                            'project': {
                                                templateUrl: 'view/m1/project/edit.html',
                                                controller: 'm1_project_edit_controller'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                name: 'user_center',
                                url: '/user_center',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/user_center.html',
                                        controller: 'm1_userCenter_controller'
                                    }
                                },
                                children: [
                                    {
                                        name: 'profile',
                                        url: '/profile',
                                        views: {
                                            'user_center': {
                                                templateUrl: 'view/m1/user_center/profile.html',
                                                controller: 'm1_userCenter_profile_controller'
                                            }
                                        }
                                    },
                                    {
                                        name: 'debug',
                                        url: '/debug',
                                        views: {
                                            'user_center': {
                                                templateUrl: 'view/m1/user_center/debug.html',
                                                controller: 'm1_userCenter_debug_controller'
                                            }
                                        },
                                        children:[
                                            {
                                                name: 'index',
                                                url: '/index',
                                                views: {
                                                    'debug': {
                                                        templateUrl: 'view/m1/user_center/debug/index.html',
                                                        controller: 'm1_userCenter_debug_index_controller'
                                                    }
                                                }
                                            },
                                            {
                                                name: 'edit',
                                                url: '/edit/:id',
                                                views: {
                                                    'debug': {
                                                        templateUrl: 'view/m1/user_center/debug/edit.html',
                                                        controller: 'm1_userCenter_debug_edit_controller'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'admin',
                                url: '/admin',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/admin.html',
                                        controller: 'm1_admin_controller'
                                    }
                                },
                                children: [
                                    {
                                        name: 'users',
                                        url: '/users',
                                        views: {
                                            'admin': {
                                                templateUrl: 'view/m1/admin/users.html',
                                                controller: 'm1_admin_users_controller'
                                            }
                                        },
                                        children:[
                                            {
                                                name: 'index',
                                                url: '/index',
                                                views: {
                                                    'users': {
                                                        templateUrl: 'view/m1/admin/users/index.html',
                                                        controller: 'm1_admin_users_index_controller'
                                                    }
                                                }
                                            },
                                            {
                                                name: 'edit',
                                                url: '/edit/:id',
                                                views: {
                                                    'users': {
                                                        templateUrl: 'view/m1/admin/users/edit.html',
                                                        controller: 'm1_admin_users_edit_controller'
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        name: 'system_settings',
                                        url: '/system_settings',
                                        views: {
                                            'admin': {
                                                templateUrl: 'view/m1/admin/system_settings.html',
                                                controller: 'm1_admin_system_settings_controller'
                                            }
                                        },
                                        children:[
                                            {
                                                name: 'index',
                                                url: '/index',
                                                views: {
                                                    'system_settings': {
                                                        templateUrl: 'view/m1/admin/system_settings/index.html',
                                                        controller: 'm1_admin_system_settings_index_controller'
                                                    }
                                                }
                                            },
                                            {
                                                name: 'edit',
                                                url: '/edit/:id',
                                                views: {
                                                    'system_settings': {
                                                        templateUrl: 'view/m1/admin/system_settings/edit.html',
                                                        controller: 'm1_admin_system_settings_edit_controller'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'test',
                                url: '/test',
                                views: {
                                    'm1': {
                                        templateUrl: 'view/m1/test.html',
                                        controller: 'm1_test_controller'
                                    }
                                }
                            }
                        ]
                    });
            }]);
});
