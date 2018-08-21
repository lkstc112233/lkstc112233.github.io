define(["require", "exports", "./xyTuple"], function (require, exports, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = /** @class */ (function () {
        function Character() {
            this.frame = 0;
            this.position = new xyTuple_1.Point();
        }
        Character.prototype.draw = function (context) {
            // const radius = Math.sin(this.frame) * 20 + 50;
            var radius = 50;
            this.frame += Math.PI / 60;
            // context.ellipse(this.x, this.y, radius, radius, 0, 0, Math.PI);
            context.fillRect(this.position.x - radius / 2, this.position.y - radius / 2, radius, radius);
        };
        return Character;
    }());
    exports.Character = Character;
});
