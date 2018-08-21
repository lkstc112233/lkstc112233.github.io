define(["require", "exports", "./Character", "./xyTuple"], function (require, exports, Character_1, xyTuple_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext('2d');
    var char1 = new Character_1.Character();
    var char2 = new Character_1.Character();
    var acc = new xyTuple_1.Point();
    var vel = new xyTuple_1.Point();
    var magnetOn = false;
    var mouseX = 0;
    var mouseY = 0;
    function updateMouseAcc() {
        var rect = canvas.getBoundingClientRect();
        acc.x = mouseX - rect.left;
        acc.y = mouseY - rect.top;
        acc.minus(char1.position);
        acc.normalize();
        acc.mul(0.15);
    }
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (magnetOn) {
            updateMouseAcc();
        }
        else {
            acc.zero();
        }
        vel.plus(acc);
        vel.mul(0.97);
        char1.position.plus(vel);
        char1.draw(context);
    }
    var defaultAcc = 0.1;
    canvas.addEventListener("mousemove", function (ev) {
        mouseX = ev.clientX;
        mouseY = ev.clientY;
    });
    canvas.addEventListener("mousedown", function (ev) {
        if (ev.button == 0) {
            magnetOn = true;
        }
    });
    canvas.addEventListener("mouseup", function (ev) {
        if (ev.button == 0) {
            magnetOn = false;
        }
    });
    requestAnimationFrame(gameLoop);
});
