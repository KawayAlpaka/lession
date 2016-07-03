define(['app'], function (myApp) {

    myApp.directive('mContextMenu', function($parse) {
        return {
            restrict: 'E',
            templateUrl: '/view/directive/m_context_menu.html',
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
            templateUrl: '/view/directive/tree_view.html',
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