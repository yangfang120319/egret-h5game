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
 * @步骤5
 *
 */
var SceneStep7 = (function (_super) {
    __extends(SceneStep7, _super);
    //定义界面
    function SceneStep7() {
        var _this = _super.call(this) || this;
        _this.detail0 = [
            "**：刚才我不是还在别墅么？这里是哪里？",
            "**一边摸索一边行进，突然近距离遭遇处刑者。",
            "**：“sh*t，这是什么鬼啊？不过瞧他这表情，看来“我”不跑就得死在这里了。”",
            "**：这家伙怎么回事？明明长得五大三粗的，怎么跑得这么快？在这样下去不妙啊，得赶紧跑到前面那个废墟找个地方躲起来才行。",
            "**：可恶，脚步声越来越近了？我该怎么办？",
            "屏住呼吸，不动声色,等他靠近之后，抓准时机偷袭他",
            "从刚才的种种行为来看，他的洞察能力并不敏锐。沉住气，等他走了再做打算。",
            "当**这么思考的时候，处刑者突然被远处的其他动静吸引走了。",
            "呼〜危机看来暂时解除了⋯⋯不对，什么声音？他又回来了么？",
            "黑影：嘘〜别紧张，我不是你的敌人。你伤得挺重啊，我先来给你简单包扎一下。",
            "**：这里究竟是什么地方，你是谁，那个追杀我的家伙又是谁？",
            "黑影：我是杰瑞，除了你我之外，还有2个人也被卷入了这场献祭游戏中来了。这个地方具体在哪我也不是很清楚，但是我们已经发现了出口了，现在只差一个密码我们就可以从这里逃出去了。",
            "**：那我们现在该怎么办？那家伙一定在解密点附近等我们自己上钩。",
            "杰瑞：对，因为你伤还没有痊愈，所以等等我会引开他。希望你能在这段时间里解开密码⋯⋯靠你了。",
            "**：好，我会尽力而为的⋯⋯",
            "经过一番操作后，解码成功，提示向逃脱点撤离，但日记在进入逃生点前结束了。"
        ];
        _this.detail1 = [
            "**：刚才我不是还在别墅么？这里是哪里？",
            "**一边摸索一边行进，突然近距离遭遇处刑者。",
            "**：“sh*t，这是什么鬼啊？不过瞧他这表情，看来“我”不跑就得死在这里了。”",
            "**：这家伙怎么回事？明明长得五大三粗的，怎么跑得这么快？在这样下去不妙啊，得赶紧跑到前面那个废墟找个地方躲起来才行。",
            "**：可恶，脚步声越来越近了？我该怎么办？",
            "屏住呼吸，不动声色,等他靠近之后，抓准时机偷袭他",
            "我不能就这么坐以待毙下去，等他再靠近点打他个措手不及。",
            "当**这么思考的时候，处刑者突然被远处的其他动静吸引走了。",
            "呼〜危机看来暂时解除了⋯⋯不对，什么声音？他又回来了么？",
            "黑影：嘘〜别紧张，我不是你的敌人。你伤得挺重啊，我先来给你简单包扎一下。",
            "**：这里究竟是什么地方，你是谁，那个追杀我的家伙又是谁？",
            "黑影：我是杰瑞，除了你我之外，还有2个人也被卷入了这场献祭游戏中来了。这个地方具体在哪我也不是很清楚，但是我们已经发现了出口了，现在只差一个密码我们就可以从这里逃出去了。",
            "**：那我们现在该怎么办？那家伙一定在解密点附近等我们自己上钩。",
            "杰瑞：对，因为你伤还没有痊愈，所以等等我会引开他。希望你能在这段时间里解开密码⋯⋯靠你了。",
            "**：好，我会尽力而为的⋯⋯",
            "经过一番操作后，解码成功，提示向逃脱点撤离，但日记在进入逃生点前结束了。"
        ];
        //定义界面
        _this.skinName = SceneStep7Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail0;
        monolog_data["detail_type"] = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this), _this.btnchange.bind(_this));
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep7.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        UserData.User_Choose[1] = -1;
        this.btn_next.visible = false;
        this.monolog.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask, 2000, 800);
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
    SceneStep7.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //隐藏独白
        Action_Other.changeAlpha(1, 0, 500, this.monolog);
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP8);
        });
    };
    //停止下一步
    SceneStep7.prototype.stopcallback = function () {
        //判断播放雷声
        if (this.monolog.now_show == 4) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_zou_mp3");
        }
        //开始独白
        this.monolog.startAction();
    };
    //按钮改变
    SceneStep7.prototype.btnchange = function () {
        var _this = this;
        //数据赋值
        UserData.User_Choose[1] = this.monolog.now_choose;
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
    //下一步按钮
    SceneStep7.prototype.onNextBtn = function (e) {
        //判断播放雷声
        if (this.monolog.now_show == 4) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_zou_mp3");
        }
        else {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
        }
        //判断显示下一个
        if (this.monolog.detail_type[this.monolog.now_show - 1] == 1) {
            //移除界面
            this.monolog.clean();
            //定义变量
            var monolog_data = {};
            //数据赋值
            if (UserData.User_Choose[2] == 0) {
                monolog_data["detail_text"] = this.detail0;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            else {
                monolog_data["detail_text"] = this.detail1;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
            //显示界面
            this.monolog.show(monolog_data, this.monolog.now_show);
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep7;
}(basic.SceneBase));
__reflect(SceneStep7.prototype, "SceneStep7");
//# sourceMappingURL=SceneStep7.js.map