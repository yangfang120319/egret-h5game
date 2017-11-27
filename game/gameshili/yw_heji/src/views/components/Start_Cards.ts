/**
 *
 * @游戏卡牌总
 *
 */
class Start_Cards extends eui.Component{
    //定义变量
    private g_card: eui.Group;
    private arr_card: Start_Card[] = [];
    private num_max_alpha: number = 0.8;
    private num_min_scale: number = 0.8;
    private _tween_x: egret.Tween = null;
    private num_offsetX: number;
    private num_Start_MoveX: number;
    private num_MoveMax_X: number;
    private card_txt: string[] = ["txt_s_box0_png","","txt_s_box2_png","","",""];
    private card_icon: string[] = ["icon_s_box0_png","","","","",""];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //定义组宽度
        this.g_card.width = 390 * (GameData.Game_Num - 1) + 444 + 196;
        for(var i: number = 0;i < GameData.Game_Num;i++) {
            //定义卡片
            var card: Start_Card = new Start_Card();
            
            //定义卡片位置
            card.verticalCenter = 0;
            card.horizontalCenter = 390 * ((1 - GameData.Game_Num) / 2 + i);
            
            //显示图片
            card.show("back_s_box" + i + "_png",this.card_txt[i],this.card_icon[i],i);
            
            //数据赋值
            this.arr_card[i] = card;
            
            //显示卡片
            this.g_card.addChild(this.arr_card[i]);
        }
        
        //显示当前牌
        this.showNowCard();
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_NOWCARD,this.onShowNowCard,this);
        this.g_card.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this);
    }
    
    //进入房间
    enterGame(_card_num: number): void {
        //进入房间
        this.arr_card[_card_num].enterGame();
    }
    
    //显示当前牌
    private showNowCard():void{
        //定义位置
        this.g_card.x = -390 * GameData.GameCard_NowShow;
        
        //显示当前卡片
        for(var i: number = 0;i < GameData.Game_Num;i++) {
            //判断显示界面
            if(i == GameData.GameCard_NowShow){
                //显示状态
                this.arr_card[i].showState("show");
                
                //定义大小
                this.arr_card[i].scaleX = 1;
                this.arr_card[i].scaleY = 1;
                
                //显示最底层
                this.g_card.setChildIndex(this.arr_card[i],0);
            }
            else{
                //显示状态
                this.arr_card[i].showState("hide");
                
                //定义大小
                this.arr_card[i].scaleX = this.num_min_scale;
                this.arr_card[i].scaleY = this.num_min_scale;
                this.arr_card[i].showMaskAlpha(this.num_max_alpha);
            }
        }
    }
    
    //定义移动中牌显示
    private showActionCard():void{
        //显示卡片
        for(var i: number = 0;i < GameData.Game_Num;i++) {
            //判断显示
            if(this.g_card.x == -i * 390) {
                //显示状态
                this.arr_card[i].showState("show");
                
                //定义大小
                this.arr_card[i].scaleX = 1;
                this.arr_card[i].scaleY = 1;
            }
            else{
                //定义变量
                var num_ratezoom: number;
                var num_Move_Deviation: number;
                
                //显示状态
                this.arr_card[i].showState("hide");
                
                //数据赋值
                num_Move_Deviation = Math.abs(i * 390 + this.g_card.x);
                num_ratezoom = Math.min(1,num_Move_Deviation/390);
                
                //定义大小
                this.arr_card[i].showMaskAlpha(this.num_max_alpha * num_ratezoom);
                this.arr_card[i].scaleX = 1 - (1 - this.num_min_scale) * num_ratezoom;
                this.arr_card[i].scaleY = 1 - (1 - this.num_min_scale) * num_ratezoom;
            }
        }
    }
    
    //开始缓动动画
    private showMoveAction(_nowShow:number=null):void{
        //定义变量
        var num_move_time: number;
        var num_NowNeedShow: number;
        
        //数据赋值
        if(_nowShow == null) {
            num_NowNeedShow = Math.floor((0 - this.g_card.x + 195) / 390);
        }
        else {
            num_NowNeedShow = _nowShow;
        }
        if(num_NowNeedShow < 0) {
            num_NowNeedShow = 0;
        }
        if(num_NowNeedShow >= GameData.Game_Num) {
            num_NowNeedShow = GameData.Game_Num - 1;
        }
        num_move_time = Math.abs(this.g_card.x + num_NowNeedShow * 390) * 1.3;
        
        //注册事件
        this.addEventListener(egret.Event.ENTER_FRAME,this.onFrameShowCard,this);
        
        //注销按钮
        this.g_card.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this);
        
        //开始缓动
        this._tween_x = egret.Tween.get(this.g_card).to({ x: -num_NowNeedShow * 390 },num_move_time).call(()=>{
            //注销事件
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrameShowCard,this);
            
            //注册按钮
            this.g_card.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.startMove,this);
            
            //数据赋值
            GameData.GameCard_NowShow = num_NowNeedShow;
            
            //显示当前牌
            this.showNowCard();
        });
    }
    
    //显示当前状态
    private onFrameShowCard(e:egret.Event):void{
        //显示牌
        this.showActionCard();
    }
    
    //-----------------------定义按钮----------------------------
    //定义移动变量
    private num_X1: number;//X坐标1
    private num_X2: number;//X坐标2
    private int_Time1:number;//时间1
    private int_Time2: number;//时间2
    private num_X_Off_Set: number;//X坐标设置
    
    //显示当前卡片
    private onShowNowCard(e:egret.Event):void{
        //显示当前卡牌
        this.showMoveAction(e.data.nowcardnum);
    }
    
    //开始移动
    private startMove(e: egret.TouchEvent): void {
        //计算距离
        this.num_offsetX = e.stageX - this.g_card.x;
        this.num_Start_MoveX = this.g_card.x;
        this.num_MoveMax_X = 0;
        
        //移动数据赋值
        this.int_Time1 = this.int_Time2 = egret.getTimer();
        this.num_X1 = this.num_X2 = this.g_card.x;
        this.num_X_Off_Set = e.stageX - this.g_card.x;
        
        //卡片数据赋值
        for(var i: number = 0;i < GameData.Game_Num;i++){
            this.arr_card[i].is_canClick = false;
        }
        
        //注册事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);
    }
    
    //移动事件
    private onMove(e: egret.TouchEvent): void {
        //定义变量
        var int_Now_Time:number;//当前时间
        var num_Now_X: number;//当前X坐标
        
        //定义位置
        this.g_card.x = e.stageX - this.num_offsetX;
        this.num_MoveMax_X = Math.abs(this.g_card.x - this.num_Start_MoveX)
        
        //显示卡片
        this.showActionCard();
        
        //判断停止
        if(this.g_card.x > 200 || this.g_card.x < 640 - this.g_card.width - 200) {
            //注销事件
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);
        
            //开始缓动动画
            this.showMoveAction();
        }
        if(e.stageX < 10 || e.stageX > 630) {
            //注销事件
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);
        
            //开始缓动动画
            this.showMoveAction();
        }
        
        //时间赋值
        int_Now_Time = egret.getTimer();
        if(int_Now_Time - this.int_Time1 > 50) {
            this.num_X2 = this.num_X1;
            this.int_Time2 = this.int_Time1;
            this.num_X1 = this.g_card.x;
            this.int_Time1 = int_Now_Time;
        }
    }
    
    //停止移动
    private stopMove(e: egret.TouchEvent) {
        //定义变量
        var num_Speed: number;
        var num_Use_Time: number;//用时
        
        //注销事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.stopMove,this);
        
        //判断显示
        if(this.num_MoveMax_X>5){
            //判断加速度
            num_Use_Time = (egret.getTimer() - this.int_Time2) / 1000;
            num_Speed = (this.g_card.x - this.num_X2) / num_Use_Time;
            
            //判断显示
            if(Math.abs(num_Speed)>150){
                if(num_Speed < 0) {
                    //开始缓动动画
                    this.showMoveAction(GameData.GameCard_NowShow + 1);
                }
                else{
                    //开始缓动动画
                    this.showMoveAction(GameData.GameCard_NowShow - 1);
                }
            }
            else{
                //开始缓动动画
                this.showMoveAction();
            }
        }
        else{
            //显示当前牌
            this.showNowCard();
            
            //卡片数据赋值
            for(var i: number = 0;i < GameData.Game_Num;i++) {
                this.arr_card[i].is_canClick = true;
            }
        }
    }
}
