/**
 *
 * @马来西亚银行-显示
 *
 */
class MLXYYH_Show extends eui.Component {
    //定义变量
    private img_icon: eui.Image;
    private txt_gold: eui.BitmapLabel;

    //初始化
    createChildren(): void {
        super.createChildren();

        //发送消息
        basic.Dispatcher.addListener(EventNames.MLXYYH_HISTORY,this.onShowHistory,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_CHANGE_GOLD,this.onShowGold,this);
    }
    
    //显示金币
    private onShowGold(e: egret.Event): void {
        //显示金币
        this.txt_gold.text = Number(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal + GameData.MLXYYH_AddGold).toString();
    }
    
    //显示历史记录
    private onShowHistory(e: egret.Event): void {
        //清除界面
        if(e.data.historys.length > 0) {
            this.img_icon.source = "icon_mlxyyh_" + e.data.historys[0] + "_2_png";
        }
        else {
            this.img_icon.source = "";
        }
    }
}
