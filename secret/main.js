define(["require", "exports", "./Button", "./Images", "./Levels", "./xyTuple"], function (require, exports, Button_1, Images_1, Levels_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var game = Levels_1.LevelB1.build();
    game.begin();
    var buttons = new Button_1.ButtonSet();
    var reset = new Button_1.Button();
    reset.onclick = function () { return game.beginReset(); };
    buttons.add(reset);
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
            requestAnimationFrame(gameLoop);
        }
    }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        if (game.won) {
            game.rewind();
        }
        game.draw(context);
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
        game.touchUpdate(currentPoint);
    });
    canvas.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
        if (ev.touches.length == 1) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.touches[0].clientX - rect.left;
            var y = ev.touches[0].clientY - rect.top;
            var currentPoint = new xyTuple_1.Point(x, y);
            if (buttons.mousedown(currentPoint)) {
                return;
            }
            game.touchBegin(currentPoint);
        }
    });
    canvas.addEventListener('touchend', function (ev) {
        if (ev.touches.length == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.changedTouches[0].clientX - rect.left;
            var y = ev.changedTouches[0].clientY - rect.top;
            var currentPoint = new xyTuple_1.Point(x, y);
            buttons.mouseup(currentPoint);
            game.touchEnd();
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
        game.touchUpdate(currentPoint);
    });
    canvas.addEventListener('mousedown', function (ev) {
        if (ev.button == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            var currentPoint = new xyTuple_1.Point(x, y);
            if (buttons.mousedown(currentPoint)) {
                return;
            }
            game.touchBegin(currentPoint);
        }
    });
    canvas.addEventListener('mouseup', function (ev) {
        if (ev.button == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            var currentPoint = new xyTuple_1.Point(x, y);
            buttons.mouseup(currentPoint);
            game.touchEnd();
        }
    });
    Images_1.loadAll();
    requestAnimationFrame(loadLoop);
});
