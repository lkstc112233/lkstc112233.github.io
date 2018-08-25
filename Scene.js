define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scene = /** @class */ (function () {
        function Scene() {
            this.sprites = [];
        }
        Scene.prototype.add = function (sprite) {
            this.sprites.push(sprite);
        };
        Scene.prototype.update = function () {
            var _a;
            this.sprites = (_a = []).concat.apply(_a, (this.sprites.map(function (element) { return [element].concat(element.generate ? element.generate() : []); })));
            this.sprites = this.sprites.filter(function (element) { return !element.decay; });
        };
        Scene.prototype.draw = function (context) {
            this.sprites = this.sprites.sort(function (sp1, sp2) { return sp1.z - sp2.z; });
            this.sprites.map(function (element) { return element.draw(context); });
        };
        return Scene;
    }());
    exports.Scene = Scene;
});
