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
 * @步骤9
 *
 */
var SceneStep12 = (function (_super) {
    __extends(SceneStep12, _super);
    //定义界面
    function SceneStep12() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "医生：喂，醒醒，你还好吗？",
            "**：额⋯⋯头好痛，你是？",
            "医生：我是一名私人医生，看完诊回来的途中下起了雨，于是便想进来躲一躲。可进门一看却发现一个人也没有。接着就在二楼发现了一片血迹和昏迷的你，差点还以为你⋯⋯话说回来，这里到底发生了什么，这家人都到哪里去了。先生你又是哪位？",
            "**：你好，先生。我是受邀前来调查此次绑架案的私家侦探，我叫**。我来的时候这里已经是一座空宅了，在我调查情况的时候突然被谁从背后偷袭了。接下来的事情你应该都知道了⋯⋯",
            "医生：原来如此，接下来我们该怎么办？",
            " ",
            "**看了下自己脚下的笔记还在，但是明显有一页被撕毁的痕迹。",
            "此时门外又传来了敲门声，**开门一看，发现是一名警察和一个手被铐着的小偷。"
        ];
        //定义界面
        _this.skinName = SceneStep12Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this), null, _this.stopMonolog.bind(_this), 380);
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //定义遮罩
        _this.rect_mask.visible = true;
        _this.com_person.mask = _this.rect_mask;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep12.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.monolog.visible = false;
        this.btn_next.visible = false;
        this.com_person.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示人物
            _this.com_person.currentState = "0";
            Action_Other.changeAlpha(0, 1, 500, _this.com_person);
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_ys_w_mp3");
                //开始独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep12.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP13);
        });
    };
    //停止动画
    SceneStep12.prototype.stopMonolog = function () {
        //开始独白
        if (this.monolog.now_show > 5) {
            this.monolog.startAction();
        }
    };
    //下一步按钮
    SceneStep12.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示按钮
        if (this.monolog.now_show == 1) {
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if (this.monolog.now_show == 2) {
            this.com_person.visible = true;
            this.com_person.currentState = "0";
        }
        else if (this.monolog.now_show == 3) {
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if (this.monolog.now_show == 4) {
            this.com_person.visible = true;
            this.com_person.currentState = "0";
        }
        else {
            this.com_person.visible = false;
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep12;
}(basic.SceneBase));
__reflect(SceneStep12.prototype, "SceneStep12");
//# sourceMappingURL=SceneStep12.js.map