define(["require", "exports", "./Character", "./xyTuple", "./Controller", "./Images"], function (require, exports, Character_1, xyTuple_1, Controller_1, Images_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var char = new Character_1.Character();
    var controller = new Controller_1.Controller();
    var vel = new xyTuple_1.Point();
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
        var acc = controller.getControllerValue();
        acc.mul(0.3);
        char.velocity.plus(acc);
        char.draw(context);
        controller.draw(context);
    }
    var defaultAcc = 0.1;
    canvas.addEventListener("touchmove", function (ev) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.touches[0].clientX - rect.left;
        var y = ev.touches[0].clientY - rect.top;
        controller.touchUpdate(new xyTuple_1.Point(x, y));
    });
    canvas.addEventListener("touchstart", function (ev) {
        ev.preventDefault();
        if (ev.touches.length == 1) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.touches[0].clientX - rect.left;
            var y = ev.touches[0].clientY - rect.top;
            controller.touchBegin(new xyTuple_1.Point(x, y));
        }
    });
    canvas.addEventListener("touchend", function (ev) {
        if (ev.touches.length == 0) {
            controller.touchEnd();
        }
    });
    canvas.addEventListener("mousemove", function (ev) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;
        controller.touchUpdate(new xyTuple_1.Point(x, y));
    });
    canvas.addEventListener("mousedown", function (ev) {
        if (ev.button == 0) {
            var rect = canvas.getBoundingClientRect();
            var x = ev.clientX - rect.left;
            var y = ev.clientY - rect.top;
            controller.touchBegin(new xyTuple_1.Point(x, y));
        }
    });
    canvas.addEventListener("mouseup", function (ev) {
        if (ev.button == 0) {
            controller.touchEnd();
        }
    });
    Images_1.loadAll();
    requestAnimationFrame(loadLoop);
});
