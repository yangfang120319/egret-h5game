/**
 *
 * @二八杠-发送麻将
 *
 */
class EBG_SendMahjong extends eui.Component {
    //定义变量
    private total_table_y: number;
    private table_y: number[] = [];
    private g_mahjong: eui.Group[] = [];
    private img_mahjong: eui.Image[] = [];
    private send_to_x: number[] = [];
    private send_to_y: number[] = [];

    //初始化
    createChildren(): void {
        super.createChildren();

        //数据赋值
        for(var i: number = 0;i < 4;i++) {
            //定义变量
            var g_mah: eui.Group = this["g_mahjong" + i];
            var img_mah: eui.Image = this["img_mahjong" + i];

            //数据赋值
            this.g_mahjong[i] = g_mah;
            this.img_mahjong[i] = img_mah;
        }
        //console.info(33);

        //清除界面
        this.clean();
    }

    //初始化界面
    info(_to_x: any,_to_y: any): void {
        //数据赋值
        this.send_to_x = _to_x;
        this.send_to_y = _to_y;
    }

    //清除界面
    private clean(): void {
        //清除界面
        for(var i: number = 0;i < 4;i++) {
            this.img_mahjong[i].x = 0;
            this.img_mahjong[i].y = 0;
            this.g_mahjong[i].y = 105;
            this.g_mahjong[i].scaleX = 0.5;
            this.g_mahjong[i].scaleY = 0.5;
            this.g_mahjong[i].visible = false;
            this.g_mahjong[i].x = (basic.StageProxy.width - 135) / 2 + i * 33;
        }
    }

    //开始发牌
    public start(): void {
        //清除界面
        this.clean();
        //显示牌动画
        if(GameData.EBG_Game_Status == 2) {
            this.showMahjong();
        }
    }

    //显示牌动画
    private showMahjong(): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend1_mp3");

        //显示界面
        for(var i: number = 0;i < 4;i++) {
            this.g_mahjong[i].alpha = 0;
            this.g_mahjong[i].visible = true;
        }

        //开始动画
        var _tween_alpha0: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ alpha: 1 },100);
        var _tween_alpha1: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ alpha: 1 },100);
        var _tween_alpha2: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ alpha: 1 },100);
        var _tween_alpha3: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ alpha: 1 },100);
        var _tween_y0: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ y: 265 },300);
        var _tween_y1: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ y: 265 },300);
        var _tween_y2: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ y: 265 },300);
        var _tween_y3: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ y: 265 },300).wait(300).call(() => {
            if(GameData.EBG_Game_Status != 2) {
                //清除界面
                this.clean();
            }
            else {
                //发送第一张
                this.sendMahjong0();
            }
        });
    }

    //发送第一张桌子
    private sendMahjong0(): void {
        //显示最上层
        this.setChildIndex(this.g_mahjong[0],this.numChildren - 1);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");

        //开始动画
        var _tween_x: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ x: this.send_to_x[0] },400);
        var _tween_y: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ y: this.send_to_y[0] },400);
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ scaleX: 1 },400);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ scaleY: 1 },400).wait(100).call(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");

            //显示动画
            var _tween_img_x: egret.Tween = egret.Tween.get(this.img_mahjong[0]).to({ x: 71 },150).call(() => {
                var _tween_img_y: egret.Tween = egret.Tween.get(this.img_mahjong[0]).to({ y: 20 },80).wait(300).call(() => {
                    if(GameData.EBG_Game_Status != 2) {
                        //清除界面
                        this.clean();
                    }
                    else {
                        //发送第二张
                        this.sendMahjong1();
                    }
                });
            });
        });
    }

    //发送第二张
    private sendMahjong1(): void {
        //显示最上层
        this.setChildIndex(this.g_mahjong[1],this.numChildren - 1);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");

        //开始动画
        var _tween_x: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ x: this.send_to_x[1] },500);
        var _tween_y: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ y: this.send_to_y[1] },500);
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ scaleX: 1 },500);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ scaleY: 1 },500).wait(100).call(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");

            //显示动画
            var _tween_img_x: egret.Tween = egret.Tween.get(this.img_mahjong[1]).to({ x: 71 },150).call(() => {
                var _tween_img_y: egret.Tween = egret.Tween.get(this.img_mahjong[1]).to({ y: 20 },80).wait(300).call(() => {
                    if(GameData.EBG_Game_Status != 2) {
                        //清除界面
                        this.clean();
                    }
                    else {
                        //发送第三张
                        this.sendMahjong2();
                    }
                });
            });
        });
    }

    //发送第二张
    private sendMahjong2(): void {
        //显示最上层
        this.setChildIndex(this.g_mahjong[2],this.numChildren - 1);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");

        //开始动画
        var _tween_x: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ x: this.send_to_x[2] },400);
        var _tween_y: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ y: this.send_to_y[2] },400);
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ scaleX: 1 },400);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ scaleY: 1 },400).wait(100).call(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");

            //显示动画
            var _tween_img_x: egret.Tween = egret.Tween.get(this.img_mahjong[2]).to({ x: 71 },150).call(() => {
                var _tween_img_y: egret.Tween = egret.Tween.get(this.img_mahjong[2]).to({ y: 20 },80).wait(300).call(() => {
                    if(GameData.EBG_Game_Status != 2) {
                        //清除界面
                        this.clean();
                    }
                    else {
                        //发送第三张
                        this.sendMahjong3();
                    }
                });
            });
        });
    }

    //发送第庄
    private sendMahjong3(): void {
        //显示最上层
        this.setChildIndex(this.g_mahjong[3],this.numChildren - 1);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_mahjongsend2_mp3");

        //开始动画
        var _tween_x: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ x: this.send_to_x[3] },400);
        var _tween_y: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ y: this.send_to_y[3] },400);
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ scaleX: 1 },400);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ scaleY: 1 },400).wait(100).call(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_mahjongdown_mp3");

            //显示动画
            var _tween_img_x: egret.Tween = egret.Tween.get(this.img_mahjong[3]).to({ x: 71 },150).call(() => {
                var _tween_img_y: egret.Tween = egret.Tween.get(this.img_mahjong[3]).to({ y: 20 },80).call(() => {
                    if(GameData.EBG_Game_Status != 2) {
                        //清除界面
                        this.clean();
                    }
                    else {
                        //清除麻将
                        this.clean();

                        //发送消息
                        basic.Dispatcher.dispatch(EventNames.EBG_SEND_MAHJONGOVER);
                    }
                });
            });
        });
    }
}