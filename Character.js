define(["require", "exports", "./xyTuple", "./DrawingHelper"], function (require, exports, xyTuple_1, DrawingHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = /** @class */ (function () {
        function Character() {
            this.frame = 0;
            this.position = new xyTuple_1.Point();
        }
        Character.prototype.draw = function (context) {
            var radius = 25;
            this.frame += Math.PI / 60;
            DrawingHelper_1.circle(context, this.position.x, this.position.y, radius, 'black');
        };
        return Character;
    }());
    exports.Character = Character;
});
