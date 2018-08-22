define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Point = /** @class */ (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.m_x = x;
            this.m_y = y;
        }
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
