define(["require", "exports", "./Game", "./Obstacle", "./xyTuple"], function (require, exports, Game_1, Obstacle_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelB1 = new Game_1.Builder();
    exports.LevelB1.left = 100;
    exports.LevelB1.width = 600;
    exports.LevelB1.top = 50;
    exports.LevelB1.height = 550;
    exports.LevelB1.keyInitial = new xyTuple_1.Point(250, 200);
    exports.LevelB1.playerInitial = new xyTuple_1.Point(100, 50);
    exports.LevelB1.chestInitial = new xyTuple_1.Point(400, 350);
    exports.LevelB1.obstacles = [
        new Obstacle_1.Obstacle(50, new xyTuple_1.Point(400, 100)), new Obstacle_1.Obstacle(200, new xyTuple_1.Point(100, 400))
    ];
    exports.Level1 = new Game_1.Builder();
    exports.Level1.left = 100;
    exports.Level1.width = 400;
    exports.Level1.top = 100;
    exports.Level1.height = 400;
    exports.Level1.timelimit = 80;
    exports.Level1.keyInitial = new xyTuple_1.Point(200, 200);
    exports.Level1.playerInitial = new xyTuple_1.Point(200, 50);
    exports.Level1.chestInitial = new xyTuple_1.Point(200, 350);
    exports.Level1.obstacles = [
        new Obstacle_1.Obstacle(125, new xyTuple_1.Point(50, 200)),
        new Obstacle_1.Obstacle(125, new xyTuple_1.Point(350, 200)),
    ];
    exports.Level2 = new Game_1.Builder();
    exports.Level2.left = 550;
    exports.Level2.width = 400;
    exports.Level2.top = 100;
    exports.Level2.height = 400;
    exports.Level2.timelimit = 290;
    exports.Level2.keyInitial = new xyTuple_1.Point(200, 350);
    exports.Level2.playerInitial = new xyTuple_1.Point(200, 25);
    exports.Level2.chestInitial = new xyTuple_1.Point(200, 25);
    exports.Level2.obstacles = [
        new Obstacle_1.Obstacle(100, new xyTuple_1.Point(125, 125)),
        new Obstacle_1.Obstacle(100, new xyTuple_1.Point(275, 125)),
        new Obstacle_1.Obstacle(200, new xyTuple_1.Point(0, 400)),
        new Obstacle_1.Obstacle(200, new xyTuple_1.Point(400, 400)),
    ];
    exports.Level3 = new Game_1.Builder();
    exports.Level3.left = 1000;
    exports.Level3.width = 400;
    exports.Level3.top = 100;
    exports.Level3.height = 400;
    exports.Level3.timelimit = 175;
    exports.Level3.keyInitial = new xyTuple_1.Point(200, 340);
    exports.Level3.playerInitial = new xyTuple_1.Point(50, 50);
    exports.Level3.chestInitial = new xyTuple_1.Point(350, 50);
    exports.Level3.obstacles = [
        new Obstacle_1.Obstacle(150, new xyTuple_1.Point(200, 150)),
    ];
});
