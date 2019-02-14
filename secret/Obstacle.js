define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Obstacle = /** @class */ (function () {
        function Obstacle(radius, position) {
            this.radius = radius;
            this.position = position;
            this.width = 0;
            this.height = 0;
            this.decay = false;
        }
        Object.defineProperty(Obstacle.prototype, "z", {
            get: function () {
                return this.position.y;
            },
            enumerable: true,
            configurable: true
        });
        Obstacle.prototype.generate = function () {
            return [];
        };
        Obstacle.prototype.draw = function (context) {
            context.save();
            context.beginPath();
            context.rect(0, 0, this.width, this.height);
            context.clip();
            context.fillStyle = 'black';
            context.beginPath();
            context.ellipse(this.position.x, this.position.y, this.radius, this.radius, 0, 0, 360);
            context.fill();
            context.restore();
        };
        return Obstacle;
    }());
    exports.Obstacle = Obstacle;
});
