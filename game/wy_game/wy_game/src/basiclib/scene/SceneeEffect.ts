/**
 * Created by lenovo on 2014/6/26.
 */

module basic.sceneEffect {
    export interface ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function): void;
    }
    
    //普通显示界面
    export class None implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //判断隐藏上一个场景
            if(scene1) {
                scene1.visible = false;
                parent.removeChild(scene1);
            }
            
            //显示场景
            scene2.alpha = 1;
            scene2.visible = true;
            parent.addChild(scene2);
            
            //判断显示callback
            if(callback) {
                callback();
            }
        }
    }
    
    //同时隐藏上一个场景显示下一个场景
    export class Fade implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //上一个场景变透明
            egret.Tween.get(scene1).to({ alpha: 0 },500);
            
            //透明显示下一个场景
            scene2.alpha = 0;
            scene2.visible = true;
            parent.addChild(scene2);
            
            //下一个场景显示
            egret.Tween.get(scene2).to({ alpha: 1 },500).call(() => {
                //移除上一个场景
                parent.removeChild(scene1);
                
                //判断显示callback
                if(callback) {
                    callback();
                }
            });
        }
    }
    
    //影藏上一个场景---->显示下一个场景
    export class FadeBlack implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //透明显示上一场景
            scene2.alpha = 0;
            scene2.visible = true;
            parent.addChild(scene2);
            
            //判断隐藏上一场景
            if(scene1) {
                egret.Tween.get(scene1).to({ alpha: 0 },500).call(()=> {
                    //移除上一界面
                    parent.removeChild(scene1);
                    
                    //显示下一场景
                    showScene2();
                },this);
            }
            else {
                //显示下一场景
                showScene2();
            }
            
            //显示下一场景
            function showScene2(): void {
                egret.Tween.get(scene2).to({ alpha: 1 },500).call(()=> {
                    //判断显示callback
                    if(callback) {
                        callback();
                    }
                },this);
            }
        }
    }
    
    //向上移动
    export class Up implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //上一个场景变透明
            egret.Tween.get(scene1).to({ y: -basic.StageProxy.height },500);

            //显示下一个场景
            scene2.visible = true;
            parent.addChild(scene2);
            scene2.y = basic.StageProxy.height;

            //下一个场景显示
            egret.Tween.get(scene2).to({ y: 0 },500).call(() => {
                //移除上一个场景
                parent.removeChild(scene1);

                //判断显示callback
                if(callback) {
                    callback();
                }
            });
        }
    }
    
    //向下移动
    export class Down implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //上一个场景变透明
            egret.Tween.get(scene1).to({ y: basic.StageProxy.height },500);

            //显示下一个场景
            scene2.visible = true;
            parent.addChild(scene2);
            scene2.y = -basic.StageProxy.height;

            //下一个场景显示
            egret.Tween.get(scene2).to({ y: 0 },500).call(() => {
                //移除上一个场景
                parent.removeChild(scene1);

                //判断显示callback
                if(callback) {
                    callback();
                }
            });
        }
    }
    
    //向左移动
    export class Left implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //上一个场景变透明
            egret.Tween.get(scene1).to({ x: -basic.StageProxy.width },500);

            //显示下一个场景
            scene2.visible = true;
            parent.addChild(scene2);
            scene2.x = basic.StageProxy.width;

            //下一个场景显示
            egret.Tween.get(scene2).to({ x: 0 },500).call(() => {
                //移除上一个场景
                parent.removeChild(scene1);

                //判断显示callback
                if(callback) {
                    callback();
                }
            });
        }
    }
    
    //向右移动
    export class Right implements ISceneEffect {
        handover(scene1: SceneBase,scene2: SceneBase,parent: eui.Group,callback: Function = null): void {
            //上一个场景变透明
            egret.Tween.get(scene1).to({ x: basic.StageProxy.width },500);

            //显示下一个场景
            scene2.visible = true;
            parent.addChild(scene2);
            scene2.x = -basic.StageProxy.width;

            //下一个场景显示
            egret.Tween.get(scene2).to({ x: 0 },500).call(() => {
                //移除上一个场景
                parent.removeChild(scene1);

                //判断显示callback
                if(callback) {
                    callback();
                }
            });
        }
    }
}