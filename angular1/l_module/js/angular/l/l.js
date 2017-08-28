if (!window.angular) {
    console.warn("需要先引入angular");
} else {
    (function (angular) {
        var lModule = angular.module('lModule', []);
        lModule.directive('rangeInput', [function () {
            return {
                restrict: 'A',
                replace: true,
                template:
                `<div class="range-box">
                    <div class="range-bg">
                        <div class="range-bgcolor"></div>
                    </div>
                    <div class="range-bt"></div>
                </div>`,
                scope: {
                    ngModel: '=ngModel',
                    min: '@min',
                    max: '@max',
                    fixed: '@fixed'
                },
                link: function (s, element, attrs) {
                    var $e = $(element);

                    var $box = $e;
                    var $bg = $e.find('.range-bg');
                    var $bgcolor = $e.find('.range-bgcolor');
                    var $btn = $e.find('.range-bt');

                    var statu = false;
                    var ox = 0;
                    var lx = 0;
                    var left = $bgcolor.width();
                    var bgleft = 0;
                    $btn.mousedown(function (e) {
                        lx = $btn.offset().left;
                        ox = e.pageX - left;
                        statu = true;
                    });

                    $(document).mouseup(function () {
                        statu = false;
                    });
                    $box.mousemove(function (e) {
                        if (statu) {
                            left = e.pageX - ox;
                            if (left < 0) {
                                left = 0;
                            }
                            if (left > $e.width()) {
                                left = $e.width();
                            }
                            $btn.css('left', left);
                            $bgcolor.width(left);
                            s.setModel();
                        }
                    });
                    $bg.click(function (e) {
                        if (!statu) {
                            bgleft = $bg.offset().left;
                            left = e.pageX - bgleft;
                            if (left < 0) {
                                left = 0;
                            }
                            if (left > $e.width()) {
                                left = $e.width();
                            }
                            $btn.css('left', left);
                            $bgcolor.stop().animate({ width: left }, 200);
                            s.setModel();
                        }
                    });
                    s.setModel = function () {
                        s.ngModel = parseFloat(parseFloat(s.min) + (left / $e.width()) * (parseFloat(s.max) - parseFloat(s.min))).toFixed(s.fixed);
                        s.$apply();
                    };
                    s.setLeft = function () {
                        var _left = ($e.width() / (parseFloat(s.max) - parseFloat(s.min))) * (s.ngModel - parseFloat(s.min));
                        $btn.css('left', _left);
                        $bgcolor.stop().animate({ width: _left }, 0);
                        setTimeout(function () {
                            left = $bgcolor.width();
                        }, 1);
                    };
                    s.setLeft();
                }
            };
        }]);

        //angularjs的组件，类似指令。指令能完成它的所有功能
        lModule.component('heroDetail', {
            template: `<h1>HeroName: {{$ctrl.hero.name}}</h1>`,
            controller: function($scope){
                console.log($scope);
            },
            bindings: {
                hero: '='
            }
        });
    })(angular);
}
