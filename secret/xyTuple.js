define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Direction;
    (function (Direction) {
        Direction[Direction["DOWN"] = 0] = "DOWN";
        Direction[Direction["UP"] = 1] = "UP";
        Direction[Direction["LEFT"] = 2] = "LEFT";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
    })(Direction = exports.Direction || (exports.Direction = {}));
    var Point = /** @class */ (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.m_x = x;
            this.m_y = y;
        }
        Point.prototype.clone = function () {
            var point = new Point();
            point.x = this.x;
            point.y = this.y;
            return point;
        };
        Object.defineProperty(Point.prototype, "x", {
            get: function () {
                return this.m_x;
            },
            set: function (val) {
                this.m_x = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "y", {
            get: function () {
                return this.m_y;
            },
            set: function (val) {
                this.m_y = val;
            },
            enumerable: true,
            configurable: true
        });
        Point.prototype.plus = function (another) {
            this.x += another.x;
            this.y += another.y;
        };
        Point.prototype.minus = function (another) {
            this.x -= another.x;
            this.y -= another.y;
        };
        Point.prototype.mul = function (ratio) {
            this.x *= ratio;
            this.y *= ratio;
        };
        Point.prototype.zero = function () {
            this.x = this.y = 0;
        };
        Object.defineProperty(Point.prototype, "length", {
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            set: function (length) {
                this.normalize();
                this.mul(length);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "direction", {
            get: function () {
                var THRESHOLD = 0.05;
                if (this.length < THRESHOLD) {
                    return Direction.DOWN;
                }
                if (this.y > Math.abs(this.x)) {
                    return Direction.DOWN;
                }
                if (this.x > Math.abs(this.y)) {
                    return Direction.RIGHT;
                }
                if (this.y < this.x) {
                    return Direction.UP;
                }
                return Direction.LEFT;
            },
            enumerable: true,
            configurable: true
        });
        Point.prototype.normalize = function () {
            var ratio = Math.sqrt(this.x * this.x + this.y * this.y);
            if (ratio == 0) {
                return;
            }
            this.x /= ratio;
            this.y /= ratio;
        };
        return Point;
    }());
    exports.Point = Point;
});
