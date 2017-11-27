/**
 * Created by jq on 2014/12/10.
 */

module basic {
    export class PopUpManager {
        //封装
        private static _instance: PopUpManager;
        public static get instance(): PopUpManager {
            if(PopUpManager._instance == undefined) {
                PopUpManager._instance = new PopUpManager();
            }
            return PopUpManager._instance;
        }
        
        //定义变量
        static modalMaskColor: number = 0;
        static modalMaskAlpha: number = 0.6;
        static modalMaskDuration: number = 200;
        static modalMaskIsShow: Boolean = true;
        
        //显示对话框
        static addPopUp(target: eui.Component,effectClazz: any = null,effectParams: any = null,modalTouchFun: Function = null,modal: boolean = true): void {
            PopUpManager.instance.addPopUp(target,effectClazz,effectParams,modalTouchFun,modal);
        }
        
        //移除对话框
        static removePopUp(target: eui.Component,effectClazz: any = null,effectParams: any = null): void {
            PopUpManager.instance.removePopUp(target,effectClazz,effectParams);
        }
        
        //定义变量
        private _modalMask: eui.Rect;
        private _pupUpStack: Array<any> = [];
        private _popLayer: eui.Group;
        
        //初始化
        constructor() {
            this._popLayer = SceneManager.instance.popLayer;
        }
        
        //显示对话框
        addPopUp(target: eui.Component,effectClazz: any = null,effectParams: any = null,modalTouchFun: Function = null,modal: boolean = true): void {
            //判断是否显示
            if(target.parent) {
                return;
            }
            
            //数据赋值
            this._pupUpStack.unshift({ target: target,modalTouchFun: modalTouchFun,modal: modal });
            
            //显示遮罩
            this.updateModalMask(this._pupUpStack[0]);
            
            //显示界面
            var effect: dialogEffect.IDialogEffect = this.createEffectInstance(effectClazz);
            effect.show(target,this._popLayer,function(): void {
                
            },this,effectParams);
        }
        
        //移除界面
        removePopUp(target: eui.Component,effectClazz: any = null,effectParams: any = null): void {
            //判断是否显示
            if(!target.parent) {
                return;
            }
            
            
            this.getInStack(target,true);
            var aimItem: any;
            this._pupUpStack.some(function(item: any): boolean {
                if(item.modal) {
                    aimItem = item;
                    return true;
                }
            });

            if(aimItem) {
                this.updateModalMask(aimItem);
            } 
            else {
                this.setModalMaskVisible(false);
            }

            var effect: dialogEffect.IDialogEffect = this.createEffectInstance(effectClazz);
            effect.hide(target,this._popLayer,function(): void {

            },this,effectParams);
        }
        
        removeTopPupUp(): boolean {
            if(this._popLayer.numChildren > 0) {
                var top = this._popLayer.getChildAt(this._popLayer.numChildren - 1);
                top['close']();
                return true;
            }
            return false;
        }
        
        getInStack(target: egret.DisplayObjectContainer,del: boolean = false): any {
            var data: any;
            this._pupUpStack.some(function(item: any,index: number): boolean {
                if(item.target == target) {
                    data = { item: item,index: index };
                    return true;
                }
            });

            if(data && del) {
                this._pupUpStack.splice(data.index,1);
            }

            return data;
        }

        createEffectInstance(effectClazz: any = null): dialogEffect.IDialogEffect {
            var effect: dialogEffect.IDialogEffect;
            if(effectClazz) {
                effect = new effectClazz();
            } else {
                effect = new basic.dialogEffect.None();
            }

            return effect;
        }
        
        //判断调用函数
        private onModalMaskTap(event: egret.TouchEvent): void {
            var item: any = this._pupUpStack[0];
            if(item && item.modal && item.modalTouchFun) {
                item.modalTouchFun();
            }
        }

        updateModalMask(item: any): void {
            var maskIndex: number = this._popLayer.getChildIndex(this._modalMask);
            var index: number = this._popLayer.getChildIndex(item.target);
            if(maskIndex != index - 1) {
                this.setModalMaskVisible(true,index);
            }
        }
        
        //设置遮罩显示
        setModalMaskVisible(visible: boolean,index: number = -1): void {
            //判断显示
            if(visible) {
                //设置遮罩颜色和透明度
                this.modalMask.fillColor = PopUpManager.modalMaskColor;
                this.modalMask.fillAlpha = PopUpManager.modalMaskAlpha;
                this.modalMask.alpha = 0;
                
                //判断显示遮罩
                if(PopUpManager.modalMaskIsShow == false) {
                    this.modalMask.visible = false;
                }
                else {
                    this.modalMask.visible = true;
                }
                
                //判断显示
                if(index >= 0) {
                    this.setModalMaskVisible(true);
                    this._popLayer.addChildAt(this.modalMask,index);
                } 
                else {
                    this._popLayer.addChild(this.modalMask);
                }
                
                //显示遮罩
                egret.Tween.get(this.modalMask).to({ alpha: 1 },PopUpManager.modalMaskDuration);
            } 
            else {
                if(this.modalMask.parent) {
                    //隐藏遮罩
                    egret.Tween.get(this.modalMask).to({ alpha: 0 },PopUpManager.modalMaskDuration).call(function(modalMask: eui.Rect): void {
                        //移除遮罩
                        this._popLayer.removeChild(modalMask);
                    },this,[this.modalMask]);
                }
            }
        }
        
        //定义遮罩
        get modalMask(): eui.Rect {
            if(!this._modalMask) {
                //定义遮罩
                this._modalMask = new eui.Rect();
                this._modalMask.width = StageProxy.width;
                this._modalMask.height = StageProxy.height;
                this._modalMask.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onModalMaskTap,this);
            }

            return this._modalMask;
        }
    }
}