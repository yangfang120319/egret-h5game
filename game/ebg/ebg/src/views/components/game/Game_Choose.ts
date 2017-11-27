/**
 *
 * @游戏-选择
 *
 */
class Game_Choose extends eui.Component {
    //定义变量
    private img_choose0: eui.Image;
    private img_choose1: eui.Image;
    private btn_choose: eui.Button[] = [];
    private _tween_alpha: egret.Tween = null;
    private game_type: number;//游戏类型(0:二八杠,1:牛牛,2:三张)
    public btn_x: number[] = [];
    public btn_y: number;

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
    }

    //显示位置
    showPlace(_type: number,_show_width: number): void {
        //定义变量
        var jiange_width: number;

        //数据赋值
        this.game_type = _type;
        this.width = _show_width;
        jiange_width = (this.width - 8 - 162 * 4) / 3;

        //显示界面
        for(var i: number = 0;i < 4;i++) {
            this.btn_choose[i].x = 4 + i * (162 + jiange_width);
            this.btn_x[i] = this.btn_choose[i].x + 17;
        }
        this.btn_y = this.btn_choose[0].y + 17;
    }

    //初始化
    info(): void {
        GameData.Game_Chip_Now=0;
        //判断显示位置
        this.img_choose0.x = this.btn_choose[GameData.Game_Chip_Now].x - 11;
        this.img_choose0.y = this.btn_choose[GameData.Game_Chip_Now].y - 13;
        this.img_choose1.x = this.btn_choose[GameData.Game_Chip_Now].x - 11;
        this.img_choose1.y = this.btn_choose[GameData.Game_Chip_Now].y - 13;

        //显示文本
        for(var i: number = 0;i < 4;i++) {
            if(GameData.Game_Chip_Gold[i] == 1000) {
                this.btn_choose[i].label = GameData.Game_Chip_Gold[i].toString();
            }
            else {
                this.btn_choose[i].label = GameData.assShowGold(GameData.Game_Chip_Gold[i]);
            }
            this.btn_choose[i].icon = "back_g_chip" + GameData.Game_Chip_Gold[i].toString() + "_png";
        }
    }
    
    //清除
    clean(): void {
        if(this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
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
        this.img_choose0.x = this.btn_choose[btnnum].x - 11;
        this.img_choose0.y = this.btn_choose[btnnum].y - 13;
        this.img_choose1.x = this.btn_choose[btnnum].x - 11;
        this.img_choose1.y = this.btn_choose[btnnum].y - 13;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
}