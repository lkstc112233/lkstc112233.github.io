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
    function drawCharacterImage(context, image, row, column, x, y, size) {
        context.drawImage(Images_1.ImagesLoaded[image], row * 16, column * 16, 16, 16, x - size / 2, y - size / 2, size, size);
    }
    exports.drawCharacterImage = drawCharacterImage;
    function drawKeyImage(context, x, y, size, flip) {
        if (flip === void 0) { flip = false; }
        context.save();
        if (flip) {
            context.scale(-1, 1);
            x = -x;
        }
        context.drawImage(Images_1.ImagesLoaded['KEY'], x - size / 2, y - size / 2, size, size);
        context.restore();
    }
    exports.drawKeyImage = drawKeyImage;
    function drawChestImage(context, process, x, y, size) {
        if (process > 6) {
            process = 6;
        }
        var column = Math.floor(process / 4);
        var row = process % 4;
        console.log(process, row, column);
        context.drawImage(Images_1.ImagesLoaded['CHEST'], row * 35, column * 35, 35, 35, x - size / 2, y - size / 2, size, size);
    }
    exports.drawChestImage = drawChestImage;
});
