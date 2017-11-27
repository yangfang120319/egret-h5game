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
 * @游戏投票
 *
 */
var GameOrder = (function (_super) {
    __extends(GameOrder, _super);
    //定义界面
    function GameOrder() {
        var _this = _super.call(this) || this;
        _this.vote_num = 0;
        _this.vote_head = [];
        //定义界面
        _this.skinName = GameOrderSkin;
        return _this;
    }
    //显示界面
    GameOrder.prototype.show = function (_index, _data, _player_state) {
        //数据赋值
        this.player_id = Number(_data.playerId);
        //显示基本信息
        this.head.show(_data.headImgURL);
        this.txt_name.text = _data.nickName;
        this.txt_num.text = _index.toString();
        this.txt_describe.text = _data.describe;
        //判断显示状态------> 0：描述，1：描述完成，2：投票，3：投票完成，4：出局
        if (_data.playerState == 2) {
            //隐藏状态
            this.com_status.visible = false;
            //判断显示按钮
            if (_player_state == 0 || _player_state == 1) {
                //显示界面
                this.g_head.visible = false;
                this.btn_vote.visible = false;
            }
            else if (_player_state == 2) {
                //显示界面
                this.g_head.visible = false;
                this.btn_vote.visible = true;
            }
            else if (_player_state == 3) {
                //显示界面
                this.g_head.visible = true;
                this.btn_vote.visible = false;
                //显示头像
                this.vote_num = _data.votePlayer.length;
                for (var i = 0; i < _data.votePlayer.length; i++) {
                    //定义变量
                    var now_head = new Head_Add();
                    //定义头像
                    now_head.show(this.assHeadAddress(_data.votePlayer[i]));
                    //显示头像
                    this.vote_head[i] = now_head;
                    this.g_head.addChild(this.vote_head[i]);
                }
            }
            else {
                //显示界面
                this.g_head.visible = false;
                this.btn_vote.visible = false;
            }
        }
        else {
            //显示状态
            this.txt_describe.text = "";
            this.btn_vote.visible = false;
            this.com_status.visible = true;
            this.com_status.currentState = Number(_data.playerState - 3).toString();
        }
        //注册按钮
        this.btn_vote.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onVoteBtn, this);
    };
    //清除界面
    GameOrder.prototype.clean = function () {
        //移除头像
        for (var i = 0; i < this.vote_num; i++) {
            //移除头像
            this.g_head.removeChild(this.vote_head[i]);
        }
        //清除数据
        this.vote_num = 0;
        this.vote_head = [];
        //注销按钮
        this.btn_vote.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onVoteBtn, this);
    };
    //投票按钮
    GameOrder.prototype.onVoteBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.player_id == UserData.User_Id) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "不能投票给自己！" });
        }
        else {
            //发送消息
            Comm.instance.sendSocket({ "type": "gameVote", "playerId": this.player_id });
        }
    };
    //头像数据赋值
    GameOrder.prototype.assHeadAddress = function (_player_id) {
        //定义变量
        var head_address = "";
        //数据赋值
        for (var i = 0; i < GameData.Player_List.length; i++) {
            if (_player_id == GameData.Player_List[i].playerId) {
                head_address = GameData.Player_List[i].headImgURL;
                break;
            }
        }
        return head_address;
    };
    return GameOrder;
}(eui.Component));
__reflect(GameOrder.prototype, "GameOrder");
