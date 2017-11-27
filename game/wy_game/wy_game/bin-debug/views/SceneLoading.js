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
 * @加载界面
 *
 */
var SceneLoading = (function (_super) {
    __extends(SceneLoading, _super);
    //定义界面
    function SceneLoading() {
        var _this = _super.call(this) || this;
        _this.txt_tips = [];
        _this.now_text = 0;
        //定义界面
        _this.skinName = SceneLoadingSkin;
        //数据复制
        _this.img_logo.alpha = 0;
        _this.btn_start.alpha = 0;
        _this.g_tips.visible = false;
        _this.btn_next.visible = false;
        _this.txt_tips_title.alpha = 0;
        for (var i = 0; i < 3; i++) {
            //定义变量
            var now_txt = _this["txt_tips" + i];
            //数据赋值
            _this.txt_tips[i] = now_txt;
            _this.txt_tips[i].alpha = 0;
        }
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        _this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onStartBtn, _this);
        return _this;
    }
    //注册侦听
    SceneLoading.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示logo
            Action_Other.changeAlpha(0, 1, 1500, _this.img_logo, 200, function () {
                Action_Other.changeAlpha(0, 1, 1500, _this.txt_tips_title, 200, function () {
                    //显示开始按钮
                    Action_Other.changeAlpha(0, 1, 1000, _this.btn_start, 200);
                });
            });
        });
        //发送消息
        if (LoaderData.is_part_LoadEnd[1] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART, { "part_num": 1 });
        }
    };
    //显示提示文本
    SceneLoading.prototype.showText = function () {
        var _this = this;
        //显示动画
        if (this.now_text < 3) {
            var _tween_txt_alpha = egret.Tween.get(this.txt_tips[this.now_text])
                .to({ alpha: 1 }, 600)
                .wait(200).call(function () {
                //数据赋值
                _this.now_text += 1;
                //显示文本
                _this.showText();
            });
        }
        else {
            //显示下一页按钮
            Action_Other.changeAlpha(0, 1, 500, this.btn_next);
        }
    };
    //开始按钮
    SceneLoading.prototype.onStartBtn = function (e) {
        var _this = this;
        //隐藏按钮
        this.btn_start.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            _this.g_tips.visible = true;
            //显示提示文本
            _this.showText();
        });
    };
    //下一步按钮
    SceneLoading.prototype.onNextBtn = function (e) {
        //隐藏按钮
        this.btn_next.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (LoaderData.is_part_LoadEnd[1] == true) {
            //隐藏提示
            Action_Other.changeAlpha(1, 0, 500, this.g_tips, 0, function () {
                //移出动画
                basic.SceneManager.show(SceneNames.STEP1);
            });
        }
        else {
            //显示等待界面
            basic.SceneManager.addTopScene(SceneNames.WAITING);
            //注册事件
            this.addEventListener(egret.Event.ENTER_FRAME, this.onCheckShow, this);
        }
    };
    //检查是否可以显示
    SceneLoading.prototype.onCheckShow = function (e) {
        //判断显示
        if (LoaderData.is_part_LoadEnd[1] == true) {
            //注销事件
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onCheckShow, this);
            //移出等待界面
            basic.SceneManager.removeTopScene(SceneNames.WAITING);
            //隐藏提示
            Action_Other.changeAlpha(1, 0, 500, this.g_tips, 0, function () {
                //移出动画
                basic.SceneManager.show(SceneNames.STEP1);
            });
        }
    };
    return SceneLoading;
}(basic.SceneBase));
__reflect(SceneLoading.prototype, "SceneLoading");
//# sourceMappingURL=SceneLoading.js.map