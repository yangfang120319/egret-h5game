/**
 *
 * @二八杠-庄
 *
 */
class EBG_Zhuang extends eui.Component {
    //定义变量
    private result: EBG_Result;
    private mahjong0: Game_Mahjong;
    private mahjong1: Game_Mahjong;

    //初始化
    createChildren(): void {
        super.createChildren();

        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONG,this.onShowMahjong,this);
        basic.Dispatcher.addListener(EventNames.EBG_HIDE_MAHJONG,this.onHideMahjong,this);
        basic.Dispatcher.addListener(EventNames.EBG_OPEN_MAHJONG,this.onOpenMahjong,this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONGDETAIL,this.onShowMahjongDetail,this);
    }

    //初始化界面
    info(): void {
        //清除界面
        this.clean();

        //判断显示界面
        if(GameData.EBG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            this.mahjong0.visible = true;
            this.mahjong1.visible = true;
            basic.Dispatcher.dispatch(EventNames.EBG_SHOW_MAHJONGDETAIL,{
                "table": 3,
                "mahjong": GameData.EBG_Poker_Table_Card[3]
            });
            this.result.showResult(3);
            this.mahjong0.openMahjong();
            this.mahjong1.openMahjong();
        }
    }

    //清除界面
    clean(): void {
        //隐藏界面
        this.mahjong0.closeMahjong();
        this.mahjong1.closeMahjong();
        this.result.visible = false;
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
        
    }

    //显示麻将
    private onShowMahjong(e: egret.Event): void {
        //显示界面
        this.mahjong0.visible = true;
        this.mahjong1.visible = true;
    }

    //隐藏麻将
    private onHideMahjong(e: egret.Event): void {
        //显示界面
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
    }

    //显示麻将内容
    private onShowMahjongDetail(e: egret.Event): void {
        //判断显示
        if(e.data.table == 3) {
            this.mahjong0.showMahjong(e.data.mahjong[0]);
            this.mahjong1.showMahjong(e.data.mahjong[1]);
        }
    }

    //打开麻将
    private onOpenMahjong(e: egret.Event): void {
        //判断显示
        if(e.data.table == 3) {
            this.mahjong0.openMahjongAction(() => {
                this.mahjong1.openMahjongAction(() => {
                    //显示结果
                    this.result.show(3);
                    this.result.visible = true;
                });
            });
        }
    }
}
