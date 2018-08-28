define(["require", "exports", "./xyTuple", "./DrawingHelper"], function (require, exports, xyTuple_1, DrawingHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Key = /** @class */ (function () {
        function Key() {
            this.floatingFrame = 0;
            this.keyTaken = false;
            this.position = new xyTuple_1.Point();
        }
        Object.defineProperty(Key.prototype, "z", {
            get: function () {
                return this.position.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "decay", {
            get: function () {
                return this.keyTaken;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Key.prototype, "gone", {
            get: function () {
                return this.keyTaken;
            },
            enumerable: true,
            configurable: true
        });
        Key.prototype.taken = function () {
            this.keyTaken = true;
        };
        Key.prototype.draw = function (context) {
            // Draw spirit
            var size = 40;
            this.floatingFrame += Math.PI / 40;
            var yOffset = Math.sin(this.floatingFrame) * 10 - 30;
            var radiusRate = 15 - Math.sin(this.floatingFrame) * 5;
            // Paint
            context.save();
            context.globalAlpha = Math.sin(this.floatingFrame) * 0.3 + 0.4;
            context.beginPath();
            context.fillStyle = '#000';
            context.ellipse(this.position.x, this.position.y, radiusRate, radiusRate / 2, 0, 0, Math.PI * 2);
            context.fill();
            context.restore();
            DrawingHelper_1.drawKeyImage(context, this.position.x, this.position.y + yOffset, size);
        };
        return Key;
    }());
    exports.Key = Key;
});
