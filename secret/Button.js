define(["require", "exports", "./Images", "./xyTuple"], function (require, exports, Images_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resetImages = ['RESET_BUTTON', 'RESET_BUTTON_HOVER',
        'RESET_BUTTON_PRESSED'];
    var Button = /** @class */ (function () {
        function Button() {
            this.position = new xyTuple_1.Point();
            this.width = 30;
            this.height = 30;
            this.captured = false;
            this.hover = false;
            this.images = exports.resetImages;
        }
        Object.defineProperty(Button.prototype, "capturing", {
            get: function () {
                return this.captured;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.mousedown = function (point) {
            if (point.x > this.position.x && point.y > this.position.y &&
                point.x - this.position.x < this.width &&
                point.y - this.position.y < this.height) {
                this.captured = true;
            }
        };
        Button.prototype.mousemove = function (point) {
            if (point.x > this.position.x && point.y > this.position.y &&
                point.x - this.position.x < this.width &&
                point.y - this.position.y < this.height) {
                this.hover = true;
            }
            else {
                this.hover = false;
            }
        };
        Button.prototype.mouseup = function (point) {
            if (this.captured && point.x > this.position.x &&
                point.y > this.position.y && point.x - this.position.x < this.width &&
                point.y - this.position.y < this.height) {
                if (this.onclick) {
                    this.onclick();
                }
            }
            this.captured = false;
        };
        Button.prototype.draw = function (context) {
            var _this = this;
            var drawImage = function (key) { return context.drawImage(Images_1.getLoadedImage(_this.images[key]), _this.position.x, _this.position.y, _this.width, _this.height); };
            if (!this.hover) {
                drawImage(0);
            }
            else if (this.capturing) {
                drawImage(2);
            }
            else {
                drawImage(1);
            }
        };
        return Button;
    }());
    exports.Button = Button;
    var ButtonSet = /** @class */ (function () {
        function ButtonSet() {
            this.buttons = [];
        }
        ButtonSet.prototype.add = function (button) {
            this.buttons.push(button);
        };
        ButtonSet.prototype.clear = function () {
            this.buttons = [];
        };
        // Returns true if the message is consumed by any of the button.
        ButtonSet.prototype.mousedown = function (point) {
            return this.buttons.reduce(function (handled, element) {
                if (handled) {
                    return true;
                }
                element.mousedown(point);
                if (element.capturing) {
                    return true;
                }
                return false;
            }, false);
        };
        ButtonSet.prototype.mousemove = function (point) {
            return this.buttons.reduce(function (handled, element) {
                if (handled) {
                    return true;
                }
                element.mousemove(point);
                if (element.capturing) {
                    return true;
                }
                return false;
            }, false);
        };
        ButtonSet.prototype.mouseup = function (point) {
            this.buttons.map(function (element) { return element.mouseup(point); });
        };
        ButtonSet.prototype.draw = function (context) {
            this.buttons.map(function (element) { return element.draw(context); });
        };
        return ButtonSet;
    }());
    exports.ButtonSet = ButtonSet;
});
