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
 * @投票
 *
 */
var GameVote = (function (_super) {
    __extends(GameVote, _super);
    function GameVote() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player_num = 0;
        _this.player_detail = [];
        return _this;
    }
    //初始化
    GameVote.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_STATE, this.onGameState, this);
    };
    //游戏状态
    GameVote.prototype.onGameState = function (e) {
        //清除界面
        this.clean();
        //数据赋值
        this.player_num = e.data.player.length;
        if (e.data.state == 0) {
            //数据赋值
            GameData.Player_State = 0;
            for (var p = 0; p < this.player_num; p++) {
                if (Number(e.data.player[p].playerId) == UserData.User_Id) {
                    if (e.data.player[p].playerState > 2) {
                        GameData.Player_State = 4;
                        break;
                    }
                    if (e.data.player[p].describe != "") {
                        GameData.Player_State = 1;
                        break;
                    }
                }
            }
        }
        else {
            GameData.Player_State = 2;
            for (var j = 0; j < this.player_num; j++) {
                //判断结束
                if (GameData.Player_State != 2) {
                    break;
                }
                //判断赋值
                if (Number(e.data.player[j].playerId) == UserData.User_Id) {
                    if (e.data.player[j].playerState > 2) {
                        GameData.Player_State = 4;
                    }
                }
                if (e.data.player[j].playerState != 3 && e.data.player[j].playerState != 4) {
                    for (var k = 0; k < e.data.player[j].votePlayer.length; k++) {
                        if (UserData.User_Id == Number(e.data.player[j].votePlayer[k])) {
                            GameData.Player_State = 3;
                            break;
                        }
                    }
                }
            }
        }
        //显示界面
        for (var i = 0; i < this.player_num; i++) {
            //定义变量
            var now_detail = new GameOrder();
            //显示
            now_detail.show(i + 1, e.data.player[i], GameData.Player_State);
            //显示界面
            this.player_detail[i] = now_detail;
            this.g_list.addChild(this.player_detail[i]);
        }
        //判断显示界面
        if (e.data.state == 0) {
            if (GameData.Game_State == -1) {
                //显示给词界面
                Panel_GameWord.instance.show();
            }
            else {
                if (GameData.Is_Show_Word == false) {
                    if (GameData.Player_State == 0) {
                        //显示描述界面
                        Panel_GameDescription.instance.show();
                    }
                    else if (GameData.Player_State == 1) {
                        //移除描述界面
                        Panel_GameDescription.instance.funExit();
                    }
                }
            }
        }
        else {
            //移除词语界面
            Panel_GameWord.instance.funExit();
            //移除描述界面
            Panel_GameDescription.instance.funExit();
        }
        //判断开始计时
        if (GameData.Game_State != e.data.state) {
            basic.Dispatcher.dispatch(EventNames.START_TIME);
        }
        //数据赋值
        GameData.Game_State = e.data.state;
    };
    //清除界面
    GameVote.prototype.clean = function () {
        //清除界面
        for (var i = 0; i < this.player_num; i++) {
            //移除界面
            this.player_detail[i].clean();
            this.g_list.removeChild(this.player_detail[i]);
        }
        //清空文本
        this.player_num = 0;
        this.player_detail = [];
    };
    return GameVote;
}(eui.Component));
__reflect(GameVote.prototype, "GameVote");
