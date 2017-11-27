/**
 *
 * @游戏-筹码飞行
 *
 */
class Game_ChipFly extends eui.Component {
    //数据变量
    private rate_zoom: number;
    private start_x: number[] = [];
    private start_y: number[] = [];
    private over_x: number[] = [];
    private over_y: number[] = [];
    private over_with: number[] = [];
    private over_height: number[] = [];
    
    //筹码数据
    private chip_num: number = 0;
    private chip_detail: Game_Chip[] = [];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_SHOW_USERYAZHU,this.onShowUserYaZhu,this);
        basic.Dispatcher.addListener(EventNames.GAME_SHOW_OHTERYAZHU,this.onShowOtherYaZhu,this);
	}
	
    //初始化
    info(_rate:number,_start_x: any,_start_y: any,over_x: any,_over_y: any,_over_width: any,_over_height: any): void {
        //数据赋值
        this.rate_zoom = _rate;
        this.start_x = _start_x;
        this.start_y = _start_y;
        this.over_x = over_x;
        this.over_y = _over_y;
        this.over_with = _over_width;
        this.over_height = _over_height;
    }
	
    //初始化筹码
    infoChip(_data:any):void{
        //显示筹码
        for(var i: number = 0;i < _data.length;i++) {
            for(var j: number = 0;j < _data[i].length;j++) {
                //定义变量
                var chip: Game_Chip = new Game_Chip();

                //初始化
                chip.scaleX = 0.25;
                chip.scaleY = 0.25;
                chip.info(i,_data[i][j],1);
                chip.x = this.over_x[i] + Math.random() * (this.over_with[i] - 32)
                chip.y = this.over_y[i] + Math.random() * (this.over_height[i] - 32)
                    
                //显示界面
                this.chip_detail[this.chip_num] = chip;
                this.addChild(this.chip_detail[this.chip_num]);
                
                //数据赋值
                this.chip_num += 1;
            }
        }
    }
    
	//清除界面
    clean():void{
        //清除界面
        for(var i: number = 0;i < this.chip_num;i++) {
            //判断显示
            if(this.chip_detail[i].chip_isshow == true) {
                this.chip_detail[i].chip_isshow = false;
                this.removeChild(this.chip_detail[i]);
            }
        }
        this.chip_num = 0;
        this.chip_detail = [];
    }
	
	//用户压住
    private onShowUserYaZhu(e:egret.Event):void{
        //定义变量
        var chip: Game_Chip = new Game_Chip();

        //初始化
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        chip.info(e.data.pos,e.data.gold,1);
        chip.x = this.start_x[GameData.Game_Chip_Now];
        chip.y = this.start_y[GameData.Game_Chip_Now];
        
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_yazhu_mp3");
        
        //开始动画
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 },500);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 },500);
        var _tween_x: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.over_x[e.data.pos] + Math.random() * (this.over_with[e.data.pos] - 32) },500);
        var _tween_y: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.over_y[e.data.pos] + Math.random() * (this.over_height[e.data.pos] - 32) },500);

        //数据赋值
        this.chip_num += 1;
    }
	
	//其他压住
    private onShowOtherYaZhu(e: egret.Event): void {
        //定义变量
        var chip: Game_Chip = new Game_Chip();

        //初始化
        chip.y = -50;
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        chip.info(e.data.pos,e.data.gold,1);
        chip.x = basic.StageProxy.width + 50;
        
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        
        //开始动画
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 },500);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 },500);
        var _tween_x: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.over_x[e.data.pos] + Math.random() * (this.over_with[e.data.pos] - 32) },500);
        var _tween_y: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.over_y[e.data.pos] + Math.random() * (this.over_height[e.data.pos] - 32) },500);

        //播发器声音
        basic.SoundManager.instance.playEffect("sound_g_yazhu_mp3");

        //数据赋值
        this.chip_num += 1;
    }
}
