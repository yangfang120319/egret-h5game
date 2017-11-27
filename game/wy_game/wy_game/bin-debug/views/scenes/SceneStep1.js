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
 * @步骤1
 *
 */
var SceneStep1 = (function (_super) {
    __extends(SceneStep1, _super);
    //定义界面
    function SceneStep1() {
        var _this = _super.call(this) || this;
        _this.detail_start = "我的名字⋯是⋯____（点击输入）";
        _this.detail = "我叫**，曾凭着自撰小说名噪一时，不过因为某个事件失去了一部分记忆之后，不知为何就再也写不出能卖的东西了，现在的我只是个潦倒的私家侦探而已。";
        _this.now_step = 0;
        //定义界面
        _this.skinName = SceneStep1Skin;
        //定义变量
        var monolog_data = {};
        var monolog_data1 = {};
        //数据赋值
        monolog_data["detail_text"] = [_this.detail_start];
        monolog_data1["detail_text"] = [_this.detail];
        monolog_data["detail_type"] = [0];
        monolog_data1["detail_type"] = [0];
        //定义独白
        _this.monolog1 = new Monolog(_this.over.bind(_this));
        _this.monolog = new Monolog(_this.over.bind(_this), null, _this.stopCallback.bind(_this), 800, 360);
        _this.monolog1.show(monolog_data1);
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        _this.addChild(_this.monolog1);
        //定义最上层
        _this.btn_open.visible = false;
        _this.setChildIndex(_this.btn_open, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn, _this);
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep1.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.monolog.visible = false;
        this.monolog1.visible = false;
        this.btn_next.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog1.x = (basic.StageProxy.width - this.monolog1.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        this.monolog1.y = basic.StageProxy.height - this.monolog1.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示内容
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 200, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
        //发送消息
        if (LoaderData.is_part_LoadEnd[2] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART, { "part_num": 2 });
        }
        //播放声音
        basic.SoundManager.instance.playMusic("sound_back_mp3");
    };
    //注销侦听
    SceneStep1.prototype.beforeHide = function () {
    };
    //停止回调
    SceneStep1.prototype.stopCallback = function () {
        //显示Open按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_open, 200);
    };
    //结束动画
    SceneStep1.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP2);
        });
    };
    //下一步按钮
    SceneStep1.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始独白
        this.monolog1.startAction();
    };
    //打开按钮
    SceneStep1.prototype.onOpenBtn = function (e) {
        var _this = this;
        //隐藏按钮
        this.monolog.visible = false;
        this.btn_open.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示对话框
        PanelNickName.instance.show(function () {
            //显示内容
            Action_Other.changeAlpha(0, 1, 500, _this.monolog1, 200, function () {
                //开始独白
                _this.monolog1.startAction();
            });
            //显示下一步按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next, 200);
        });
    };
    return SceneStep1;
}(basic.SceneBase));
__reflect(SceneStep1.prototype, "SceneStep1");
//# sourceMappingURL=SceneStep1.js.map