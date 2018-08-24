define(["require", "exports", "./Images"], function (require, exports, Images_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function circle(context, x, y, radius, color) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }
    exports.circle = circle;
    function drawImage(context, image, row, column, x, y, size) {
        context.drawImage(Images_1.ImagesLoaded[image], row * 16, column * 16, 16, 16, x, y, size, size);
    }
    exports.drawImage = drawImage;
});
