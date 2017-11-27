/**
 *
 * @夜市场-结算
 *
 */
class YSC_Over extends eui.Component {
    //定义变量
    private g_detail: eui.Group;
    private txt_total: eui.Label;
    private com_hook: eui.Component;
    private txt_yazhu: eui.Label[] = [];
    private txt_qiang: eui.Label[] = [];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i: number = 0;i < 4;i++) {
            //定义变量
            var yazhu: eui.Label = this["txt_yazhu" + i];
            var qiang: eui.Label = this["txt_qiang" + i];
            
            //数据赋值
            this.txt_yazhu[i] = yazhu;
            this.txt_qiang[i] = qiang;
        }
    }
    
    //初始化界面
    info(): void {
        //定义变量
        var win_gold: number = 0;
        var rate_zoom: number = 1;
        if(basic.StageProxy.width < 1000) {
            rate_zoom = 0.8 + 0.2 * (basic.StageProxy.width - 830) / 170;
        }
        
        //显示界面
        this.g_detail.scaleX = rate_zoom;
        this.g_detail.scaleY = rate_zoom;
        
        //显示文本
        for(var i: number = 0;i < 4;i++) {
            //判断数据赋值
            if(i == GameData.YSC_RUN_OVER) {
                win_gold += GameData.YSC_YaZhu_User[i] * 3 - GameData.YSC_QiangZhu_User[i] * 3;
            }
            else {
                win_gold += GameData.YSC_QiangZhu_User[i] * 0.99 - GameData.YSC_YaZhu_User[i];
            }
            
            //判断显示
            this.txt_yazhu[i].text = GameData.assShowGold(GameData.YSC_YaZhu_User[i]);
            this.txt_qiang[i].text = GameData.assShowGold(GameData.YSC_QiangZhu_User[i]);
        }
        
        //判断显示
        if(win_gold < 0) {
            this.txt_total.text = "-" + GameData.assShowGold(-win_gold);
        }
        else {
            this.txt_total.text = GameData.assShowGold(win_gold);
        }
        
        //显示钩子
        this.com_hook.alpha = 0;
        this.com_hook.scaleX = 5;
        this.com_hook.scaleY = 5;
        this.com_hook.x = 205 + GameData.YSC_RUN_OVER * 190;
        
        //显示动画
        var _tween_alpha: egret.Tween = egret.Tween.get(this.com_hook).to({ alpha: 1 },200);
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.com_hook).wait(200).to({ scaleX: 1 },200);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.com_hook).wait(200).to({ scaleY: 1 },200);
        
        //判断播放是声音
        if(win_gold < 0) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_fail_mp3");
        }
        else{
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_win" + Math.floor(Math.random() * 2 + 1).toString() + "_mp3");
        }
    }
}
