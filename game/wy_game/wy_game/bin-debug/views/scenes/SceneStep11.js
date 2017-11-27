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
var SceneStep11 = (function (_super) {
    __extends(SceneStep11, _super);
    //定义界面
    function SceneStep11() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "**：361X8⋯⋯虽然暂时不知道这串数字代表什么，姑且先记下吧。",
            "**：桌上的这几本书可能会留下些什么，那串数字说不定代表的是这几本书的页码？还是让我来看看吧。",
            "圣经→唔，虽然《圣经》的确常被用来传递密信，但这本书看上去和这串数字之间并没有什么直接联系。",
            "辞海→感觉这本也不对，这本书的词汇不太容易传递一般消息，所以基本可以排除掉。",
            "月光→我想就是它了！就是这本月光！这房间里放着钢琴一定是有原因的。月光⋯⋯月光，这数字代表的或许是贝多芬的《月光奏鸣曲》的前奏？！",
            "**根据记忆弹奏起来，前奏过后，一面墙壁突然翻转，变成了书架。",
            "...",
            "真相只有一个，而我看起来已经离它不远了！",
            " ",
            "资料内容慢慢浮现了出来",
            "从前，美国有个叫莫纳本的小镇（**：这个小镇的名字我好像在哪），这个地方最出名的事情就是经常有人失踪。可是和一般失踪案不同的是，这个地方的失踪上到拄着拐的老人，下到还在哺乳期的孩子，都是死不见尸的失踪⋯⋯这些事件困扰了当地的警员和侦探很多年，迟迟没有破案。",
            "那么，幕后黑手究竟是谁呢？许多老人说，幕后黑手不是人类，是一种超自然的力量：邪灵、使魔、恶灵、幽灵、处刑者，总之都说得非常玄乎⋯⋯",
            "而它们为什么要这么做呢？",
            "那是因为它们渴望通过献祭的形式从人类的灵魂中得到⋯⋯",
            "“永生”，几乎是翻页的同时，**喃喃说道。不过似乎他自己也没有注意到这一点。",
            " ",
            "正当**想继续看下去的时候，突然感觉自己的脑后受到了重击，于是便失去了知觉⋯⋯在梦里，**又遇到了许多陌生人，但是奇怪的是，这些陌生人看到自己像见了鬼一样跑开了。",
            "**感到非常疑惑，打量了一下自己却发现自己手里赫然拿着一把沾满鲜血的剪刀，而自己的脚下躺着一个满身是血的男人⋯⋯"
        ];
        //定义界面
        _this.skinName = SceneStep11Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this), null, _this.stopMonolog.bind(_this));
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_open0, _this.numChildren - 1);
        _this.setChildIndex(_this.btn_open1, _this.numChildren - 1);
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        _this.btn_open0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn0, _this);
        _this.btn_open1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn1, _this);
        return _this;
    }
    //注册侦听
    SceneStep11.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.monolog.visible = false;
        this.btn_next.visible = false;
        this.btn_open0.visible = false;
        this.btn_open1.visible = false;
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
    SceneStep11.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP12);
        });
    };
    //打开按钮
    SceneStep11.prototype.onOpenBtn0 = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //隐藏按钮
        this.btn_open0.visible = false;
        //显示对话
        this.monolog.visible = true;
        //开始独白
        this.monolog.startAction();
        //显示按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_next);
    };
    //打开按钮
    SceneStep11.prototype.onOpenBtn1 = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //隐藏按钮
        this.btn_open1.visible = false;
        //显示对话
        this.monolog.visible = true;
        //开始独白
        this.monolog.startAction();
        //显示按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_next);
    };
    //停止动画
    SceneStep11.prototype.stopMonolog = function () {
        //判断显示按钮
        if (this.monolog.now_show == 2) {
            //隐藏按钮
            this.btn_next.visible = false;
            //隐藏对话
            this.monolog.visible = false;
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, this.btn_open0);
        }
        else if (this.monolog.now_show == 5) {
            //隐藏按钮
            this.btn_next.visible = false;
            //隐藏对话
            this.monolog.visible = false;
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, this.btn_open1);
        }
        else {
            //开始独白
            this.monolog.startAction();
        }
    };
    //下一步按钮
    SceneStep11.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.monolog.now_show == 2) {
            //停止独白
            this.monolog.stop();
            //隐藏按钮
            this.btn_next.visible = false;
            //隐藏对话
            this.monolog.visible = false;
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, this.btn_open0);
        }
        else if (this.monolog.now_show == 5) {
            //停止独白
            this.monolog.stop();
            //隐藏按钮
            this.btn_next.visible = false;
            //隐藏对话
            this.monolog.visible = false;
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, this.btn_open1);
        }
        else {
            //开始独白
            this.monolog.startAction();
        }
    };
    return SceneStep11;
}(basic.SceneBase));
__reflect(SceneStep11.prototype, "SceneStep11");
//# sourceMappingURL=SceneStep11.js.map