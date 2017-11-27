/**
 *
 * @游戏筹码
 *
 */
class Game_Chip extends eui.Component {
    //定义变量
    public chip_pos: number;
    public chip_gold: number;
    public chip_isshow: Boolean;
    private img_chip: eui.Image;
    private txt_gold: eui.BitmapLabel;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = Game_ChipSkin;
    }
    
    //初始界面
    info(_pos: number,_gold: number,_type:number=0): void {
        //数据赋值
        this.chip_pos = _pos;
        this.chip_gold = _gold;
        this.chip_isshow = true;

        //显示界面
        if(_type == 0) {
            if(this.chip_gold == 1000) {
                this.txt_gold.text = this.chip_gold.toString();
            }
            else {
                this.txt_gold.text = GameData.assShowGold(this.chip_gold);
            }
            this.img_chip.source = "back_g_chip" + this.chip_gold.toString() + "_png";
        }
        else {
            this.txt_gold.text = "";
            this.img_chip.source = "back_g_chipsmall" + this.chip_gold.toString() + "_png";
        }
    }
}
