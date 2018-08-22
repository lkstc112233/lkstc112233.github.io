define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function circle(context, x, y, radius, color) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }
    exports.circle = circle;
});
