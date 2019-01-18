define(["require", "exports", "./Character", "./Chest", "./Controller", "./Key", "./Rewind", "./Scene", "./Time", "./xyTuple"], function (require, exports, Character_1, Chest_1, Controller_1, Key_1, Rewind_1, Scene_1, Time_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Status;
    (function (Status) {
        Status[Status["IDLE"] = 0] = "IDLE";
        Status[Status["PLAYING"] = 1] = "PLAYING";
        Status[Status["TIMEUP"] = 2] = "TIMEUP";
        Status[Status["RESETING"] = 3] = "RESETING";
        Status[Status["WIN"] = 4] = "WIN";
        Status[Status["REWIND_INITIATED"] = 5] = "REWIND_INITIATED";
        Status[Status["REWINDING"] = 6] = "REWINDING";
        Status[Status["REWIND_COMPLETE"] = 7] = "REWIND_COMPLETE";
    })(Status = exports.Status || (exports.Status = {}));
    var Builder = /** @class */ (function () {
        function Builder() {
            this.left = 0;
            this.top = 0;
            this.width = 100;
            this.height = 100;
            this.timelimit = 600;
            this.playerInitial = new xyTuple_1.Point();
            this.keyInitial = new xyTuple_1.Point();
            this.chestInitial = new xyTuple_1.Point();
        }
        Builder.prototype.build = function () {
            var result = new Game(this.width, this.height, this.timelimit, this.playerInitial, this.keyInitial, this.chestInitial, new xyTuple_1.Point(this.left, this.top));
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
    var RESET_PROCESS_LENGTH_HALF = 30;
    var Game = /** @class */ (function () {
        function Game(width, height, timelimit, playerInitial, keyInitial, chestInitial, leftTopPoint) {
            this.width = width;
            this.height = height;
            this.timelimit = timelimit;
            this.playerInitial = playerInitial;
            this.keyInitial = keyInitial;
            this.chestInitial = chestInitial;
            this.leftTopPoint = leftTopPoint;
            this.m_scene = new Scene_1.Scene();
            this.player = new Character_1.Character();
            this.playerPositionRecord = [];
            this.key = new Key_1.Key();
            this.chest = new Chest_1.Chest();
            this.m_status = Status.IDLE;
            this.controller = new Controller_1.Controller();
            this.useController = false;
            this.resetProcess = 0;
            this.timeSlider =
                new Time_1.TimeSlider(this.width, this.height + 10, this.timelimit);
            this.reset();
        }
        Game.prototype.beginReset = function () {
            this.m_status = Status.RESETING;
            if (this.resetProcess > RESET_PROCESS_LENGTH_HALF &&
                this.resetProcess < RESET_PROCESS_LENGTH_HALF * 2) {
                this.resetProcess = RESET_PROCESS_LENGTH_HALF * 2 - this.resetProcess;
            }
            this.resetProcess = 0;
        };
        Game.prototype.reset = function () {
            this.player.reset();
            this.player.position = this.playerInitial.clone();
            this.playerPositionRecord = [];
            this.key.reset();
            this.key.position = this.keyInitial.clone();
            this.chest.reset();
            this.chest.position = this.chestInitial.clone();
            this.timeSlider.reset();
            this.scene.clear();
            this.scene.add(this.player);
            this.scene.add(this.key);
            this.scene.add(this.chest);
            this.scene.add(new Boundry(this.width, this.height));
            this.scene.add(this.timeSlider);
            return this;
        };
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
        Game.prototype.touchBegin = function (point) {
            this.touching = point.clone();
            this.touching.minus(this.leftTopPoint);
            this.controller.touchBegin(point);
        };
        Game.prototype.touchUpdate = function (point) {
            if (this.touching) {
                this.touching = point.clone();
                this.touching.minus(this.leftTopPoint);
            }
            this.controller.touchUpdate(point);
        };
        Game.prototype.touchEnd = function () {
            if (!this.useController) {
                this.touching = undefined;
            }
            this.controller.touchEnd();
        };
        Object.defineProperty(Game.prototype, "playerKeyDistance", {
            get: function () {
                if (this.key.gone) {
                    return Infinity;
                }
                var dx = this.key.position.x - this.player.position.x;
                var dy = this.key.position.y - this.player.position.y - 20;
                return Math.sqrt(dx * dx + dy * dy);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "playerChestDistance", {
            get: function () {
                var dx = this.chest.position.x - this.player.position.x;
                var dy = this.chest.position.y - this.player.position.y;
                return Math.sqrt(dx * dx + dy * dy);
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.begin = function () {
            this.m_status = Status.PLAYING;
        };
        Game.prototype.win = function () {
            this.timeSlider.stop();
            this.m_status = Status.WIN;
        };
        Object.defineProperty(Game.prototype, "won", {
            get: function () {
                return this.status == Status.WIN;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.rewind = function () {
            this.m_status = Status.REWIND_INITIATED;
        };
        Object.defineProperty(Game.prototype, "rewindCompleted", {
            get: function () {
                return this.status == Status.REWIND_COMPLETE;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.update = function () {
            switch (this.status) {
                case Status.PLAYING: {
                    if (this.timeSlider.timeout) {
                        this.m_status = Status.RESETING;
                        this.player.velocity.zero();
                        this.scene.update();
                        return;
                    }
                    var accelerator = void 0;
                    if (this.useController) {
                        accelerator = this.controller.getControllerValue();
                        accelerator.mul(0.2);
                    }
                    else if (this.touching) {
                        accelerator = this.touching.clone();
                        accelerator.minus(this.player.position);
                        accelerator.normalize();
                        accelerator.mul(0.2);
                    }
                    else {
                        accelerator = new xyTuple_1.Point();
                    }
                    this.player.velocity.plus(accelerator);
                    this.player.update();
                    if (!this.timeSlider.stopped) {
                        this.playerPositionRecord.push(this.player.position.clone());
                    }
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
                    if (this.playerChestDistance < 20 && this.player.holding) {
                        this.chest.open();
                        this.player.untaken();
                        this.player.velocity.zero();
                        this.win();
                    }
                    break;
                }
                case Status.TIMEUP: {
                    this.m_status = Status.RESETING;
                    break;
                }
                case Status.RESETING: {
                    if (this.resetProcess < RESET_PROCESS_LENGTH_HALF * 2) {
                        this.resetProcess += 1;
                    }
                    if (this.resetProcess == RESET_PROCESS_LENGTH_HALF) {
                        this.reset();
                    }
                    if (this.resetProcess == RESET_PROCESS_LENGTH_HALF * 2) {
                        this.resetProcess = 0;
                        this.begin();
                    }
                    break;
                }
                case Status.REWIND_INITIATED: {
                    this.scene.add(this.rewinder = new Rewind_1.Rewinder(this.playerPositionRecord));
                    this.m_status = Status.REWINDING;
                    break;
                }
                case Status.REWINDING: {
                    if (this.rewinder && this.rewinder.completed) {
                        this.m_status = Status.REWIND_COMPLETE;
                    }
                    break;
                }
            }
            this.scene.update();
        };
        Game.prototype.draw = function (context) {
            context.save();
            if (this.status == Status.RESETING) {
                context.globalAlpha =
                    Math.abs(this.resetProcess - RESET_PROCESS_LENGTH_HALF) /
                        RESET_PROCESS_LENGTH_HALF;
            }
            context.translate(this.leftTopPoint.x, this.leftTopPoint.y);
            this.scene.draw(context);
            context.restore();
            if (this.useController) {
                this.controller.draw(context);
            }
        };
        return Game;
    }());
});
