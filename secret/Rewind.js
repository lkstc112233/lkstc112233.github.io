define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PATH_WIDTH = 5;
    var Dotter = /** @class */ (function () {
        function Dotter(position) {
            this.position = position;
            this.decay = false;
        }
        Object.defineProperty(Dotter.prototype, "z", {
            get: function () {
                return this.position.y;
            },
            enumerable: true,
            configurable: true
        });
        Dotter.prototype.draw = function (context) {
            context.save();
            context.beginPath();
            context.fillStyle = 'red';
            context.ellipse(this.position.x, this.position.y, PATH_WIDTH, PATH_WIDTH, 0, 0, 360);
            context.fill();
            context.restore();
        };
        return Dotter;
    }());
    var Rewinder = /** @class */ (function () {
        function Rewinder(positions, delay) {
            if (delay === void 0) { delay = 50; }
            this.positions = positions;
            this.delay = delay;
            this.delayCount = 0;
            this.playbackCount = 0;
            this.z = 0;
        }
        Object.defineProperty(Rewinder.prototype, "decay", {
            get: function () {
                return this.completed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rewinder.prototype, "completed", {
            get: function () {
                return this.playbackCount >= this.positions.length;
            },
            enumerable: true,
            configurable: true
        });
        Rewinder.prototype.generate = function () {
            if (this.delayCount++ > this.delay) {
                if (this.playbackCount < this.positions.length) {
                    return [new Dotter(this.positions[this.playbackCount++])];
                }
            }
            return [];
        };
        Rewinder.prototype.draw = function (context) { };
        return Rewinder;
    }());
    exports.Rewinder = Rewinder;
});
