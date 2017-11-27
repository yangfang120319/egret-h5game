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
 * @步骤4
 *
 */
var SceneStep4 = (function (_super) {
    __extends(SceneStep4, _super);
    //定义界面
    function SceneStep4() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "这里看起来已经荒废很久了，最近貌似也没有任何人在这生活过的痕迹。",
            "哼，有点意思，没有什么比在这种鸟不生蛋的多地方找一个离家出走的小女孩更适合打发时间的了。",
            "先看看厅内有什么线索吧。"
        ];
        //定义界面
        _this.skinName = SceneStep4Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this));
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.btn_open1, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask_hei, _this.numChildren - 1);
        _this.setChildIndex(_this.btn_open0, _this.numChildren - 1);
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        _this.btn_open0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn0, _this);
        _this.btn_open1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn1, _this);
        return _this;
    }
    //注册侦听
    SceneStep4.prototype.beforeShow = function (params) {
        //初始化显示
        this.monolog.visible = false;
        this.btn_open0.visible = true;
        this.btn_next.visible = false;
        this.img_mask_hei.alpha = 0.8;
        this.btn_open1.visible = false;
        this.img_mask_hei.visible = true;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide();
        //发送消息
        if (LoaderData.is_part_LoadEnd[1] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART, { "part_num": 3 });
        }
    };
    //开门按钮
    SceneStep4.prototype.onOpenBtn0 = function (e) {
        var _this = this;
        //隐藏界面
        this.btn_open0.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //隐藏着找
        Action_Other.changeAlpha(0.8, 0, 500, this.img_mask_hei, 0, function () {
            //显示提示文本
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //显示独白
                _this.monolog.startAction();
            });
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
        });
    };
    //结束界面
    SceneStep4.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //隐藏对话框
        this.monolog.visible = false;
        //显示按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_open1);
    };
    //开门按钮
    SceneStep4.prototype.onOpenBtn1 = function (e) {
        //隐藏界面
        this.btn_open1.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP5);
        });
    };
    //下一步按钮
    SceneStep4.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep4;
}(basic.SceneBase));
__reflect(SceneStep4.prototype, "SceneStep4");
//# sourceMappingURL=SceneStep4.js.map