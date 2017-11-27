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
var SceneStep10 = (function (_super) {
    __extends(SceneStep10, _super);
    //定义界面
    function SceneStep10() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "**：这层楼似乎只有这几个房间，先调查下最外侧这个房间吧。",
            "门锁住了，似乎需要钥匙....",
            "**突然想起自己在楼下发现的钥匙，试了一下。"
        ];
        //定义界面
        _this.skinName = SceneStep10Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this));
        ;
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_open, _this.numChildren - 1);
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        _this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep10.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.monolog.visible = false;
        this.btn_next.visible = false;
        this.btn_open.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
        //发送消息
        if (LoaderData.is_part_LoadEnd[3] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART, { "part_num": 3 });
        }
    };
    //结束动画
    SceneStep10.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //隐藏对话
        this.monolog.visible = false;
        //显示按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_open);
    };
    //打开按钮
    SceneStep10.prototype.onOpenBtn = function (e) {
        //隐藏按钮
        this.btn_open.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP11);
        });
    };
    //下一步按钮
    SceneStep10.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep10;
}(basic.SceneBase));
__reflect(SceneStep10.prototype, "SceneStep10");
//# sourceMappingURL=SceneStep10.js.map