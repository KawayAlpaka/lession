define(['app'], function (myApp) {

    myApp.directive('btFormGroup2', [function() {
        return {
            restrict: 'E',
            templateUrl: 'view/directive/bt_form_group_2.html',
            scope: false,
            replace:true,
            transclude:true,
            link:function (s,element,attrs) {
                var labelOptions,inputOptions,selectOptions;
                if(attrs.labelOptions){
                    labelOptions = JSON.parse(attrs.labelOptions);
                    element.find("label").html(labelOptions.text);
                }
            }
        };
    }]);


    myApp.directive('btFormGroup', [function() {
        return {
            restrict: 'E',
            templateUrl: 'view/directive/bt_form_group.html',
            scope: {
                ngModel : "=dNgModel",
                ngOptions : "=dSelectNgOptions"
            },
            replace:true,
            // compile:function compile(tElement,tAttrs,transclude){
            //     //compile和link混用要注意,或者不能混用?
            //     return{
            //         pre:function preLink(scope,iElement,iAttrs,controller){},
            //         post:function postLink(scope,iElement,iAttrs,controller){}
            //     }
            // },
            link:function (s,element,attrs) {
                var labelOptions,inputOptions,selectOptions;
                if(attrs.labelOptions){
                    labelOptions = JSON.parse(attrs.labelOptions);
                    element.find("label").html(labelOptions.text);
                }
                if(attrs.inputOptions){
                    inputOptions = JSON.parse(attrs.inputOptions);
                    var input = element.find("input");
                    input.show();
                    if(inputOptions.type){
                        input.attr("type",inputOptions.type);
                    }
                    if(inputOptions.required && inputOptions.required == true){
                        input.attr("required","required");
                    }
                    if(inputOptions.placeholder ){
                        input.attr("placeholder",inputOptions.placeholder);
                    }
                }else{
                    var input = element.find("input");
                    input.remove();
                }
                if(attrs.selectOptions){
                    selectOptions = JSON.parse(attrs.selectOptions);
                    var select = element.find("select");
                }else{
                    var select = element.find("select");
                    select.remove();
                }
            }
        };
    }]);




    myApp.directive('mContextMenu', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'view/directive/m_context_menu.html',
            scope: {
                mNode:'=',
                contextMenuFunctions:'=',
                mNodeType:"="
            },
            controller:['$scope','component', function($scope,component){
                $scope.modalAction = component.inputModal.option.action;
                $scope.clickItem = function (str) {
                    $scope.contextMenuFunctions.click(str);
                }
            }]
        };
    });

    myApp.directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    });

    myApp.directive('treeView',[function(){

        return {
            restrict: 'E',
            templateUrl: 'view/directive/tree_view.html',
            scope: {
                // treeData: '=',
                // canChecked: '=',
                // textField: '@',
                // itemClicked: '&',
                // itemCheckedChanged: '&',
                // itemTemplateUrl: '@',

                treeFunctions:"=",
                mTreeData:'='
            },
            controller:['$scope', function($scope){
                $scope.showMTreeData = function () {
                    console.log($scope);
                };

                $scope.alert = function (obj) {
                    alert(obj);
                };


                // $scope.itemExpended = function(item, $event){
                //     item.$$isExpend = ! item.$$isExpend;
                //     $event.stopPropagation();
                // };
                //
                // $scope.getItemIcon = function(item){
                //     var isLeaf = $scope.isLeaf(item);
                //
                //     if(isLeaf){
                //         return 'fa fa-leaf';
                //     }
                //
                //     return item.$$isExpend ? 'fa fa-minus': 'fa fa-plus';
                // };
                //
                // $scope.isLeaf = function(item){
                //     return !item.children || !item.children.length;
                // };
                //
                // $scope.warpCallback = function(callback, item, $event){
                //     ($scope[callback] || angular.noop)({
                //         $item:item,
                //         $event:$event
                //     });
                // };
            }]
        };
    }]);

});