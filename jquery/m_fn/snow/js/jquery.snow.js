(function ($) {
    $.fn.snow = function (options) {
        if(!options){
            options = {};
        }
        if(!options.createInterval){
            options.createInterval = 1000;
        }
        if(!options.color){
            options.color = "white";
        }
        if(!options.opacity){
            options.opacity = 0.3;
        }

        this.each(function (containerIndex,containerElement) {
            var snows = [];
            // var env = {
            //     xs:0
            // };
            var elementHeight = containerElement.offsetHeight;
            var elementWidth = containerElement.offsetWidth;
            $(containerElement).css("position","relative");
            $(containerElement).css("overflow","hidden");

            var getSnowInitXS = function () {
                return Math.random() * (elementWidth / 100) - (elementWidth / 100)/2;
            };
            var getSnowInitXA = function () {
                return Math.random() * (elementWidth / 50) - (elementWidth / 50)/2;
            };
            var getSnowInitYA = function () {
                return Math.random() * (elementHeight / 150);
            };
            var getSnowWidth = function () {
                return Math.random() * (elementHeight / 200) + 15;
            };

            var createSnow = function() {
                var snow = {};

                var snowElement = document.createElement("div");
                var left = Math.random() * elementWidth;

                snow.element = snowElement;
                snow.left = left;
                snow.top = 0;
                snow.width = 0;
                snow.opacity = 0.01;
                snow.xs = getSnowInitXS();
                snow.xa = getSnowInitXA();
                snow.ys = 10;
                snow.ya = getSnowInitYA();

                $(snowElement).css("position","absolute");
                $(snowElement).css("border-radius","50%");
                $(snowElement).css("background-color",options.color);
                $(snowElement).css("transition","all 1.5s linear");
                $(snowElement).css("width",snow.width + "px");
                $(snowElement).css("height",snow.width + "px");
                $(snowElement).css("opacity", snow.opacity);

                containerElement.appendChild(snowElement);

                return snow;
            };

            var addSnow = function () {
                snows.push(createSnow());
            };
            var removeSnow = function (index) {
                var snowElement = snows[index].element;
                $(snowElement).css("opacity", 0);
                $(snowElement).css("width", 0 + "px");
                $(snowElement).css("height", 0 + "px");
                setTimeout(function () {
                    $(snowElement).remove();
                }, 1500);
                snows.splice(index, 1);
            };

            var refreshSnow = function () {
                snows.forEach(function (snow, index) {
                    if ((snow.top + snow.width + 60) > elementHeight || (snow.left + snow.width) > elementWidth || (snow.left + snow.width) < 0) {
                        removeSnow(index);
                    } else {
                        if (Math.abs(snow.xs) > 60) {
                            snow.xa = -1 * snow.xa;
                        }

                        snow.xs += snow.xa;
                        snow.left += snow.xs;
                        snow.ys += snow.ya;
                        snow.top += snow.ys;
                        snow.width = getSnowWidth();
                        snow.height = snow.width;
                        snow.opacity = options.opacity;

                        $(snow.element).css("top", snow.top + "px");
                        $(snow.element).css("left", snow.left + "px");
                        $(snow.element).css("width", snow.width + "px");
                        $(snow.element).css("height", snow.height + "px");
                        $(snow.element).css("opacity", snow.opacity);
                    }
                });
            };
            // var refreshEnv = function () {
            //     env.xs = Math.random() * 30 - 15;
            // };
            var refreshInterval = self.setInterval(refreshSnow, 1000);
            // var envInt = self.setInterval(refreshEnv, 2000);
            var createSnowInterval = self.setInterval(addSnow, options.createInterval);
        });
    }
}($));