/**
 *
 * @夜市场-筹码飞行
 *
 */
class YSC_ChipFly extends eui.Component {
    //定义变量
    private rate_zoom: number;
    private usergold_x: number;
    private usergold_y: number;
    private chip_x: number[] = [];
    private chip_y: number[] = [];
    private yazhu_x: number[] = [];
    private yazhu_y: number[] = [];
    private yazhu_width: number[] = [];
    private yazhu_height: number[] = [];
    
    //筹码数据
    private chip_num: number = 0;
    private chip_detail: Game_Chip[] = [];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_YAZHU_USER,this.onYaZhuUser,this);
        basic.Dispatcher.addListener(EventNames.YSC_YAZHU_OTHER,this.onYaZhuOther,this);
        basic.Dispatcher.addListener(EventNames.YSC_QIANGZHU_USER,this.onQiangZhuUser,this);
        basic.Dispatcher.addListener(EventNames.YSC_QIANGZHU_OTHER,this.onQiangZhuOther,this);
    }
    
    //初始化界面
    info(_rate: number,_play_x: number,_play_y: number,_choose_x: number,_choose_y: number,_usergold_x: number,_usergold_y: number): void {
        //数据赋值
        this.rate_zoom = _rate;
        this.usergold_x = _usergold_x;
        this.usergold_y = _usergold_y;
        this.yazhu_width[0] = 222 * this.rate_zoom;
        this.yazhu_width[1] = 222 * this.rate_zoom;
        this.yazhu_width[2] = 222 * this.rate_zoom;
        this.yazhu_width[3] = 222 * this.rate_zoom;
        this.yazhu_height[0] = 210 * this.rate_zoom;
        this.yazhu_height[1] = 210 * this.rate_zoom;
        this.yazhu_height[2] = 210 * this.rate_zoom;
        this.yazhu_height[3] = 210 * this.rate_zoom;
        this.yazhu_x[0] = _play_x + 64 * this.rate_zoom;
        this.yazhu_x[1] = _play_x + 319 * this.rate_zoom;
        this.yazhu_x[2] = _play_x + 319 * this.rate_zoom;
        this.yazhu_x[3] = _play_x + 64 * this.rate_zoom;
        this.yazhu_y[0] = _play_y + 46 * this.rate_zoom;
        this.yazhu_y[1] = _play_y + 56 * this.rate_zoom;
        this.yazhu_y[2] = _play_y + 291 * this.rate_zoom;
        this.yazhu_y[3] = _play_y + 291 * this.rate_zoom;
        this.chip_x[0] = _choose_x + 35.5 * this.rate_zoom;
        this.chip_x[1] = _choose_x + 215.5 * this.rate_zoom;
        this.chip_x[2] = _choose_x + 35.5 * this.rate_zoom;
        this.chip_x[3] = _choose_x + 215.5 * this.rate_zoom;
        this.chip_y[0] = _choose_y + 15.5 * this.rate_zoom;
        this.chip_y[1] = _choose_y + 15.5 * this.rate_zoom;
        this.chip_y[2] = _choose_y + 160.5 * this.rate_zoom;
        this.chip_y[3] = _choose_y + 160.5 * this.rate_zoom;
    }
    
    //清除界面
    clean(): void {
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
    private onYaZhuUser(e: egret.Event): void {
        //定义变量
        var chip: Game_Chip = new Game_Chip();
        
        //初始化
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        chip.info(e.data.pos,e.data.gold,1);
        chip.x = this.chip_x[GameData.Game_Chip_Now];
        chip.y = this.chip_y[GameData.Game_Chip_Now];
        
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        
        //开始动画
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 },500);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 },500);
        var _tween_x: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.yazhu_x[e.data.pos] + Math.random() * (this.yazhu_width[e.data.pos] - 32) },500);
        var _tween_y: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.yazhu_y[e.data.pos] + Math.random() * (this.yazhu_height[e.data.pos] - 32) },500);
        
        //数据赋值
        this.chip_num += 1;
    }
    
    //其他用户压住
    private onYaZhuOther(e: egret.Event): void {
        //显示压住
        this.yaZhuOther(e.data.pos,e.data.gold);
    }
    
    //用户抢注
    private onQiangZhuUser(e: egret.Event): void {
        //抢注
        this.qiangZhu(e.data.pos,e.data.gold,0);
    }

    //其他用户抢注
    private onQiangZhuOther(e: egret.Event): void {
        //抢注
        this.qiangZhu(e.data.pos,e.data.gold,1);
    }
    
    //其他压住
    private yaZhuOther(_pos: number,_gold: number):void{
        //定义变量
        var chip: Game_Chip = new Game_Chip();

        //初始化
        chip.y = -50;
        chip.x = -50;
        chip.info(_pos,_gold,1);
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;

        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);

        //开始动画
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 },500);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 },500);
        var _tween_x: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.yazhu_x[_pos] + Math.random() * (this.yazhu_width[_pos] - 32) },500);
        var _tween_y: egret.Tween = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.yazhu_y[_pos] + Math.random() * (this.yazhu_height[_pos] - 32) },500);

        //数据赋值
        this.chip_num += 1;
    }
    
    //压住函数
    private yaZhu(_pos: number,_gold: number):void{
        //定义变量
        var chip: Game_Chip = new Game_Chip();

        //初始化
        chip.scaleX = 0.25;
        chip.scaleY = 0.25;
        chip.info(_pos,_gold,1);
        chip.y = this.yazhu_y[_pos] + Math.random() * (this.yazhu_height[_pos] - 32);
        chip.x = this.yazhu_x[_pos] + Math.random() * (this.yazhu_width[_pos] - 32);

        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        
        //数据赋值
        this.chip_num += 1;
    }
    
    //抢注函数
    private qiangZhu(_pos:number,_gold:number,_type:number):void{
        //定义变量
        var max_gold: number = 0;
        var min_max_gold: number = 0;
        var now_gold: number = _gold;
        
        //数据赋值
        for(var i: number = 0;i < this.chip_num;i++) {
            if(this.chip_detail[i].chip_isshow == true && this.chip_detail[i].chip_pos == _pos) {
                if(this.chip_detail[i].chip_gold == now_gold){
                    //隐藏筹码
                    this.removeChip(i,_type);
                    
                    //数据赋值
                    now_gold = 0;
                    break;
                }
            }
        }
        
        //判断显示
        if(now_gold > 0) {
            //定义变量
            var remove_num: number = -1;
            
            //判断赋值
            for(var j: number = 0;j < this.chip_num;j++) {
                //判断显示
                if(this.chip_detail[j].chip_isshow == true && this.chip_detail[j].chip_pos == _pos && this.chip_detail[j].chip_gold > now_gold && this.chip_detail[j].chip_gold % now_gold == 0) {
                    remove_num = j;
                    break;
                }
            }
            
            //判断显示
            if(remove_num != -1) {
                //定义变量
                var add_num: number;
                var add_gold: number;
                
                //数据赋值
                add_gold = now_gold;
                add_num = Math.floor(this.chip_detail[remove_num].chip_gold / now_gold);
                
                //添加筹码
                for(var k: number = 0;k < add_num;k++) {
                    this.yaZhu(_pos,add_gold);
                }
                
                //移除筹码
                this.removeChip(remove_num,1);
                
                //抢注函数
                this.qiangZhu(_pos,_gold,_type);
            }
            else {
                //定义变量
                var is_remove: Boolean = false;
                
                //判断赋值
                for(var p: number = 0;p < this.chip_num;p++) {
                    //判断显示
                    if(this.chip_detail[p].chip_isshow == true && this.chip_detail[p].chip_pos == _pos && this.chip_detail[p].chip_gold < now_gold) {
                        //移除筹码
                        this.removeChip(p,_type);

                        //继续抢注
                        this.qiangZhu(_pos,now_gold - this.chip_detail[p].chip_gold,_type);
                        
                        //数据赋值
                        is_remove = true;
                        break;
                    }
                }
                
                //判断显示
                if(is_remove == false) {
                    //定义变量
                    var remove_mingold: number = 0;
                    var remove_mingold_chipnum: number = -1;

                    //数据赋值
                    for(var q: number = 0;q < this.chip_num;q++) {
                        if(this.chip_detail[q].chip_isshow == true && this.chip_detail[q].chip_pos == _pos) {
                            //判断显示
                            if(this.chip_detail[q].chip_gold > now_gold) {
                                if(remove_mingold == 0) {
                                    remove_mingold_chipnum = q;
                                    remove_mingold = this.chip_detail[q].chip_gold;
                                }
                                else {
                                    if(remove_mingold > this.chip_detail[q].chip_gold) {
                                        remove_mingold_chipnum = q;
                                        remove_mingold = this.chip_detail[q].chip_gold;
                                    }
                                }
                            }
                        }
                    }
                    
                    //数据赋值
                    if(remove_mingold_chipnum != -1) {
                        //显示筹码
                        var now_add_chip: number[] = [];

                        //数据赋值
                        now_add_chip = this.assAddGold(remove_mingold,now_gold);
                        
                        //添加筹码
                        for(var r: number = 0;r < now_add_chip.length;r++) {
                            this.yaZhu(_pos,now_add_chip[r]);
                        }

                        //移除筹码
                        this.removeChip(remove_mingold_chipnum,1);

                        //继续抢注
                        this.qiangZhu(_pos,_gold,_type);
                    }
                }
            }
        }
    }
    
    //移除筹码
    private assAddGold(_total_gold: number,_now_gold: number): any {
        //定义变量
        var add_gold: number[] = [];
        var now_gold: number = _total_gold;
        
        //数据赋值
        add_gold[add_gold.length] = _now_gold;
        now_gold = now_gold - _now_gold;
        
        //数据赋值
        function assData(): void {
            //定义变量
            var max_gold: number = 0;
            var chip_goldnum: number[] = [100,500,1000,2500,5000,10000,25000,50000,100000];
            
            //数据赋值
            for(var i: number = 0;i < chip_goldnum.length;i++){
                if(chip_goldnum[i] <= now_gold){
                    max_gold = Math.max(max_gold,chip_goldnum[i]);
                }
            }
            
            add_gold[add_gold.length] = max_gold;
            now_gold = now_gold - max_gold;
            
            //判断赋值
            if(now_gold > 0) {
                assData();
            }
        }
        
        //判断赋值
        if(now_gold > 0) {
            assData();
        }
        
        return add_gold;
    }
    
    //隐藏筹码
    private removeChip(_num:number,_type:number):void{
        //数据赋值
        this.chip_detail[_num].chip_isshow = false;

        //隐藏界面
        if(_type == 0) {
            var _tween_x1: egret.Tween = egret.Tween.get(this.chip_detail[_num]).to({ x: this.usergold_x },400);
            var _tween_y1: egret.Tween = egret.Tween.get(this.chip_detail[_num]).to({ y: this.usergold_y },400).call(() => {
                if(this.chip_num > _num) {
                    this.removeChild(this.chip_detail[_num]);
                }
            });
        }
        else {
            var _tween_x2: egret.Tween = egret.Tween.get(this.chip_detail[_num]).to({ x: -50 },400);
            var _tween_y2: egret.Tween = egret.Tween.get(this.chip_detail[_num]).to({ y: -50 },400).call(() => {
                if(this.chip_num > _num) {
                    this.removeChild(this.chip_detail[_num]);
                }
            });
        }
    }
}
