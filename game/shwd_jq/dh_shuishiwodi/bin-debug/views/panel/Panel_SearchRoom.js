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
 * @搜索房间
 *
 */
var Panel_SearchRoom = (function (_super) {
    __extends(Panel_SearchRoom, _super);
    //定义界面
    function Panel_SearchRoom() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.btn_num = [];
        //数据变量
        _this.btnnum = [];
        return _this;
    }
    Object.defineProperty(Panel_SearchRoom, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_SearchRoom();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化界面
    Panel_SearchRoom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义皮肤
        this.skinName = Panel_SearchRoomSkin;
        //数据赋值
        for (var j = 0; j < 10; j++) {
            //定义变量
            var now_btn = this["btn_num" + j];
            //数据赋值
            this.btn_num[j] = now_btn;
            //注册按钮
            this.btn_num[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //定义按钮
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtn, this);
        this.btn_repeat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepeatBtn, this);
    };
    //显示界面
    Panel_SearchRoom.prototype.show = function () {
        //定义变量
        var ratezoom;
        //显示界面
        this.popup(this.funExit.bind(this));
        //初始化数据
        this.btnnum = [];
        //显示文本
        this.blChange();
        //判断显示大小
        if (basic.StageProxy.height < 880) {
            ratezoom = (basic.StageProxy.height - 30) / 850;
        }
        else {
            ratezoom = 1;
        }
        //显示大小
        this.g_detail.scaleX = ratezoom;
        this.g_detail.scaleY = ratezoom;
    };
    //退出函数
    Panel_SearchRoom.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //数字按钮变化
    Panel_SearchRoom.prototype.onChooseBtn = function (e) {
        //定义变量
        var btn_num = String(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        if (this.btnnum.length < 6) {
            this.btnnum.push(btn_num);
        }
        //显示文本
        this.blChange();
    };
    //进入房间
    Panel_SearchRoom.prototype.onEnterBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断进入
        if (this.btnnum.length == 6) {
            //数据复制
            GameData.Room_Id = this.btnnum.join("");
            //发送消息
            Comm.instance.sendSocket({ "type": "joinRoom", "roomId": GameData.Room_Id });
            //退出函数
            this.funExit();
        }
        else {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "需要输入六位房间号" });
        }
    };
    //重输
    Panel_SearchRoom.prototype.onRepeatBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //初始化数据
        this.btnnum = [];
        //显示文本
        this.blChange();
    };
    //输入数组变化
    Panel_SearchRoom.prototype.blChange = function () {
        //判断显示
        this.bl_num.text = this.btnnum.join("");
    };
    return Panel_SearchRoom;
}(basic.PanelBase));
__reflect(Panel_SearchRoom.prototype, "Panel_SearchRoom");
