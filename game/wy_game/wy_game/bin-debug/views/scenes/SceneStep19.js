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
 * @步骤17
 *
 */
var SceneStep19 = (function (_super) {
    __extends(SceneStep19, _super);
    //定义界面
    function SceneStep19() {
        var _this = _super.call(this) || this;
        _this.detail0 = [
            "因为路被堵死了，警察把召集所有人召集在一起。",
            "女演员：怎么回事？",
            "医生：唔，从死者的伤口来看，应该是昨天半夜里的事情，死因是被利器穿胸。",
            "女演员：长官，我们还是快点离开这里吧？",
            "警察：少废话，现在我们四个人都有作案的嫌疑，现在大家都说说自己昨晚干了些什么！",
            "警察：首先尸体是我发现的，不过我昨天除了凌晨用了次该死的马桶之外，就一直在睡觉。",
            "女演员：我昨天一直呆在房间里。",
            "医生：我昨天很早就睡下了，而且我睡的床有点问题，我下床的话旁边的侦探先生一定会听到的。",
            "**：的确，昨天我睡得很沉，没有发现什么异常。",
            "**一行再次回到地下室调查尸体。"
        ];
        _this.detail1 = [
            "因为路被堵死了，警察把召集所有人召集在一起。",
            "小偷：我的妈呀，这房子闹鬼了么？",
            "医生：唔，从死者的伤口来看，应该是昨天半夜里的事情，死因是被利器穿胸。",
            "小偷：长官，我们还是快点离开这里吧？",
            "警察：少废话，现在我们四个人都有作案的嫌疑，现在大家都说说自己昨晚干了些什么！",
            "警察：首先尸体是我发现的，不过我昨天除了凌晨用了次该死的马桶之外，就一直在睡觉。",
            "小偷：你们别这么看着我啊，先声明不是我，我整晚一直被铐在卫生间的铁管旁，觉都没怎么睡。",
            "医生：我昨天很早就睡下了，而且我睡的床有点问题，我下床的话旁边的侦探先生一定会听到的。",
            "**：的确，昨天我睡得很沉，没有发现什么异常。",
            "**一行再次回到地下室调查尸体。"
        ];
        //定义界面
        _this.skinName = SceneStep17Skin;
        //定义遮罩
        _this.rect_mask.visible = true;
        _this.com_person.mask = _this.rect_mask;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep19.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step4_jpg";
        //定义变量
        var monolog_data = {};
        //数据赋值
        if (UserData.User_Choose[3] == 0) {
            monolog_data["detail_text"] = this.detail0;
            monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else {
            monolog_data["detail_text"] = this.detail1;
            monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        //定义独白
        this.monolog = new Monolog(this.over.bind(this), this.btnchange.bind(this), this.stopMonolog.bind(this), 380);
        this.monolog.show(monolog_data);
        //显示界面
        this.addChild(this.monolog);
        this.monolog.visible = false;
        //定义最上层
        this.setChildIndex(this.btn_next, this.numChildren - 1);
        this.setChildIndex(this.img_mask, this.numChildren - 1);
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
    };
    //结束动画
    SceneStep19.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP20);
        });
    };
    //按钮改变
    SceneStep19.prototype.btnchange = function () {
        var _this = this;
        //数据赋值
        UserData.User_Choose[3] = this.monolog.now_choose;
        //判断显示
        if (this.monolog.detail_type[this.monolog.now_show] == 1) {
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
    //停止动画
    SceneStep19.prototype.stopMonolog = function () {
        //显示界面
        if (UserData.User_Choose[3] == 0) {
            if (this.monolog.now_show == 1) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
        }
        else {
            if (this.monolog.now_show == 1) {
                this.com_person.visible = true;
                this.com_person.currentState = "2";
            }
        }
        //判断显示
        if (this.monolog.now_show < 2) {
            //开始独白
            this.monolog.startAction();
        }
    };
    //下一步按钮
    SceneStep19.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示按钮
        if (UserData.User_Choose[3] == 0) {
            if (this.monolog.now_show == 1) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
            else if (this.monolog.now_show == 2) {
                this.com_person.visible = true;
                this.com_person.currentState = "0";
            }
            else if (this.monolog.now_show == 3) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
            else if (this.monolog.now_show == 4) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 5) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 6) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
            else if (this.monolog.now_show == 7) {
                this.com_person.visible = true;
                this.com_person.currentState = "0";
            }
            else if (this.monolog.now_show == 8) {
                this.com_person.visible = true;
                this.com_person.currentState = "4";
            }
            else {
                this.com_person.visible = false;
            }
        }
        else {
            if (this.monolog.now_show == 1) {
                this.com_person.visible = true;
                this.com_person.currentState = "2";
            }
            else if (this.monolog.now_show == 2) {
                this.com_person.visible = true;
                this.com_person.currentState = "0";
            }
            else if (this.monolog.now_show == 3) {
                this.com_person.visible = true;
                this.com_person.currentState = "2";
            }
            else if (this.monolog.now_show == 4) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 5) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 6) {
                this.com_person.visible = true;
                this.com_person.currentState = "2";
            }
            else if (this.monolog.now_show == 7) {
                this.com_person.visible = true;
                this.com_person.currentState = "0";
            }
            else if (this.monolog.now_show == 8) {
                this.com_person.visible = true;
                this.com_person.currentState = "4";
            }
            else {
                this.com_person.visible = false;
            }
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep19;
}(basic.SceneBase));
__reflect(SceneStep19.prototype, "SceneStep19");
//# sourceMappingURL=SceneStep19.js.map