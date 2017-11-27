/**
 *
 * @开始界面
 *
 */
class ScenesStart extends basic.SceneBase {
    //定义变量
    private win: Action_Win;
    private lose: Action_Lose;
    private btn_pk: eui.Button;
    private rect_back: eui.Rect;
    private btn_win0: eui.Button;
    private btn_win1: eui.Button;
    private btn_win2: eui.Button;
    private btn_lose0: eui.Button;
    private btn_lose1: eui.Button;
    private btn_start: eui.Button;
    private startaction: StartAction;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = ScenesStartSkin;
        
        //注册按钮
        this.btn_pk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPkBtn,this);
        this.btn_win0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWinBtn0,this);
        this.btn_win1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWinBtn1,this);
        this.btn_win2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onWinBtn2,this);
        this.btn_lose0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoseBtn0,this);
        this.btn_lose1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLoseBtn1,this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtn,this);
    }
    
    //挑战胜利
    private onWinBtn0(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        
        //显示界面
        this.win.start(0);
        this.win.visible = true;
        this.lose.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    }
    
    //挑战完成
    private onWinBtn1(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        
        //显示界面
        this.win.start(1);
        this.win.visible = true;
        this.lose.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    }
    
    //闯关成功
    private onWinBtn2(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        
        //显示界面
        this.win.start(2);
        this.win.visible = true;
        this.lose.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    }
    
    //挑战成功
    private onLoseBtn0(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        
        //显示界面
        this.lose.start(0);
        this.lose.visible = true;
        this.win.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    }
    
    //闯关成功
    private onLoseBtn1(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        
        //显示界面
        this.lose.start(1);
        this.lose.visible = true;
        this.win.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    }
    
    //PK按钮
    private onPkBtn(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        
        //显示界面
        this.win.visible = false;
        this.lose.visible = false;
        this.rect_back.visible = false;
        basic.SceneManager.addBottomScene("PK");
        this.startaction.visible = false;
        this.startaction.clean();
    }
    
    //开始按钮
    private onStartBtn(e: egret.TouchEvent): void {
        //判断显示
        if(this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }

        //显示界面
        this.win.visible = false;
        this.lose.visible = false;
        this.rect_back.visible = false;
        this.startaction.visible = true;
        this.startaction.info();
    }
    
    
}
