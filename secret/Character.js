define(["require", "exports", "./xyTuple", "./DrawingHelper"], function (require, exports, xyTuple_1, DrawingHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CharacterAfterImage = /** @class */ (function () {
        function CharacterAfterImage(position, frame, headOffset, direction) {
            this.position = position;
            this.frame = frame;
            this.headOffset = headOffset;
            this.direction = direction;
            this.lifeCountdown = 20;
        }
        Object.defineProperty(CharacterAfterImage.prototype, "z", {
            get: function () {
                return this.position.y - 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CharacterAfterImage.prototype, "decay", {
            get: function () {
                return this.lifeCountdown <= 0;
            },
            enumerable: true,
            configurable: true
        });
        CharacterAfterImage.prototype.draw = function (context) {
            // Draw spirit
            var size = 40 + 20 - this.lifeCountdown;
            var WALKING_CONSTANT = 30;
            var WALKING_STEPS = [0, 1, 0, 2];
            context.save();
            context.globalAlpha = this.lifeCountdown / 40;
            DrawingHelper_1.drawCharacterImage(context, 'BODY', WALKING_STEPS[Math.floor(this.frame / WALKING_CONSTANT)], this.direction, this.position.x, this.position.y, size);
            DrawingHelper_1.drawCharacterImage(context, 'HEAD', 0, this.direction, this.position.x, this.position.y + this.headOffset, size);
            context.restore();
            // Count down
            this.lifeCountdown -= 1;
        };
        return CharacterAfterImage;
    }());
    var Character = /** @class */ (function () {
        function Character() {
            this.frame = 0;
            this.headSpin = 0;
            this.headOffset = 0;
            this.afterImageCooldown = 0;
            this.m_taken = false;
            this.position = new xyTuple_1.Point();
            this.velocity = new xyTuple_1.Point();
        }
        Object.defineProperty(Character.prototype, "z", {
            get: function () {
                return this.position.y + 40;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Character.prototype, "decay", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Character.prototype.generate = function () {
            if (this.velocity.length > 4) {
                if (this.afterImageCooldown <= 0) {
                    this.afterImageCooldown = 5;
                    return [new CharacterAfterImage(this.position.clone(), this.frame, this.headOffset, this.velocity.direction)];
                }
            }
            this.afterImageCooldown -= 1;
            return [];
        };
        Character.prototype.taken = function () {
            this.m_taken = true;
        };
        Character.prototype.update = function () {
            // Update status
            this.velocity.mul(0.97);
            this.position.plus(this.velocity);
        };
        Character.prototype.draw = function (context) {
            // Draw spirit
            var size = 40;
            this.frame += this.velocity.length;
            var WALKING_CONSTANT = 30;
            var WALKING_STEPS = [0, 1, 0, 2];
            while (this.frame > WALKING_CONSTANT * 4) {
                this.frame -= WALKING_CONSTANT * 4;
            }
            // Update headOffset
            this.headOffset = (this.velocity.length * 0.2 + 1) * (Math.sin(this.headSpin += Math.PI / 60) + 1);
            var bodyType = this.m_taken ? 'BODY_HOLDING' : 'BODY';
            DrawingHelper_1.drawCharacterImage(context, bodyType, WALKING_STEPS[Math.floor(this.frame / WALKING_CONSTANT)], this.velocity.direction, this.position.x, this.position.y, size);
            DrawingHelper_1.drawCharacterImage(context, 'HEAD', 0, this.velocity.direction, this.position.x, this.position.y + this.headOffset, size);
        };
        return Character;
    }());
    exports.Character = Character;
});
