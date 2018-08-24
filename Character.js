define(["require", "exports", "./xyTuple", "./DrawingHelper"], function (require, exports, xyTuple_1, DrawingHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = /** @class */ (function () {
        function Character() {
            this.frame = 0;
            this.position = new xyTuple_1.Point();
            this.velocity = new xyTuple_1.Point();
        }
        Character.prototype.draw = function (context) {
            // Update status
            this.velocity.mul(0.97);
            this.position.plus(this.velocity);
            // Boundry check
            if (this.position.x < 0) {
                this.velocity.x = 0;
                this.position.x = 0;
            }
            if (this.position.y < 0) {
                this.velocity.y = 0;
                this.position.y = 0;
            }
            // Draw spirit
            var size = 40;
            this.frame += this.velocity.length;
            var WALKING_CONSTANT = 30;
            var WALKING_STEPS = [0, 1, 0, 2];
            while (this.frame > WALKING_CONSTANT * 4) {
                this.frame -= WALKING_CONSTANT * 4;
            }
            DrawingHelper_1.drawImage(context, 'BODY', WALKING_STEPS[Math.floor(this.frame / WALKING_CONSTANT)], this.velocity.direction, this.position.x, this.position.y, size);
            DrawingHelper_1.drawImage(context, 'HEAD', 0, this.velocity.direction, this.position.x, this.position.y, size);
        };
        return Character;
    }());
    exports.Character = Character;
});
