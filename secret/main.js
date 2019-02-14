define(["require", "exports", "./Button", "./Images", "./Levels", "./xyTuple"], function (require, exports, Button_1, Images_1, Levels_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    // TODO: Update size by view
    if (canvas.width > canvas.height) {
        var margin = canvas.width / 30;
        var scale = margin * 8 / 400;
        Levels_1.Level1.top = 2 * margin;
        Levels_1.Level2.top = 2 * margin;
        Levels_1.Level3.top = 2 * margin;
        Levels_1.Level1.left = 2 * margin;
        Levels_1.Level2.left = 11 * margin;
        Levels_1.Level3.left = 20 * margin;
        Levels_1.Level1.scale = scale;
        Levels_1.Level2.scale = scale;
        Levels_1.Level3.scale = scale;
        margin = canvas.height / 12;
        scale = margin * 8 / 550;
        Levels_1.LevelB1.top = 2 * margin;
        Levels_1.LevelB1.left = 2 * margin;
        Levels_1.LevelB1.scale = scale;
    }
    else {
        var margin = canvas.width / 21;
        var scale = margin * 8 / 400;
        Levels_1.Level1.top = 2 * margin;
        Levels_1.Level2.top = 11 * margin;
        Levels_1.Level3.top = 2 * margin;
        Levels_1.Level1.left = 2 * margin;
        Levels_1.Level2.left = 6.5 * margin;
        Levels_1.Level3.left = 11 * margin;
        Levels_1.Level1.scale = scale;
        Levels_1.Level2.scale = scale;
        Levels_1.Level3.scale = scale;
        margin = canvas.width / 12;
        scale = margin * 8 / 600;
        Levels_1.LevelB1.top = 2 * margin;
        Levels_1.LevelB1.left = 2 * margin;
        Levels_1.LevelB1.scale = scale;
    }
    var tutorial = Levels_1.LevelB1.build();
    var level1 = Levels_1.Level1.build();
    var level2 = Levels_1.Level2.build();
    var level3 = Levels_1.Level3.build();
    tutorial.begin();
    var levels = [tutorial];
    var buttons = new Button_1.ButtonSet();
    function loadLoop() {
        if (Images_1.loadedImageSum != Images_1.totalImageSum) {
            requestAnimationFrame(loadLoop);
            context.clearRect(0, 0, canvas.width, canvas.height);
            var ratio = Images_1.loadedImageSum / Images_1.totalImageSum;
            context.beginPath();
            context.moveTo(0, canvas.height / 2);
            context.lineWidth = 30;
            context.strokeStyle = '#f00';
            context.lineTo(ratio * canvas.width, canvas.height / 2);
            context.strokeStyle = '#00f';
            context.lineTo(canvas.width, canvas.height / 2);
            context.stroke();
        }
        else {
            requestAnimationFrame(tutorialLoop);
        }
    }
    function tutorialLoop() {
        if (!tutorial.rewindCompleted) {
            requestAnimationFrame(tutorialLoop);
        }
        else {
            levels.length = 0;
            levels.push(level1);
            levels.push(level2);
            levels.push(level3);
            requestAnimationFrame(transformLoop);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        levels.map(function (element) { return element.update(); });
        if (tutorial.won) {
            tutorial.rewind();
        }
        levels.map(function (element) { return element.draw(context); });
        buttons.draw(context);
    }
    var transformProcess = 0;
    var TRANSFORM_LENGTH = 100;
    function transformLoop() {
        if ((transformProcess += 1) < TRANSFORM_LENGTH) {
            requestAnimationFrame(transformLoop);
        }
        else {
            level1.begin();
            requestAnimationFrame(gameLoop);
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        levels.map(function (element) { return element.update(); });
        context.save();
        context.globalAlpha = (TRANSFORM_LENGTH - transformProcess) / TRANSFORM_LENGTH;
        tutorial.draw(context);
        context.globalAlpha = 1 - context.globalAlpha;
        levels.map(function (element) { return element.draw(context); });
        context.restore();
        buttons.draw(context);
    }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        context.clearRect(0, 0, canvas.width, canvas.height);
        levels.map(function (element) { return element.update(); });
        if (level1.won) {
            level1.idle();
            level2.begin();
        }
        if (level2.won) {
            level2.idle();
            level3.begin();
        }
        if (level3.won) {
            level3.idle();
            level1.rewind();
        }
        if (level1.rewindCompleted) {
            level1.idle();
            level2.rewind();
        }
        if (level2.rewindCompleted) {
            level2.idle();
            level3.rewind();
        }
        levels.map(function (element) { return element.draw(context); });
        buttons.draw(context);
    }
    canvas.addEventListener('touchmove', function (ev) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.touches[0].clientX - rect.left;
        var y = ev.touches[0].clientY - rect.top;
        var currentPoint = new xyTuple_1.Point(x, y);
        if (buttons.mousemove(currentPoint)) {
            return;
        }
        levels.map(function (element) { return element.touchUpdate(currentPoint); });
    });
    canvas.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
        if (ev.touches.length == 1) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.touches[0].clientX - rect.left;
            var y = ev.touches[0].clientY - rect.top;
            var currentPoint_1 = new xyTuple_1.Point(x, y);
            if (buttons.mousedown(currentPoint_1)) {
                return;
            }
            levels.map(function (element) { return element.touchBegin(currentPoint_1); });
        }
    });
    canvas.addEventListener('touchend', function (ev) {
        if (ev.touches.length == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.changedTouches[0].clientX - rect.left;
            var y = ev.changedTouches[0].clientY - rect.top;
            var currentPoint = new xyTuple_1.Point(x, y);
            buttons.mouseup(currentPoint);
            levels.map(function (element) { return element.touchEnd(); });
        }
    });
    canvas.addEventListener('mousemove', function (ev) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;
        var currentPoint = new xyTuple_1.Point(x, y);
        if (buttons.mousemove(currentPoint)) {
            return;
        }
        levels.map(function (element) { return element.touchUpdate(currentPoint); });
    });
    canvas.addEventListener('mousedown', function (ev) {
        if (ev.button == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            var currentPoint_2 = new xyTuple_1.Point(x, y);
            if (buttons.mousedown(currentPoint_2)) {
                return;
            }
            levels.map(function (element) { return element.touchBegin(currentPoint_2); });
        }
    });
    canvas.addEventListener('mouseup', function (ev) {
        if (ev.button == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            var currentPoint = new xyTuple_1.Point(x, y);
            buttons.mouseup(currentPoint);
            levels.map(function (element) { return element.touchEnd(); });
        }
    });
    Images_1.loadAll();
    requestAnimationFrame(loadLoop);
});
