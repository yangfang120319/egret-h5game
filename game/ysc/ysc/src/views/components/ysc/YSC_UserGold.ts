/**
 *
 * @夜市场-用户金币
 *
 */
class YSC_UserGold extends eui.Component {
    //定义变量
    private txt_gold: eui.BitmapLabel;

    //初始化
    createChildren(): void {
        super.createChildren();

        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_SHOWGOLD,this.onShowGold,this);
    }

    //显示金币事件
    private onShowGold(e: egret.Event): void {
        //定义变量
        var show_gold: number = e.data.gold;

        //显示金币
        this.txt_gold.text = show_gold.toString();
    }
}
