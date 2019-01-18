define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeSlider = /** @class */ (function () {
        function TimeSlider(width, y, timelimit) {
            this.width = width;
            this.y = y;
            this.timelimit = timelimit;
            this.m_current = 0;
            this.m_stopped = false;
            this.decay = false;
        }
        Object.defineProperty(TimeSlider.prototype, "current", {
            get: function () {
                return this.m_current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSlider.prototype, "stopped", {
            get: function () {
                return this.m_stopped;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimeSlider.prototype, "timeout", {
            get: function () {
                return this.m_current >= this.timelimit;
            },
            enumerable: true,
            configurable: true
        });
        TimeSlider.prototype.stop = function () {
            this.m_stopped = true;
        };
        TimeSlider.prototype.reset = function () {
            this.m_current = 0;
            this.m_stopped = false;
        };
        Object.defineProperty(TimeSlider.prototype, "z", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        TimeSlider.prototype.draw = function (context) {
            if (!this.stopped) {
                this.m_current += 1;
            }
            if (this.timeout) {
                this.stop();
            }
            var rate = this.current / this.timelimit;
            rate = Math.min(rate, 1);
            context.save();
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(0, this.y);
            context.lineTo(this.width * rate, this.y);
            context.strokeStyle = 'red';
            context.stroke();
            context.beginPath();
            context.moveTo(this.width * rate, this.y);
            context.lineTo(this.width, this.y);
            context.strokeStyle = 'gray';
            context.stroke();
            context.restore();
        };
        return TimeSlider;
    }());
    exports.TimeSlider = TimeSlider;
});
