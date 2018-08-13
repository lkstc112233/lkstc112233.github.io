"use strict";
var hello = document.getElementById("hello");
hello.innerText = 'Hello world!';
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var angle = 0;
var centerX = 200;
var centerY = 200;
var radius = 100;
var count = 1;
function drawLine(count) {
    if (count === void 0) { count = 1; }
    context.beginPath();
    context.lineWidth = 10;
    if (count > 30) {
        context.lineWidth = 3;
    }
    var step = Math.PI * 2 / count;
    for (var i = 0; i < count; ++i) {
        context.moveTo(centerX, centerY);
        context.lineTo(centerX + radius * Math.cos(angle + step * i), centerY + radius * Math.sin(angle + step * i));
    }
    context.stroke();
}
function gameLoop() {
    requestAnimationFrame(gameLoop);
    angle += Math.PI / 60;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(count);
}
canvas.addEventListener("mousemove", function (ev) {
    var rect = canvas.getBoundingClientRect();
    centerX = ev.clientX - rect.left;
    centerY = ev.clientY - rect.top;
});
document.addEventListener('keydown', function (ev) {
    if (ev.keyCode == 65) {
        count -= 1;
        if (count <= 0) {
            count = 1;
        }
    }
    if (ev.keyCode == 68) {
        count += 1;
        if (count >= 100) {
            count = 100;
        }
    }
});
requestAnimationFrame(gameLoop);
