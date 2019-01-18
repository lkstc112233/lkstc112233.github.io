define(["require", "exports", "./DrawingHelper", "./xyTuple"], function (require, exports, DrawingHelper_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller = /** @class */ (function () {
        function Controller() {
            this.touchStart = new xyTuple_1.Point();
            this.touching = new xyTuple_1.Point();
            this.isTouching = false;
            this.radiusLarge = 70;
        }
        Controller.prototype.touchBegin = function (pnt) {
            this.touchStart = pnt.clone();
            this.touching = this.touchStart;
            this.isTouching = true;
        };
        Controller.prototype.touchUpdate = function (pnt) {
            this.touching = pnt.clone();
            var calc = this.touching.clone();
            calc.minus(this.touchStart);
            var ratio = calc.length;
            if (calc.length > this.radiusLarge) {
                this.touching = this.touchStart.clone();
                calc.length = this.radiusLarge;
                this.touching.plus(calc);
            }
        };
        Controller.prototype.touchEnd = function () {
            this.isTouching = false;
        };
        Controller.prototype.getControllerValue = function () {
            if (!this.isTouching) {
                return new xyTuple_1.Point();
            }
            var result = this.touching.clone();
            result.minus(this.touchStart);
            result.mul(1 / 70);
            return result;
        };
        Controller.prototype.draw = function (context) {
            if (!this.isTouching) {
                return;
            }
            var radiusSmall = 25;
            DrawingHelper_1.circle(context, this.touchStart.x, this.touchStart.y, this.radiusLarge, '#0004');
            DrawingHelper_1.circle(context, this.touching.x, this.touching.y, radiusSmall, '#0004');
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
