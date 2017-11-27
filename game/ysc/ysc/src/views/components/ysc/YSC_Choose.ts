/**
 *
 * @夜市场-选择
 *
 */
class YSC_Choose extends eui.Component {
    //定义变量
    private img_choose: eui.Image;
    private img_choose1: eui.Image;
    private btn_choosechip: eui.Button;
    private btn_choose: eui.Button[] = [];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i: number = 0;i < 4;i++) {
            //定义变量
            var btn: eui.Button = this["btn_choose" + i];
            
            //数据赋值
            this.btn_choose[i] = btn;

            //注册按钮
            this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }
        
        //注册按钮
        this.btn_choosechip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseChipBtn,this);
    }
    
    //初始化
    info(): void {
        //console.info(33);
        GameData.Game_Chip_Now=1;
        //判断显示位置
        this.img_choose.x = this.btn_choose[GameData.Game_Chip_Now].x - 14;
        this.img_choose.y = this.btn_choose[GameData.Game_Chip_Now].y - 15;
        this.img_choose1.x = this.btn_choose[GameData.Game_Chip_Now].x - 14;
        this.img_choose1.y = this.btn_choose[GameData.Game_Chip_Now].y - 15;

        GameData.Game_Chip_Gold=[100,500,1000,2500];
        //显示文本
        for(var i: number = 0;i < 4;i++) {
            if(GameData.Game_Chip_Gold[i] == 1000) {
                this.btn_choose[i].label = GameData.Game_Chip_Gold[i].toString();
            }
            else {
                this.btn_choose[i].label = GameData.assShowGold(GameData.Game_Chip_Gold[i]);
            }
            this.btn_choose[i].icon = "back_ysc_chip" + GameData.Game_Chip_Gold[i].toString() + "_png";
        }
    }
    
    //选择按钮
    private onChooseBtn(e: egret.TouchEvent): void {
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //数据赋值
        GameData.Game_Chip_Now = btnnum;
        
        //保存数据
        GameData.saveNowChip();
        
        //判断显示位置
        this.img_choose.x = this.btn_choose[btnnum].x-14;
        this.img_choose.y = this.btn_choose[btnnum].y - 15;
        this.img_choose1.x = this.btn_choose[btnnum].x - 14;
        this.img_choose1.y = this.btn_choose[btnnum].y - 15;
        
        //播放声音
       // basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
    
    //选择筹码按钮
    private onChooseChipBtn(e:egret.TouchEvent):void{
        //播放声音
        //basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示界面
        Panel_ChooseChip.instance.show(0,() => {
            //显示界面
            //GameData.Game_Chip_Gold=[100,500,1000,2500];
            for(var i: number = 0;i < 4;i++) {
                if(GameData.Game_Chip_Gold[i] == 1000) {
                    this.btn_choose[i].label = GameData.Game_Chip_Gold[i].toString();
                }
                else {
                    this.btn_choose[i].label = GameData.assShowGold(GameData.Game_Chip_Gold[i]);
                }
                this.btn_choose[i].icon = "back_ysc_chip" + GameData.Game_Chip_Gold[i].toString() + "_png";
            }
        });
    }
}
