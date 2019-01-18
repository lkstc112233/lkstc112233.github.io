define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Images;
    (function (Images) {
        Images["BODY"] = "res/body.png";
        Images["BODY_HOLDING"] = "res/body-holding.png";
        Images["HEAD"] = "res/head.png";
        Images["KEY"] = "res/goldenkey.png";
        Images["CHEST"] = "res/treasure-chest.png";
        Images["RESET_BUTTON"] = "res/reset-button.png";
        Images["RESET_BUTTON_HOVER"] = "res/reset-button-hover.png";
        Images["RESET_BUTTON_PRESSED"] = "res/reset-button-pressed.png";
    })(Images = exports.Images || (exports.Images = {}));
    var ImagesLoaded = {};
    function getLoadedImage(id) {
        if (ImagesLoaded[id]) {
            return ImagesLoaded[id];
        }
        return ImagesLoaded[id] = new Image();
    }
    exports.getLoadedImage = getLoadedImage;
    ;
    exports.loadedImageSum = 0;
    exports.totalImageSum = Object.keys(Images).length;
    function loadAll() {
        var keys = Object.keys(Images);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var value = Images[key];
            getLoadedImage(key).onload = function () { return exports.loadedImageSum += 1; };
            getLoadedImage(key).src = value;
        }
    }
    exports.loadAll = loadAll;
});
