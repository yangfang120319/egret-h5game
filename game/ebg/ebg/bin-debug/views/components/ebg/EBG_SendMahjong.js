var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @二八杠-发送麻将
 *
 */
var EBG_SendMahjong = (function (_super) {
    __extends(EBG_SendMahjong, _super);
    function EBG_SendMahjong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.table_y = [];
        _this.g_mahjong = [];
        _this.img_mahjong = [];
        _this.send_to_x = [];
        _this.send_to_y = [];
        return _this;
    }
    //初始化
    EBG_SendMahjong.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 4; i++) {
            //定义变量
            var g_mah = this["g_mahjong" + i];
            var img_mah = this["img_mahjong" + i];
            //数据赋值
            this.g_mahjong[i] = g_mah;
            this.img_mahjong[i] = img_mah;
        }
        //console.info(33);
        //清除界面
        this.clean();
    };
    //初始化界面
    EBG_SendMahjong.prototype.info = function (_to_x, _to_y) {
        //数据赋值
        this.send_to_x = _to_x;
        this.send_to_y = _to_y;
    };
    //清除界面
    EBG_SendMahjong.prototype.clean = function () {
        //清除界面
        for (var i = 0; i < 4; i++) {
            this.img_mahjong[i].x = 0;
            this.img_mahjong[i].y = 0;
            this.g_mahjong[i].y = 105;
            this.g_mahjong[i].scaleX = 0.5;
            this.g_mahjong[i].scaleY = 0.5;
            this.g_mahjong[i].visible = false;
            this.g_mahjong[i].x = (basic.StageProxy.width - 135) / 2 + i * 33;
        }
    };
    //开始发牌
    EBG_SendMahjong.prototype.start = function () {
        //清除界面
        this.clean();
        //显示牌动画
        if (GameData.EBG_Game_Status == 2) {
            this.showMahjong();
        }
    };
    //显示牌动画
    EBG_SendMahjong.prototype.showMahjong = function () {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend1_mp3");
        //显示界面
        for (var i = 0; i < 4; i++) {
            this.g_mahjong[i].alpha = 0;
            this.g_mahjong[i].visible = true;
        }
        //开始动画
        var _tween_alpha0 = egret.Tween.get(this.g_mahjong[0]).to({ alpha: 1 }, 100);
        var _tween_alpha1 = egret.Tween.get(this.g_mahjong[1]).to({ alpha: 1 }, 100);
        var _tween_alpha2 = egret.Tween.get(this.g_mahjong[2]).to({ alpha: 1 }, 100);
        var _tween_alpha3 = egret.Tween.get(this.g_mahjong[3]).to({ alpha: 1 }, 100);
        var _tween_y0 = egret.Tween.get(this.g_mahjong[0]).to({ y: 265 }, 300);
        var _tween_y1 = egret.Tween.get(this.g_mahjong[1]).to({ y: 265 }, 300);
        var _tween_y2 = egret.Tween.get(this.g_mahjong[2]).to({ y: 265 }, 300);
        var _tween_y3 = egret.Tween.get(this.g_mahjong[3]).to({ y: 265 }, 300).wait(300).call(function () {
            if (GameData.EBG_Game_Status != 2) {
                //清除界面
                _this.clean();
            }
            else {
                //发送第一张
                _this.sendMahjong0();
            }
        });
    };
    //发送第一张桌子
    EBG_SendMahjong.prototype.sendMahjong0 = function () {
        var _this = this;
        //显示最上层
        this.setChildIndex(this.g_mahjong[0], this.numChildren - 1);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");
        //开始动画
        var _tween_x = egret.Tween.get(this.g_mahjong[0]).to({ x: this.send_to_x[0] }, 400);
        var _tween_y = egret.Tween.get(this.g_mahjong[0]).to({ y: this.send_to_y[0] }, 400);
        var _tween_scaleX = egret.Tween.get(this.g_mahjong[0]).to({ scaleX: 1 }, 400);
        var _tween_scaleY = egret.Tween.get(this.g_mahjong[0]).to({ scaleY: 1 }, 400).wait(100).call(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");
            //显示动画
            var _tween_img_x = egret.Tween.get(_this.img_mahjong[0]).to({ x: 71 }, 150).call(function () {
                var _tween_img_y = egret.Tween.get(_this.img_mahjong[0]).to({ y: 20 }, 80).wait(300).call(function () {
                    if (GameData.EBG_Game_Status != 2) {
                        //清除界面
                        _this.clean();
                    }
                    else {
                        //发送第二张
                        _this.sendMahjong1();
                    }
                });
            });
        });
    };
    //发送第二张
    EBG_SendMahjong.prototype.sendMahjong1 = function () {
        var _this = this;
        //显示最上层
        this.setChildIndex(this.g_mahjong[1], this.numChildren - 1);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");
        //开始动画
        var _tween_x = egret.Tween.get(this.g_mahjong[1]).to({ x: this.send_to_x[1] }, 500);
        var _tween_y = egret.Tween.get(this.g_mahjong[1]).to({ y: this.send_to_y[1] }, 500);
        var _tween_scaleX = egret.Tween.get(this.g_mahjong[1]).to({ scaleX: 1 }, 500);
        var _tween_scaleY = egret.Tween.get(this.g_mahjong[1]).to({ scaleY: 1 }, 500).wait(100).call(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");
            //显示动画
            var _tween_img_x = egret.Tween.get(_this.img_mahjong[1]).to({ x: 71 }, 150).call(function () {
                var _tween_img_y = egret.Tween.get(_this.img_mahjong[1]).to({ y: 20 }, 80).wait(300).call(function () {
                    if (GameData.EBG_Game_Status != 2) {
                        //清除界面
                        _this.clean();
                    }
                    else {
                        //发送第三张
                        _this.sendMahjong2();
                    }
                });
            });
        });
    };
    //发送第二张
    EBG_SendMahjong.prototype.sendMahjong2 = function () {
        var _this = this;
        //显示最上层
        this.setChildIndex(this.g_mahjong[2], this.numChildren - 1);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");
        //开始动画
        var _tween_x = egret.Tween.get(this.g_mahjong[2]).to({ x: this.send_to_x[2] }, 400);
        var _tween_y = egret.Tween.get(this.g_mahjong[2]).to({ y: this.send_to_y[2] }, 400);
        var _tween_scaleX = egret.Tween.get(this.g_mahjong[2]).to({ scaleX: 1 }, 400);
        var _tween_scaleY = egret.Tween.get(this.g_mahjong[2]).to({ scaleY: 1 }, 400).wait(100).call(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");
            //显示动画
            var _tween_img_x = egret.Tween.get(_this.img_mahjong[2]).to({ x: 71 }, 150).call(function () {
                var _tween_img_y = egret.Tween.get(_this.img_mahjong[2]).to({ y: 20 }, 80).wait(300).call(function () {
                    if (GameData.EBG_Game_Status != 2) {
                        //清除界面
                        _this.clean();
                    }
                    else {
                        //发送第三张
                        _this.sendMahjong3();
                    }
                });
            });
        });
    };
    //发送第庄
    EBG_SendMahjong.prototype.sendMahjong3 = function () {
        var _this = this;
        //显示最上层
        this.setChildIndex(this.g_mahjong[3], this.numChildren - 1);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");
        //开始动画
        var _tween_x = egret.Tween.get(this.g_mahjong[3]).to({ x: this.send_to_x[3] }, 400);
        var _tween_y = egret.Tween.get(this.g_mahjong[3]).to({ y: this.send_to_y[3] }, 400);
        var _tween_scaleX = egret.Tween.get(this.g_mahjong[3]).to({ scaleX: 1 }, 400);
        var _tween_scaleY = egret.Tween.get(this.g_mahjong[3]).to({ scaleY: 1 }, 400).wait(100).call(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");
            //显示动画
            var _tween_img_x = egret.Tween.get(_this.img_mahjong[3]).to({ x: 71 }, 150).call(function () {
                var _tween_img_y = egret.Tween.get(_this.img_mahjong[3]).to({ y: 20 }, 80).call(function () {
                    if (GameData.EBG_Game_Status != 2) {
                        //清除界面
                        _this.clean();
                    }
                    else {
                        //清除麻将
                        _this.clean();
                        //发送消息
                        basic.Dispatcher.dispatch(EventNames.EBG_SEND_MAHJONGOVER);
                    }
                });
            });
        });
    };
    return EBG_SendMahjong;
}(eui.Component));
__reflect(EBG_SendMahjong.prototype, "EBG_SendMahjong");
//# sourceMappingURL=EBG_SendMahjong.js.map