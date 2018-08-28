define(["require", "exports", "./xyTuple", "./DrawingHelper"], function (require, exports, xyTuple_1, DrawingHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CHARACTER_SIZE = 40;
    var CHARACTER_WALKING_CONSTANT = 30;
    var WALKING_STEPS = [0, 1, 0, 2];
    function drawCharacter(context, x, y, headOffset, step, holdingKey, direction, size) {
        if (size === void 0) { size = CHARACTER_SIZE; }
        var drawBody = function (type) {
            DrawingHelper_1.drawCharacterImage(context, type, step, direction, x, y, size);
            DrawingHelper_1.drawCharacterImage(context, 'HEAD', 0, direction, x, y + headOffset, size);
        };
        var drawKey = function (x, y, flip) {
            DrawingHelper_1.drawKeyImage(context, x, y, size, flip);
        };
        if (holdingKey) {
            if (direction == xyTuple_1.Direction.UP) {
                drawKey(x, y - size / 2);
                drawBody('BODY_HOLDING');
            }
            else if (direction == xyTuple_1.Direction.DOWN) {
                drawBody('BODY_HOLDING');
                drawKey(x, y + size / 2);
            }
            else if (direction == xyTuple_1.Direction.LEFT) {
                drawBody('BODY_HOLDING');
                drawKey(x - size * 0.7, y, true);
            }
            else if (direction == xyTuple_1.Direction.RIGHT) {
                drawBody('BODY_HOLDING');
                drawKey(x + size * 0.7, y);
            }
        }
        else {
            drawBody('BODY');
        }
    }
    var CharacterAfterImage = /** @class */ (function () {
        function CharacterAfterImage(position, frame, headOffset, direction, holdingKey) {
            this.position = position;
            this.frame = frame;
            this.headOffset = headOffset;
            this.direction = direction;
            this.holdingKey = holdingKey;
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
            var size = CHARACTER_SIZE + 20 - this.lifeCountdown;
            context.save();
            context.globalAlpha = this.lifeCountdown / 40;
            drawCharacter(context, this.position.x, this.position.y, this.headOffset, WALKING_STEPS[Math.floor(this.frame / CHARACTER_WALKING_CONSTANT)], this.holdingKey, this.direction, size);
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
            if (this.velocity.length > 6) {
                if (this.afterImageCooldown <= 0) {
                    this.afterImageCooldown = 5;
                    return [new CharacterAfterImage(this.position.clone(), this.frame, this.headOffset, this.velocity.direction, this.m_taken)];
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
        Character.prototype.drawCharacter = function (context) {
            var WALKING_STEPS = [0, 1, 0, 2];
            var bodyType = this.m_taken ? 'BODY_HOLDING' : 'BODY';
            DrawingHelper_1.drawCharacterImage(context, bodyType, WALKING_STEPS[Math.floor(this.frame / CHARACTER_WALKING_CONSTANT)], this.velocity.direction, this.position.x, this.position.y, CHARACTER_SIZE);
            DrawingHelper_1.drawCharacterImage(context, 'HEAD', 0, this.velocity.direction, this.position.x, this.position.y + this.headOffset, CHARACTER_SIZE);
        };
        Character.prototype.draw = function (context) {
            // Draw spirit
            this.frame += this.velocity.length;
            while (this.frame > CHARACTER_WALKING_CONSTANT * 4) {
                this.frame -= CHARACTER_WALKING_CONSTANT * 4;
            }
            // Update headOffset
            this.headOffset = (this.velocity.length * 0.2 + 1) * (Math.sin(this.headSpin += Math.PI / 60) + 1);
            drawCharacter(context, this.position.x, this.position.y, this.headOffset, WALKING_STEPS[Math.floor(this.frame / CHARACTER_WALKING_CONSTANT)], this.m_taken, this.velocity.direction);
        };
        return Character;
    }());
    exports.Character = Character;
});
