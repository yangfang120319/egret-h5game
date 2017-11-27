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
var SceneStep13 = (function (_super) {
    __extends(SceneStep13, _super);
    //定义界面
    function SceneStep13() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "警察：你好，请问您是这家人家的主人么？",
            "**：不，事实上，这家里的人都莫名失踪了，而我是受雇前来的私家侦探。",
            "警察：竟然有这种事？我是警察，这是我的证件。而旁边这家伙就是最近经常出没的惯偷，今天在作案的时候被我逮着了。但在押送他回去的时候，胎被路边的树枝扎破了。原本只是想路过此地借点修理工具，没想到居然发生了这种事情？",
            "小偷：长官，这可是天大的误会啊。我可不认识你说的那个什么惯犯。我今天可是第一次啊，而且我这不什么都没有偷到么，最多算偷窃未遂。",
            "警察：让你说话了么！给我老实点！",
            "小偷：是，长官。那能否请你再给我一支烟呢？",
            "**：很可惜，我并不是这里的主人并不知道东西放在哪。",
            "医生：汽车的修理工具么？之前来的时候我好像在哪里见过，貌似在地下室。情况特殊，先随我去取吧。"
        ];
        //定义界面
        _this.skinName = SceneStep13Skin;
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
    SceneStep13.prototype.beforeShow = function (params) {
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
            _this.com_person.currentState = "1";
            Action_Other.changeAlpha(0, 1, 500, _this.com_person);
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep13.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP14);
        });
    };
    //停止动画
    SceneStep13.prototype.stopMonolog = function () {
    };
    //下一步按钮
    SceneStep13.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示按钮
        if (this.monolog.now_show == 1) {
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if (this.monolog.now_show == 2) {
            this.com_person.visible = true;
            this.com_person.currentState = "1";
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
            this.com_person.currentState = "2";
        }
        else if (this.monolog.now_show == 6) {
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if (this.monolog.now_show == 7) {
            this.com_person.visible = true;
            this.com_person.currentState = "0";
        }
        else {
            this.com_person.visible = false;
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep13;
}(basic.SceneBase));
__reflect(SceneStep13.prototype, "SceneStep13");
//# sourceMappingURL=SceneStep13.js.map