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
 * @选择头像
 *
 */
var Panel_ChooseHead = (function (_super) {
    __extends(Panel_ChooseHead, _super);
    //定义界面
    function Panel_ChooseHead() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.head = [];
        _this.btn_choose = [];
        return _this;
    }
    Object.defineProperty(Panel_ChooseHead, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_ChooseHead();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_ChooseHead.prototype.init = function () {
        this.skinName = Panel_ChooseHeadSkin;
    };
    //初始化界面
    Panel_ChooseHead.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //显示界面
    Panel_ChooseHead.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //数据赋值
        for (var j = 0; j < 30; j++) {
            //定义变量
            var now_head = this["head" + j];
            var now_btn = this["btn_choose" + j];
            //数据赋值
            this.head[j] = now_head;
            this.btn_choose[j] = now_btn;
            this.head[j].show("icon_head" + j + "_jpg");
            //注册按钮
            this.btn_choose[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //显示界面
        for (var i = 0; i < 30; i++) {
            if (UserData.User_Head == "icon_head" + i + "_jpg") {
                this.img_choose0.visible = true;
                this.img_choose1.visible = true;
                this.img_choose0.x = this.head[i].x - 24;
                this.img_choose0.y = this.head[i].y - 26;
                this.img_choose1.x = this.head[i].x - 24;
                this.img_choose1.y = this.head[i].y - 26;
                break;
            }
        }
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    Panel_ChooseHead.prototype.funExit = function () {
        //注销
        for (var j = 0; j < 9; j++) {
            //注销按钮
            this.btn_choose[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //退出事件
        this.dealAction();
    };
    //选择按钮
    Panel_ChooseHead.prototype.onChooseBtn = function (e) {
        //定义变量
        var btn_num = Number(e.target.name);
        //数据赋值
        UserData.User_Head = "icon_head" + btn_num.toString() + "_jpg";
        //上传消息
        Comm.instance.sendSocket({ "type": "changeHead", "head": UserData.User_Head });
        //退出界面
        this.funExit();
    };
    return Panel_ChooseHead;
}(basic.PanelBase));
__reflect(Panel_ChooseHead.prototype, "Panel_ChooseHead");
//# sourceMappingURL=Panel_ChooseHead.js.map