define(['app'], function (myApp) {

    myApp.directive('treeView',[function(){

        return {
            restrict: 'E',
            templateUrl: '/view/directive/tree_view.html',
            scope: {
                treeData: '=',
                canChecked: '=',
                textField: '@',
                itemClicked: '&',
                itemCheckedChanged: '&',
                itemTemplateUrl: '@',
                
                mTreeData:'=',
                mTreeData:'=',
                addSuite:"="
            },
            controller:['$scope', function($scope){
                $scope.showMTreeData = function () {
                    console.log($scope);
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