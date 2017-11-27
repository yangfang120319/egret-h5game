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
 * @步骤3
 *
 */
var SceneStep3 = (function (_super) {
    __extends(SceneStep3, _super);
    //定义界面
    function SceneStep3() {
        var _this = _super.call(this) || this;
        _this.detail0 = [
            "经过了一条砾石铺成的小径，穿过了一片荒芜的空地，一栋古旧的庄园出现在面前。",
            "来到别墅门口，发现大门紧闭，已经飘起了雨，并且远处传有雷声，预示着不久之后有强暴雨来临..."
        ];
        _this.detail1 = [
            "咚咚〜咚咚〜，咚咚〜咚咚〜",
            "看来并不会有人来欢迎了，但我可不想被雨淋，得赶紧找办法进去。",
            "破门而入,翻窗而入,研究门把",
            "管不了这么多了，总之先进屋调查一下吧"
        ];
        _this.detail2 = [
            "咚咚〜咚咚〜，咚咚〜咚咚〜",
            "看来并不会有人来欢迎了，但我可不想被雨淋，得赶紧找办法进去。",
            "破门而入,翻窗而入,研究门把",
            "虽然不太礼貌，但现在这个情况我也只好…"
        ];
        _this.detail3 = [
            "咚咚〜咚咚〜，咚咚〜咚咚〜",
            "看来并不会有人来欢迎了，但我可不想被雨淋，得赶紧找办法进去。",
            "破门而入,翻窗而入,研究门把",
            "这门锁虽然已经不多见了，不过以我的手法稍微花点时间也还是能打开的。"
        ];
        //定义界面
        _this.skinName = SceneStep3Skin;
        //定义变量
        var monolog_data0 = {};
        var monolog_data1 = {};
        //数据赋值
        monolog_data0["detail_text"] = _this.detail0;
        monolog_data1["detail_text"] = _this.detail1;
        monolog_data0["detail_type"] = [0, 0];
        monolog_data1["detail_type"] = [0, 0, 1, 0];
        //定义独白
        _this.monolog0 = new Monolog(_this.over.bind(_this), null, _this.stopcallback.bind(_this));
        _this.monolog1 = new Monolog(_this.over.bind(_this), _this.btnchange.bind(_this));
        _this.monolog0.show(monolog_data0);
        _this.monolog1.show(monolog_data1);
        //显示界面
        _this.addChild(_this.monolog0);
        _this.addChild(_this.monolog1);
        //定义最上层
        _this.setChildIndex(_this.btn_open, _this.numChildren - 1);
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn, _this);
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep3.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        UserData.User_Choose[0] = -1;
        this.btn_open.visible = false;
        this.btn_next.visible = false;
        this.monolog0.visible = false;
        this.monolog1.visible = false;
        //定义位置
        this.monolog0.x = (basic.StageProxy.width - this.monolog0.width) / 2;
        this.monolog0.y = basic.StageProxy.height - this.monolog0.height - 150;
        this.monolog1.x = (basic.StageProxy.width - this.monolog1.width) / 2;
        this.monolog1.y = basic.StageProxy.height - this.monolog1.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示提示文本
            Action_Other.changeAlpha(0, 1, 500, _this.monolog0, 0, function () {
                //显示文本独白
                _this.monolog0.startAction();
            });
        });
    };
    //开门按钮
    SceneStep3.prototype.onOpenBtn = function (e) {
        var _this = this;
        //隐藏界面
        this.monolog0.stop();
        this.btn_open.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_click_mp3");
        //显示开门按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_next, 200);
        //显示选择
        Action_Other.changeAlpha(0, 1, 500, this.monolog1, 0, function () {
            //开始动画
            _this.monolog1.startAction();
        });
    };
    //结束动画
    SceneStep3.prototype.over = function () {
        //判断显示
        if (this.monolog0.visible == true) {
            //隐藏按钮
            this.btn_next.visible = false;
            //隐藏对话
            this.monolog0.visible = false;
            //显示开门按钮
            Action_Other.changeAlpha(0, 1, 500, this.btn_open);
        }
        else {
            //隐藏按钮
            this.btn_next.visible = false;
            //显示遮罩
            this.mask_action.show(function () {
                //显示界面
                basic.SceneManager.show(SceneNames.STEP4);
            });
        }
    };
    //按钮改变
    SceneStep3.prototype.btnchange = function () {
        var _this = this;
        //数据赋值
        UserData.User_Choose[0] = this.monolog1.now_choose;
        //判断显示
        if (this.monolog1.detail_type[this.monolog1.now_show] == 1) {
            //隐藏按钮
            this.btn_next.enabled = false;
            Action_Other.changeAlpha(1, 0, 500, this.btn_next, 0, function () {
                _this.btn_next.enabled = true;
            });
        }
        else {
            if (this.btn_next.visible == false) {
                //显示按钮
                Action_Other.changeAlpha(0, 1, 500, this.btn_next);
            }
        }
    };
    //停止下一步
    SceneStep3.prototype.stopcallback = function () {
        //判断播放雷声
        if (this.monolog0.now_show == 1) {
            this.playLeiSound();
        }
        //开始独白
        this.monolog0.startAction();
    };
    //播放雷声
    SceneStep3.prototype.playLeiSound = function () {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_lei_mp3");
        //继续播放
        setTimeout(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_lei_mp3");
            //继续播放
            setTimeout(function () {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_lei_mp3");
            }, 1500);
        }, 2000);
    };
    //下一步按钮
    SceneStep3.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断开始
        if (this.monolog0.visible == true) {
            //判断播放雷声
            if (this.monolog0.now_show == 1) {
                this.playLeiSound();
            }
            //开始动画
            this.monolog0.startAction();
        }
        else {
            //判断显示下一个
            if (this.monolog1.detail_type[this.monolog1.now_show - 1] == 1) {
                //移除界面
                this.monolog1.clean();
                //定义变量
                var monolog_data = {};
                //数据赋值
                if (UserData.User_Choose[0] == 0) {
                    monolog_data["detail_text"] = this.detail1;
                    monolog_data["detail_type"] = [0, 0, 1, 0];
                    ;
                }
                else if (UserData.User_Choose[0] == 1) {
                    monolog_data["detail_text"] = this.detail2;
                    monolog_data["detail_type"] = [0, 0, 1, 0];
                    ;
                }
                else {
                    monolog_data["detail_text"] = this.detail3;
                    monolog_data["detail_type"] = [0, 0, 1, 0];
                    ;
                }
                //显示界面
                this.monolog1.show(monolog_data, this.monolog1.now_show);
            }
            //开始动画
            this.monolog1.startAction();
        }
    };
    return SceneStep3;
}(basic.SceneBase));
__reflect(SceneStep3.prototype, "SceneStep3");
//# sourceMappingURL=SceneStep3.js.map