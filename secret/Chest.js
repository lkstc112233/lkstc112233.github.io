define(["require", "exports", "./DrawingHelper", "./xyTuple"], function (require, exports, DrawingHelper_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CHEST_SIZE = 40;
    var OpeningChest = /** @class */ (function () {
        function OpeningChest(position) {
            this.decayProcess = 0;
            this.position = new xyTuple_1.Point();
            this.position = position.clone();
        }
        Object.defineProperty(OpeningChest.prototype, "z", {
            get: function () {
                return this.position.y + 40;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OpeningChest.prototype, "decay", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        OpeningChest.prototype.draw = function (context) {
            DrawingHelper_1.drawChestImage(context, Math.floor(this.decayProcess / 7), this.position.x, this.position.y, CHEST_SIZE);
            this.decayProcess += 1;
        };
        return OpeningChest;
    }());
    var Chest = /** @class */ (function () {
        function Chest() {
            this.opening = false;
            this.position = new xyTuple_1.Point();
        }
        Chest.prototype.reset = function () {
            this.opening = false;
        };
        Object.defineProperty(Chest.prototype, "z", {
            get: function () {
                return this.position.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chest.prototype, "decay", {
            get: function () {
                return this.opening;
            },
            enumerable: true,
            configurable: true
        });
        Chest.prototype.open = function () {
            this.opening = true;
        };
        Chest.prototype.generate = function () {
            if (this.opening) {
                return [new OpeningChest(this.position)];
            }
            return [];
        };
        Chest.prototype.draw = function (context) {
            DrawingHelper_1.drawChestImage(context, 0, this.position.x, this.position.y, CHEST_SIZE);
        };
        return Chest;
    }());
    exports.Chest = Chest;
});
