/**
 * Created by jq 2016/2/8.
 */

module basic {
    export class PanelBase extends eui.Component {
        //定义变量
        protected showEffect: any;
        protected showEffectParams: any;
        protected closeEffect: any;
        protected closeEffectParams: any;
        protected popupShowBanner: boolean;
        protected _callback: Function;
        protected _excludeActionsClose: string[] = [];
        
        //初始化
        constructor(showEffect: any = null,showEffectParams: any = null,closeEffect: any = null,closeEffectParams: any = null,popupShowBanner: boolean = true) {
            super();
            
            //显示数据赋值
            this.showEffect = showEffect || basic.dialogEffect.None;
            this.showEffectParams = showEffectParams;
            
            //关闭数据赋值
            this.closeEffect = closeEffect || basic.dialogEffect.None;
            this.closeEffectParams = closeEffectParams;
            
            //数据赋值
            this.popupShowBanner = popupShowBanner;
            
            //初始化
            this.init();
        }
        
        //初始化
        protected init(): void {

        }
        
		//添加不用关闭的动作
        addExcludeForClose(actions: string[]): void {
            //数据赋值
            this._excludeActionsClose = this._excludeActionsClose.concat(actions);
        }
        
        //退出函数
        dealAction(action: string = null,data: any = null): void {
            //判断是否调用callback
            if(this._callback) {
                this._callback(action || 'close',data);
            }
            
            //判断退出
            if(this._excludeActionsClose.indexOf(action) < 0) {
                this.close();
            }
        }
        
        //显示对话框
        popup(modalTouchFun: Function = null,modal: boolean = true): void {
            basic.PopUpManager.addPopUp(this,this.showEffect,this.showEffectParams,modalTouchFun,modal);
        }
        
        //关闭对话框
        close(): void {
            basic.PopUpManager.removePopUp(this,this.closeEffect,this.closeEffectParams);
        }
    }
}