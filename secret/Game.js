define(["require", "exports", "./Scene", "./Character", "./Key", "./xyTuple"], function (require, exports, Scene_1, Character_1, Key_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Status;
    (function (Status) {
        Status[Status["IDLE"] = 0] = "IDLE";
        Status[Status["PLAYING"] = 1] = "PLAYING";
        Status[Status["TIMEUP"] = 2] = "TIMEUP";
        Status[Status["WIN"] = 3] = "WIN";
    })(Status = exports.Status || (exports.Status = {}));
    var Builder = /** @class */ (function () {
        function Builder() {
            this.left = 0;
            this.top = 0;
            this.width = 100;
            this.height = 100;
            this.playerInitial = new xyTuple_1.Point();
            this.keyInitial = new xyTuple_1.Point();
        }
        Builder.prototype.build = function () {
            var result = new Game(this.width, this.height, this.playerInitial, this.keyInitial, new xyTuple_1.Point(this.left, this.top));
            return result;
        };
        return Builder;
    }());
    exports.Builder = Builder;
    var Boundry = /** @class */ (function () {
        function Boundry(width, height) {
            this.width = width;
            this.height = height;
            this.decay = false;
        }
        Object.defineProperty(Boundry.prototype, "z", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Boundry.prototype.draw = function (context) {
            context.save();
            context.beginPath();
            context.lineWidth = 5;
            context.strokeStyle = 'black';
            context.rect(0, 0, this.width, this.height);
            context.stroke();
            context.restore();
        };
        return Boundry;
    }());
    var Game = /** @class */ (function () {
        function Game(width, height, playerInitial, keyInitial, leftTopPoint) {
            this.width = width;
            this.height = height;
            this.playerInitial = playerInitial;
            this.keyInitial = keyInitial;
            this.leftTopPoint = leftTopPoint;
            this.m_scene = new Scene_1.Scene();
            this.player = new Character_1.Character();
            this.key = new Key_1.Key();
            this.m_status = Status.IDLE;
            this.m_accelerate = new xyTuple_1.Point();
            this.player.position = playerInitial.clone();
            this.key.position = keyInitial.clone();
            this.scene.add(this.player);
            this.scene.add(this.key);
            this.scene.add(new Boundry(this.width, this.height));
        }
        Object.defineProperty(Game.prototype, "scene", {
            get: function () {
                return this.m_scene;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "status", {
            get: function () {
                return this.m_status;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "accelerate", {
            set: function (accelerate) {
                this.m_accelerate = accelerate.clone();
                this.m_accelerate.mul(0.2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "playerKeyDistance", {
            get: function () {
                var dx = this.key.position.x - this.player.position.x;
                var dy = this.key.position.y - this.player.position.y - 20;
                return Math.sqrt(dx * dx + dy * dy);
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.begin = function () {
            this.m_status = Status.PLAYING;
        };
        Game.prototype.update = function () {
            if (this.status != Status.PLAYING) {
                return;
            }
            this.player.velocity.plus(this.m_accelerate);
            this.player.update();
            // Boundry check
            if (this.player.position.x < 20) {
                this.player.velocity.x = 0;
                this.player.position.x = 20;
            }
            if (this.player.position.y < 0) {
                this.player.velocity.y = 0;
                this.player.position.y = 0;
            }
            if (this.player.position.x > this.width - 20) {
                this.player.velocity.x = 0;
                this.player.position.x = this.width - 20;
            }
            if (this.player.position.y > this.height - 20) {
                this.player.velocity.y = 0;
                this.player.position.y = this.height - 20;
            }
            if (this.playerKeyDistance < 20) {
                this.key.taken();
                this.player.taken();
            }
            this.scene.update();
        };
        Game.prototype.draw = function (context) {
            context.save();
            context.translate(this.leftTopPoint.x, this.leftTopPoint.y);
            this.scene.draw(context);
            context.restore();
        };
        return Game;
    }());
});
