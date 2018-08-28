define(["require", "exports", "./Game", "./xyTuple"], function (require, exports, Game_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelB1 = new Game_1.Builder();
    exports.LevelB1.left = 100;
    exports.LevelB1.width = 600;
    exports.LevelB1.top = 50;
    exports.LevelB1.height = 550;
    exports.LevelB1.keyInitial = new xyTuple_1.Point(250, 200);
    exports.LevelB1.playerInitial = new xyTuple_1.Point(100, 50);
});
