/**
 *
 * @author 
 *
 */
class EBG_ChipFly extends eui.Component {
    //缓动变量
    private chip_num: number = 0;
    private chip_img: eui.Image[] = [];
    private _tween_x: egret.Tween = null;
    private _tween_y: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;
    private _tween_scaleX: egret.Tween = null;
    private _tween_scaleY: egret.Tween = null;
    private move_to_x: number[] = [20,240,460];
    private move_to_y: number[] = [140,330,140];
    private move_width: number = 160;
    private move_height: number = 180;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //初始化筹码
    info(): void {
        //初始化筹码
        for(var i:number=0;i<3;i++){
            for(var j: number = 0;j < GameData.EBG_Poker_Table_InfoChip[i].length;j++) {
                //显示筹码
                this.showChip(String(Math.floor(GameData.EBG_Poker_Table_InfoChip[i][j] / 10000)).length - 1,i)
            }
        }
    }
    
    //清除界面
    clean(): void {
        //移除筹码
        for(var i: number = 0;i < this.chip_num;i++) {
            this.removeChild(this.chip_img[i]);
        }

        //清除数据
        this.chip_num = 0;
        this.chip_img = [];
    }

    //发送筹码
    sendChip(_type:number,_chiptype:number,_table:number):void{
        //定义变量
        var img_chip: eui.Image = new eui.Image();
        var move_x: number = this.move_to_x[_table] + Math.random() * (this.move_width - 45);
        var move_y: number = this.move_to_y[_table] + Math.random() * (this.move_height - 45);

        //定义筹码
        img_chip.source = "icon_smallchip" + _chiptype + "_png";

        //判断显示
        if(_type == 0) {
            //定义位置
            img_chip.y = 553;
            img_chip.scaleX = 1.65;
            img_chip.scaleY = 1.65;
            img_chip.x = 137 + 84 * _chiptype;
        }
        else if(_type == 1) {
            img_chip.x = 586;
            img_chip.y = (175 - 45) / 2 - 20;
        }

        //显示筹码
        this.chip_img[this.chip_num] = img_chip;
        this.addChild(this.chip_img[this.chip_num]);

        //判断显示动画
        if(this.chip_img[this.chip_num].scaleX > 1) {
            this._tween_scaleX = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ scaleX: 1 },300,egret.Ease.circOut);
            this._tween_scaleY = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ scaleY: 1 },300,egret.Ease.circOut);
        }
        this._tween_x = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ x: move_x },800,egret.Ease.circOut);
        this._tween_y = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ y: move_y },800,egret.Ease.circOut);

        //数据赋值
        this.chip_num += 1;
    }

    //显示筹码
    showChip(_chiptype: number,_table: number):void{
        //定义变量
        var img_chip: eui.Image = new eui.Image();
        var move_x: number = this.move_to_x[_table] + Math.random() * (this.move_width - 45);
        var move_y: number = this.move_to_y[_table] + Math.random() * (this.move_height - 45);

        //定义筹码
        img_chip.source = "icon_smallchip" + _chiptype + "_png";

        //定义筹码位置
        img_chip.x = move_x;
        img_chip.y = move_y;

        //显示筹码
        this.chip_img[this.chip_num] = img_chip;
        this.addChild(this.chip_img[this.chip_num]);
        this.chip_num += 1;
    }
}
