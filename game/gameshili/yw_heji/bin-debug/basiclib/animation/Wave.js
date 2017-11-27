/**
 * Created by admin on 2014/12/9.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var basic;
(function (basic) {
    var Wave = (function () {
        function Wave(target, duration, calPos, loop, autoPlay, reverse, delay) {
            if (calPos === void 0) { calPos = null; }
            if (loop === void 0) { loop = 0; }
            if (autoPlay === void 0) { autoPlay = true; }
            if (reverse === void 0) { reverse = false; }
            if (delay === void 0) { delay = 0; }
            this._oldProperties = {};
            this._t = 0;
            this.target = target;
            this._calPos = calPos ? calPos : Wave.round;
            this.duration = duration;
            this.loop = loop;
            this.reverse = reverse;
            this.delay = delay;
            this.updateRegisterPos();
            if (autoPlay) {
                this.play();
            }
        }
        Wave.prototype.updateRegisterPos = function () {
            this._oldProperties.x = this.target.x;
            this._oldProperties.y = this.target.y;
            this._oldProperties.scaleX = this.target.scaleX;
            this._oldProperties.scaleY = this.target.scaleY;
            this._oldProperties.skewX = this.target.skewX;
            this._oldProperties.skewY = this.target.skewY;
            this._oldProperties.rotation = this.target.rotation;
        };
        Wave.prototype.play = function () {
            if (this._tween) {
                return;
            }
            this._count = 0;
            this._playStep();
        };
        Wave.prototype._playStep = function () {
            if (this.loop > 0 && this._count >= this.loop) {
                this.stop();
                return;
            }
            this._count++;
            this.t = this.reverse ? Math.PI * 2 : 0;
            this._tween = egret.Tween.get(this);
            this._tween.wait(this.delay).to({ t: this.reverse ? 0 : Math.PI * 2 }, this.duration).call(this._playStep, this);
        };
        Object.defineProperty(Wave.prototype, "t", {
            get: function () {
                return this._t;
            },
            set: function (value) {
                if (!this.target.stage) {
                    return;
                }
                this._t = value;
                var pos = this._calPos.call(this, this._t);
                this.target.x = (pos.hasOwnProperty('x') ? pos.x : 0) + this._oldProperties.x;
                this.target.y = (pos.hasOwnProperty('y') ? pos.y : 0) + this._oldProperties.y;
                if (pos.hasOwnProperty('sx')) {
                    this.target.scaleX = pos.sx;
                }
                if (pos.hasOwnProperty('sy')) {
                    this.target.scaleY = pos.sy;
                }
                if (pos.hasOwnProperty('skewX')) {
                    this.target.skewX = pos.skewX;
                }
                if (pos.hasOwnProperty('skewY')) {
                    this.target.skewY = pos.skewY;
                }
                if (pos.hasOwnProperty('r')) {
                    this.target.rotation = pos.r;
                }
            },
            enumerable: true,
            configurable: true
        });
        Wave.prototype.stop = function (recovery, animation, duration) {
            if (recovery === void 0) { recovery = false; }
            if (animation === void 0) { animation = false; }
            if (duration === void 0) { duration = 1000; }
            egret.Tween.removeTweens(this);
            this._tween = null;
            if (recovery) {
                egret.Tween.get(this.target).to(this._oldProperties, duration);
            }
        };
        Object.defineProperty(Wave.prototype, "playing", {
            get: function () {
                return this._tween != null;
            },
            enumerable: true,
            configurable: true
        });
        Wave.round = function (t) {
            return { x: Math.cos(t), y: Math.sin(t) };
        };
        Wave.cos = function (t) {
            return { x: Math.cos(t), y: 0 };
        };
        Wave.sin = function (h, t) {
            h = h || 1;
            return { x: 0, y: Math.sin(t) * h };
        };
        Wave.rotate = function (t) {
            return { r: 360 * t / Math.PI / 2 };
        };
        Wave.shake = function (angle, t) {
            angle = angle || 10;
            return { r: Math.sin(t * 2) * angle };
        };
        Wave.breath = function (scale, t) {
            return { sx: Math.sin(t) * scale + 1, sy: -Math.sin(t + Math.PI / 4) * scale + 1 };
        };
        return Wave;
    }());
    basic.Wave = Wave;
    __reflect(Wave.prototype, "basic.Wave", ["basic.IAnimation"]);
})(basic || (basic = {}));
