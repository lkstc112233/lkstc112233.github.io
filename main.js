define(["require", "exports", "./Character", "./xyTuple", "./Controller"], function (require, exports, Character_1, xyTuple_1, Controller_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var char = new Character_1.Character();
    var controller = new Controller_1.Controller();
    var vel = new xyTuple_1.Point();
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        context.clearRect(0, 0, canvas.width, canvas.height);
        var acc = controller.getControllerValue();
        acc.mul(0.3);
        vel.plus(acc);
        vel.mul(0.97);
        char.position.plus(vel);
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
    requestAnimationFrame(gameLoop);
});
