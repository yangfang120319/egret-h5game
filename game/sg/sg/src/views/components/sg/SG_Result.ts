/**
 *
 * @author 
 *
 */
class SG_Result extends eui.Component {
    //定义变量
    private rect_back1: eui.Rect;
    private rect_back2: eui.Rect;
    private rect_back3: eui.Rect;
    private rect_back4: eui.Rect;
    private img_shan1: eui.Image;
    private img_shan2: eui.Image;
    private img_shan3: eui.Image;
    private img_shan4: eui.Image;
    private com_bird: eui.Component;
    private img_beishu1: eui.Image;
    private img_beishu2: eui.Image;
    private img_beishu3: eui.Image;
    private img_beishu4: eui.Image;
    private img_ji: eui.Image;
    private img_yao: eui.Image;
    private g_caishen: eui.Group;
    private img_dianshu2: eui.Image;
    private img_dianshu3: eui.Image;
    private img_dianshu4: eui.Image;
    private img_caishen0: eui.Image;
    private img_caishen1: eui.Image;
    private img_caishen2: eui.Image;
    private g_light: eui.Group;
    
    //数据变量
    private num_resout_num: number;
    private num_resout_type: number;
    private fun_callback: Function;
    private num_nowaction: number;
    private _tween_back: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;
    private _tween_bird_x: egret.Tween = null;
    private _tween_bird_y: egret.Tween = null;
    private _tween_bird_alpha: egret.Tween = null;
    private _tween_bird_rotation: egret.Tween = null;
    private _tween_ji_x: egret.Tween = null;
    private _tween_yao_x: egret.Tween = null;
    private _tween_ji_alpha: egret.Tween = null;
    private _tween_yao_alpha: egret.Tween = null;
    private _tween_ji_scaleX: egret.Tween = null;
    private _tween_yao_scaleX: egret.Tween = null;
    private _tween_dianshu_alpha: egret.Tween = null;
    private _tween_caishen_alpha0: egret.Tween = null;
    private _tween_caishen_alpha1: egret.Tween = null;
    private _tween_caishen_alpha2: egret.Tween = null;
    private _tween_caishen_scaleX0: egret.Tween = null;
    private _tween_caishen_scaleY0: egret.Tween = null;
    private _tween_caishen_scaleX1: egret.Tween = null;
    private _tween_caishen_scaleY1: egret.Tween = null;
    private _tween_caishen_scaleX2: egret.Tween = null;
    private _tween_caishen_scaleY2: egret.Tween = null;
    private _tween_light_rotation: egret.Tween = null;
    private _tween_light_alpha: egret.Tween = null;
    private timer_action: egret.Timer = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //显示大小
        this.img_shan1.scaleX = 1.5;
        this.img_shan1.scaleY = 1.5;
        this.img_shan2.scaleX = 1.5;
        this.img_shan2.scaleY = 1.5;
        this.img_shan3.scaleX = 1.5;
        this.img_shan3.scaleY = 1.5;
        this.img_shan4.scaleX = 1.5;
        this.img_shan4.scaleY = 1.5;
    }
    
    //显示界面
    public show(_resoutnum: number,_callback: Function = null): void {
        //数据赋值
        this.fun_callback = _callback;
        this.num_resout_num = _resoutnum;
        
        //判断显示
        if(this.num_resout_num == 1) {
            //数据赋值
            this.num_resout_type = 1;

            //显示效果1
            this.showAction1();
        }
        else if(this.num_resout_num < 7) {
            //数据赋值
            this.num_resout_type = 2;

            //显示效果2
            this.showAction2();
        }
        else if(this.num_resout_num < 11) {
            //数据赋值
            this.num_resout_type = 3;

            //显示效果3
            this.showAction3();
        }
        else if(this.num_resout_num == 11) {
            //数据赋值
            this.num_resout_type = 4;

            //显示效果4
            this.showAction4();
        }

        //显示状态
        this.currentState = "type" + this.num_resout_type.toString();
    }

    //直接显示结果
    public showResult(_resoutnum: number,_callback: Function = null): void {
        //数据赋值
        this.fun_callback = _callback;
        this.num_resout_num = _resoutnum;

        //判断显示
        if(this.num_resout_num == 1) {
            //数据赋值
            this.num_resout_type = 1;

            //显示界面
            this.img_ji.x = 50;
            this.img_yao.x = 0
            this.com_bird.y = 5;
            this.com_bird.x = 18;
            this.img_ji.alpha = 1;
            this.img_yao.alpha = 1;
            this.img_shan1.alpha = 0;
            this.img_beishu1.alpha = 1;
            this.rect_back1.alpha = 1;
            this.rect_back1.scaleY = 1;
            this.com_bird.rotation = 0;
        }
        else if(this.num_resout_num < 7) {
            //数据赋值
            this.num_resout_type = 2;

            //显示界面
            this.img_shan2.alpha = 0;
            this.img_beishu2.alpha = 1;
            this.img_dianshu2.alpha = 1;
            this.rect_back2.alpha = 1;
            this.rect_back2.scaleY = 1;

            //定义图片
            this.img_dianshu2.source = "icon_sg_dianshu" + this.num_resout_num + "_png";
        }
        else if(this.num_resout_num < 11) {
            //数据赋值
            this.num_resout_type = 3;

            //显示界面
            this.img_shan3.alpha = 0;
            this.img_beishu3.alpha = 1;
            this.img_dianshu3.alpha = 1;
            this.rect_back3.alpha = 1;
            this.rect_back3.scaleY = 1;

            //定义图片
            this.img_dianshu3.source = "icon_sg_dianshu" + this.num_resout_num + "_png";
        }
        else if(this.num_resout_num ==11) {
            //数据赋值
            this.num_resout_type = 4;

            //显示界面
            this.img_shan4.alpha = 0;
            this.img_beishu4.alpha = 1;
            this.img_dianshu4.alpha = 1;
            this.rect_back4.alpha = 1;
            this.rect_back4.scaleY = 1;
            this.img_caishen0.alpha = 0;
            this.img_caishen1.alpha = 0;
            this.img_caishen2.alpha = 0;
            this.g_caishen.alpha = 0;
        }

        //显示状态
        this.currentState = "type" + this.num_resout_type.toString();
    }
    
    //显示效果1
    private showAction1(): void {
        //显示效果
        this.com_bird.x = 340;
        this.com_bird.y = -65;
        this.img_ji.alpha = 0;
        this.img_yao.alpha = 0;
        this.com_bird.alpha = 0;
        this.img_shan1.alpha = 0;
        this.img_beishu1.alpha = 0;
        this.com_bird.rotation = -50;
        this.img_ji.x = 170;
        this.img_yao.x = -120;
        
        //显示动画
        this.showActionBack(this.rect_back1,() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_sg_dian" + this.num_resout_num + "_mp3");
            
            //显示幺鸡动画
            this.showActionYaoJi();
        });
    }

    //显示效果2
    private showAction2(): void {
        //显示效果
        this.img_shan2.alpha = 0;
        this.img_beishu2.alpha = 0;
        this.img_dianshu2.alpha = 0;
        
        //显示界面
        this.img_dianshu2.source = "icon_sg_dianshu" + this.num_resout_num + "_png";

        //显示动画
        this.showActionBack(this.rect_back2,() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_sg_dian" + this.num_resout_num + "_mp3");
            
            //显示点数动画
            this.showActionDianShu(this.img_dianshu2,this.img_beishu2);
        });
    }

    //显示效果3
    private showAction3(): void {
        ///显示效果
        this.img_shan3.alpha = 0;
        this.img_beishu3.alpha = 0;
        this.img_dianshu3.alpha = 0;

        //显示界面
        this.img_dianshu3.source = "icon_sg_dianshu" + this.num_resout_num + "_png";

        //显示动画
        this.showActionBack(this.rect_back3,() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_sg_dian" + this.num_resout_num + "_mp3");
            
            //显示点数动画
            this.showActionDianShu(this.img_dianshu3,this.img_beishu3);
        });
    }

    //显示效果4
    private showAction4(): void {
        //显示效果
        this.g_light.alpha = 0;
        this.g_caishen.alpha = 1;
        this.img_shan4.alpha = 0;
        this.img_beishu4.alpha = 0;
        this.img_dianshu4.alpha = 0;
        this.img_caishen0.alpha = 0;
        this.img_caishen1.alpha = 0;
        this.img_caishen2.alpha = 0;
        this.img_caishen0.scaleX = 0;
        this.img_caishen1.scaleX = 0;
        this.img_caishen2.scaleX = 0;
        this.img_caishen0.scaleY = 0;
        this.img_caishen1.scaleY = 0;
        this.img_caishen2.scaleY = 0;
        
        //显示动画
        this.showActionBack(this.rect_back4,() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_sg_dian" + this.num_resout_num + "_mp3");
            
            //显示三公动画
            this.showActionSanGong();
        });
    }
    
    //显示幺鸡动画
    private showActionYaoJi():void{
        //定义变量
        var num_show_speed: number = 300;
        
        //显示鸟动画
        this._tween_bird_x = egret.Tween.get(this.com_bird).to({ x: 18 },300);
        this._tween_bird_y = egret.Tween.get(this.com_bird).to({ y: 5 },300);
        this._tween_bird_alpha = egret.Tween.get(this.com_bird).to({ alpha: 1 },100);
        this._tween_bird_rotation = egret.Tween.get(this.com_bird).to({ rotation: 0 },300).wait(400).call(()=>{
            //显示幺鸡动画
            this._tween_ji_alpha = egret.Tween.get(this.img_ji).to({ alpha: 1 },num_show_speed / 2);
            this._tween_yao_alpha = egret.Tween.get(this.img_yao).to({ alpha: 1 },num_show_speed / 2);
            this._tween_yao_x = egret.Tween.get(this.img_yao).to({ x: 0 },num_show_speed,egret.Ease.backOut);
            this._tween_ji_scaleX = egret.Tween.get(this.img_ji).wait(num_show_speed * 30 / 100).to({ scaleX: 0.5 },4 * num_show_speed / 20).wait(num_show_speed / 8).to({ scaleX: 1 },4 * num_show_speed / 20);
            this._tween_yao_scaleX = egret.Tween.get(this.img_yao).wait(num_show_speed * 30 / 100).to({ scaleX: 0.5 },4 * num_show_speed / 20).wait(num_show_speed / 8).to({ scaleX: 1 },4 * num_show_speed / 20);
            this._tween_ji_x = egret.Tween.get(this.img_ji).to({ x: 50 },num_show_speed,egret.Ease.backOut).wait(200).call(()=>{
                //显示特效动画
                this.showActionSpecial();
                
                //显示倍数
                this._tween_alpha = egret.Tween.get(this.img_beishu1).to({ alpha: 1 },300).call(()=>{
                    //显示回调函数
                    if(this.fun_callback) {
                        this.fun_callback();
                    }
                });
            });
        });
    }
    
    //显示点数动画
    private showActionDianShu(_dianshu:eui.Image,_beishu:eui.Image): void {
        //显示点数
        this._tween_dianshu_alpha = egret.Tween.get(_dianshu).to({ alpha: 1 },300).wait(200).call(()=>{
            //显示特效动画
            this.showActionSpecial();
            
            //显示倍数
            this._tween_alpha = egret.Tween.get(_beishu).to({ alpha: 1 },300).call(() => {
                //显示回调函数
                if(this.fun_callback) {
                    this.fun_callback();
                }
            });
        });
    }
    
    //显示三公动画
    private showActionSanGong(): void {
        //显示三公动画
        this._tween_caishen_alpha0 = egret.Tween.get(this.img_caishen0).to({ alpha: 1 },100);
        this._tween_caishen_alpha1 = egret.Tween.get(this.img_caishen1).wait(250).to({ alpha: 1 },100);
        this._tween_caishen_alpha2 = egret.Tween.get(this.img_caishen2).wait(500).to({ alpha: 1 },100);
        this._tween_caishen_scaleX0 = egret.Tween.get(this.img_caishen0).to({ scaleX: 1 },300);
        this._tween_caishen_scaleY0 = egret.Tween.get(this.img_caishen0).to({ scaleY: 1 },300);
        this._tween_caishen_scaleX1 = egret.Tween.get(this.img_caishen1).wait(250).to({ scaleX: 0.7 },300);
        this._tween_caishen_scaleY1 = egret.Tween.get(this.img_caishen1).wait(250).to({ scaleY: 0.7 },300);
        this._tween_caishen_scaleX2 = egret.Tween.get(this.img_caishen2).wait(500).to({ scaleX: 0.7 },300);
        this._tween_caishen_scaleY2 = egret.Tween.get(this.img_caishen2).wait(500).to({ scaleY: 0.7 },300).wait(100).call(()=>{
            //显示点数
            this._tween_dianshu_alpha = egret.Tween.get(this.img_dianshu4).to({ alpha: 1 },300).wait(200).call(() => {
                //显示发光
                this.g_light.alpha = 1;
                this._tween_light_rotation = egret.Tween.get(this.g_light,{ loop: true }).
                    to({ rotation: 360 },5000);
                
                //显示特效动画
                this.showActionSpecial();
                
                //显示倍数
                this._tween_alpha = egret.Tween.get(this.img_beishu4).to({ alpha: 1 },300).wait(1000).call(() => {
                    this._tween_light_alpha = egret.Tween.get(this.g_light).to({ alpha: 0 },200);
                    this._tween_alpha = egret.Tween.get(this.g_caishen).to({ alpha: 0 },500).call(() => {
                        //判断停止
                        if(this._tween_light_rotation) {
                            this._tween_light_rotation.setPaused(true);
                            this._tween_light_rotation = null;
                        }
                        
                        //显示回调函数
                        if(this.fun_callback) {
                            this.fun_callback();
                        }
                    });
                });
            });
        });
    }
    
    //底效果
    private showActionBack(_rect: eui.Rect,_callback: Function = null): void {
        //显示底动画
        _rect.alpha = 0;
        _rect.scaleY = 0;
        this._tween_alpha = egret.Tween.get(_rect).to({ alpha: 1 },50);
        this._tween_back = egret.Tween.get(_rect).
            to({ scaleY: 1.4 },100).wait(40).
            to({ scaleY: 0.8 },30).
            to({ scaleY: 1.1 },30).wait(20).
            to({ scaleY: 0.95 },30).
            to({ scaleY: 1 },30).
            call(() => {
                if(_callback) {
                    _callback();
                }
            });
    }
    
    //显示效果动画
    private showActionSpecial(): void {
        //定义变量
        var num_times: number;

        //判断赋值
        if(this.num_resout_type == 1) {
            num_times = 3;
            this.img_shan1.alpha = 1;
            this.showSpecialPicture("icon_sg_shan0_png");
        }
        else if(this.num_resout_type == 2) {
            num_times = 3;
            this.img_shan2.alpha = 1;
            this.showSpecialPicture("icon_sg_shan0_png");
        }
        else if(this.num_resout_type == 3) {
            num_times = 4;
            this.img_shan3.alpha = 1;
            this.showSpecialPicture("icon_sg_dian0_png");
        }
        else if(this.num_resout_type == 4) {
            num_times = 6;
            this.img_shan4.alpha = 1;
            this.showSpecialPicture("icon_sg_bao0_png");
        }

        //显示界面
        this.num_nowaction = 0;
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_sg_texiao_mp3");
        
        //显示动画
        this.timer_action = new egret.Timer(60,num_times);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.showActionSpecialComplete,this);
        this.timer_action.start();
    }

    //动作显示
    private showActionSpecialTimer(e: egret.TimerEvent): void {
        //数据赋值
        this.num_nowaction += 1;

        //判断显示图片
        if(this.num_resout_type == 1) {
            this.showSpecialPicture("icon_sg_shan" + this.num_nowaction + "_png");
        }
        else if(this.num_resout_type == 2) {
            this.showSpecialPicture("icon_sg_shan" + this.num_nowaction + "_png");
        }
        else if(this.num_resout_type == 3) {
            this.showSpecialPicture("icon_sg_dian" + this.num_nowaction + "_png");
        }
        else if(this.num_resout_type == 4) {
            this.showSpecialPicture("icon_sg_bao" + this.num_nowaction + "_png");
        }
    }

    //动画结束
    private showActionSpecialComplete(e: egret.TimerEvent): void {
        //停止
        if(this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.showActionSpecialComplete,this);
            this.timer_action = null;
        }

        //消失动画
        if(this.num_resout_type == 1) {
            this._tween_alpha = egret.Tween.get(this.img_shan1).to({ alpha: 0 },500);
        }
        else if(this.num_resout_type == 2) {
            this._tween_alpha = egret.Tween.get(this.img_shan2).to({ alpha: 0 },500);
        }
        else if(this.num_resout_type == 3) {
            this._tween_alpha = egret.Tween.get(this.img_shan3).to({ alpha: 0 },500);
        }
        else if(this.num_resout_type == 4) {
            this._tween_alpha = egret.Tween.get(this.img_shan4).to({ alpha: 0 },500);
        }
    }

    //显示效果图片
    private showSpecialPicture(_source: string): void {
        //判断显示
        if(this.num_resout_type == 1) {
            this.img_shan1.source = _source;
        }
        else if(this.num_resout_type == 2) {
            this.img_shan2.source = _source;
        }
        else if(this.num_resout_type == 3) {
            this.img_shan3.source = _source;
        }
        else if(this.num_resout_type == 4) {
            this.img_shan4.source = _source;
        }
    }
    
    //停止动画
    public stopAction(): void {
        //停止缓动
        if(this._tween_back) {
            this._tween_back.setPaused(true);
            this._tween_back = null;
        }
        if(this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
        if(this._tween_bird_x) {
            this._tween_bird_x.setPaused(true);
            this._tween_bird_x = null;
        }
        if(this._tween_bird_y) {
            this._tween_bird_y.setPaused(true);
            this._tween_bird_y = null;
        }
        if(this._tween_bird_alpha) {
            this._tween_bird_alpha.setPaused(true);
            this._tween_bird_alpha = null;
        }
        if(this._tween_bird_rotation) {
            this._tween_bird_rotation.setPaused(true);
            this._tween_bird_rotation = null;
        }
        if(this._tween_ji_x) {
            this._tween_ji_x.setPaused(true);
            this._tween_ji_x = null;
        }
        if(this._tween_yao_x) {
            this._tween_yao_x.setPaused(true);
            this._tween_yao_x = null;
        }
        if(this._tween_ji_alpha) {
            this._tween_ji_alpha.setPaused(true);
            this._tween_ji_alpha = null;
        }
        if(this._tween_yao_alpha) {
            this._tween_yao_alpha.setPaused(true);
            this._tween_yao_alpha = null;
        }
        if(this._tween_ji_scaleX) {
            this._tween_ji_scaleX.setPaused(true);
            this._tween_ji_scaleX = null;
        }
        if(this._tween_yao_scaleX) {
            this._tween_yao_scaleX.setPaused(true);
            this._tween_yao_scaleX = null;
        }
        if(this._tween_dianshu_alpha) {
            this._tween_dianshu_alpha.setPaused(true);
            this._tween_dianshu_alpha = null;
        }
        if(this._tween_caishen_alpha0) {
            this._tween_caishen_alpha0.setPaused(true);
            this._tween_caishen_alpha0 = null;
        }
        if(this._tween_caishen_alpha1) {
            this._tween_caishen_alpha1.setPaused(true);
            this._tween_caishen_alpha1 = null;
        }
        if(this._tween_caishen_alpha2) {
            this._tween_caishen_alpha2.setPaused(true);
            this._tween_caishen_alpha2 = null;
        }
        if(this._tween_caishen_scaleX0) {
            this._tween_caishen_scaleX0.setPaused(true);
            this._tween_caishen_scaleX0 = null;
        }
        if(this._tween_caishen_scaleY0) {
            this._tween_caishen_scaleY0.setPaused(true);
            this._tween_caishen_scaleY0 = null;
        }
        if(this._tween_caishen_scaleX1) {
            this._tween_caishen_scaleX1.setPaused(true);
            this._tween_caishen_scaleX1 = null;
        }
        if(this._tween_caishen_scaleY1) {
            this._tween_caishen_scaleY1.setPaused(true);
            this._tween_caishen_scaleY1 = null;
        }
        if(this._tween_caishen_scaleX2) {
            this._tween_caishen_scaleX2.setPaused(true);
            this._tween_caishen_scaleX2 = null;
        }
        if(this._tween_caishen_scaleY2) {
            this._tween_caishen_scaleY2.setPaused(true);
            this._tween_caishen_scaleY2 = null;
        }
        if(this._tween_light_rotation) {
            this._tween_light_rotation.setPaused(true);
            this._tween_light_rotation = null;
        }
        if(this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        
        //停止等待
        if(this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.showActionSpecialComplete,this);
            this.timer_action = null;
        }
    }
}
