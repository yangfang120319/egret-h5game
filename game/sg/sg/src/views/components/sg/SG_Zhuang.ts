/**
 *
 * @author 
 *
 */
class SG_Zhuang extends eui.Component {
    //定义变量
    private result: SG_Result;
    private card: Game_Card[] = [];

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i: number = 0;i < 3;i++) {
            //定义变量
            var now_card: Game_Card = this["card" + i];

            //数据赋值
            this.card[i] = now_card;
        }

        //注册事件
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARD,this.onShowCard,this);
        basic.Dispatcher.addListener(EventNames.SG_HIDE_CARD,this.onHideCard,this);
        basic.Dispatcher.addListener(EventNames.SG_OPEN_CARD,this.onOpenCard,this);
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARDDETAIL,this.onShowCardDetail,this);
    }
    
    //初始化界面
    info(): void {
        //清除界面
        this.clean();

        //判断显示界面
        if(GameData.SG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            for(var i: number = 0;i < 3;i++) {
                this.card[i].openCard();
                this.card[i].visible = true;
            }
            basic.Dispatcher.dispatch(EventNames.SG_SHOW_CARDDETAIL,{
                "table": 5,
                "card": GameData.SG_Poker_Table_Card[5]
            });
            this.result.showResult(GameData.SG_Poker_Table_Type[5]);
        }
    }

    //清除界面
    clean(): void {
        //隐藏界面
        this.result.visible = false;
        for(var i: number = 0;i < 3;i++) {
            this.card[i].closeCard();
            this.card[i].visible = false;
        }
    }

    //显示牌
    private onShowCard(e: egret.Event): void {
        //判断显示
        if(e.data.table == 5) {
            this.card[e.data.cardnum].visible = true;
            if(e.data.cardnum < 2) {
                this.card[e.data.cardnum].openCardAction(0.65);
            }
        }
        else if(e.data.table == -1) {
            //显示界面
            for(var i: number = 0;i < 3;i++) {
                this.card[i].visible = true;
            }
        }
    }

    //隐藏牌
    private onHideCard(e: egret.Event): void {
        //隐藏界面
        for(var i: number = 0;i < 3;i++) {
            this.card[i].visible = false;
        }
    }

    //显示牌内容
    private onShowCardDetail(e: egret.Event): void {
        //判断显示
        if(e.data.table == 5) {
            for(var i: number = 0;i < 3;i++) {
                this.card[i].showCard(e.data.card[i]);
            }
        }
    }

    //打开牌
    private onOpenCard(e: egret.Event): void {
        //判断显示
        if(e.data.table == 5) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_cardopen_mp3");
            
            //显示开牌
            this.card[2].openCardAction(0.65,() => {
                //显示结果
                this.result.visible = true;
                this.result.show(GameData.SG_Poker_Table_Type[5]);
            });
        }
    }
}
