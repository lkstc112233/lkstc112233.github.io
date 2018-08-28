define(["require", "exports", "./Game", "./xyTuple"], function (require, exports, Game_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Level1 = new Game_1.Builder();
    exports.Level1.boundryLeft = 100;
    exports.Level1.boundryRight = 400;
    exports.Level1.boundryTop = 50;
    exports.Level1.boundryBottom = 300;
    exports.Level1.keyInitial = new xyTuple_1.Point(250, 200);
    exports.Level1.playerInitial = new xyTuple_1.Point(100, 50);
});
