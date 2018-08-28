define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Images;
    (function (Images) {
        Images["BODY"] = "res/body.png";
        Images["BODY_HOLDING"] = "res/body-holding.png";
        Images["HEAD"] = "res/head.png";
        Images["KEY"] = "res/goldenkey.png";
    })(Images = exports.Images || (exports.Images = {}));
    exports.ImagesLoaded = {
        BODY: new Image(),
        BODY_HOLDING: new Image(),
        HEAD: new Image(),
        KEY: new Image(),
    };
    exports.loadedImageSum = 0;
    exports.totalImageSum = Object.keys(Images).length;
    function loadAll() {
        var keys = Object.keys(Images);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var value = Images[key];
            exports.ImagesLoaded[key].src = value;
            exports.ImagesLoaded[key].onload = function () { return exports.loadedImageSum += 1; };
        }
    }
    exports.loadAll = loadAll;
});
