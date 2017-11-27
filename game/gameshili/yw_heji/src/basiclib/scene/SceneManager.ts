/**
 * Created by jq on 2016/2/8.
 */

module basic {
    export class SceneManager {
        //封装
        private static _instance: SceneManager;
        public static get instance(): SceneManager {
            if(this._instance == undefined) {
                this._instance = new SceneManager();
            }
            return this._instance;
        }
        
        //初始化界面
        static init(root: eui.Group): void {
            SceneManager.instance.init(root);
        }
        
        //添加顶部场景
        static addTopScene(name: string): void {
            SceneManager.instance.addTopScene(name);
        }
        
        //移除顶部场景
        static removeTopScene(name: string): void {
            SceneManager.instance.removeTopScene(name);
        }
        
        //添加底部场景
        static addBottomScene(name: string,sceneDef: any): void {
            SceneManager.instance.addBottomScene(name,sceneDef);
        }
        
        //注册场景
        static register(name: string,scene: Object,resPack: string = null): void {
            SceneManager.instance.register(name,scene,resPack);
        }
        
        //显示场景
        static show(name: string,params: any = null,effectDef: any = null,callback: Function = null,back: boolean = false,setLastSceneName: string = null): void {
            SceneManager.instance.show(name,params,effectDef,callback,back,setLastSceneName);
        }
        
        //返回场景
        static back(params: any = null,effectDef: any = null,callback: Function = null): boolean {
            return SceneManager.instance.back(params,effectDef,callback);
        }
        
        //定义变量
        root: eui.Group;//容器-总
        popLayer: eui.Group;//弹出框容器
        topLayer: eui.Group;//最上层容器
        middleLayer: eui.Group;//中间层容器
        bottomLayer: eui.Group;//底层容器
        mapSceneDef: HashMap;
        mapScene: HashMap;//场景数据
        mapTopScene: HashMap;//Top场景数据
        currentSceneName: string;//显示场景名称
        lastSceneName: string;//最后显示场景名称
        currentScene: SceneBase;//显示场景
        topScene: SceneBase = null;//顶部场景
        
        //初始化
        constructor() {
            //定义变量
            this.mapScene = new HashMap();
            this.mapSceneDef = new HashMap();
            this.mapTopScene = new HashMap();
        }
        
        //初始化
        init(root: eui.Group): void {
            //数据赋值
            this.root = root;
            
            //显示容器
            this.root.addChild(this.bottomLayer = new eui.Group());
            this.root.addChild(this.middleLayer = new eui.Group());
            this.root.addChild(this.topLayer = new eui.Group());
            this.root.addChild(this.popLayer = new eui.Group());
            
            //定义容器
            this.bottomLayer.touchEnabled = false;
            this.middleLayer.touchEnabled = false;
            this.topLayer.touchEnabled = false;
            this.popLayer.touchEnabled = false;
        }
        
        //添加顶部场景
        addTopScene(name: string): void {
            //判断显示顶部场景
            if(this.mapTopScene.containsKey(name)) {
                //显示前调用
                this.mapTopScene.get(name)._beforeShow(null);
                
                //显示最顶层
                this.mapTopScene.get(name).visible = true;
                this.topLayer.setChildIndex(this.mapTopScene.get(name),this.topLayer.numChildren-1);
            } 
            else{
                //定义变量
                var scene2;
                var sceneConfig: SceneConfig = this.mapSceneDef.get(name);
                var scene2Def: any = sceneConfig.sceneDef;
                
                //显示界面
                scene2 = new scene2Def();
                this.mapTopScene.put(name,scene2);
                
                //显示前调用
                this.mapTopScene.get(name)._beforeShow(null);
                
                //显示界面
                this.topLayer.addChild(this.mapTopScene.get(name));
            }
        }
        
        //移除底部场景
        removeTopScene(name: string):void{
            //判断移除顶部场景
            if(this.mapTopScene.containsKey(name)) {
                //显示前调用
                this.mapTopScene.get(name)._beforeHide(null);
                
                //显示界面
                this.mapTopScene.get(name).visible = false;
            }
        }
        
        //添加底部场景
        addBottomScene(name: string,sceneDef: any): void {
            //定义场景
            var scene: SceneBase = new sceneDef();
            
            //显示场景
            this.bottomLayer.addChild(scene);
            
            //显示前调用
            scene._beforeShow(null);
        }
        
        //注册场景
        register(name: string,scene: Object,resPack: string = null): void {
            //容器赋值
            this.mapSceneDef.put(name,new SceneConfig(scene,resPack));
        }
        
        //显示容器
        show(name: string,params: any = null,effectDef: any = null,callback: Function = null,back: boolean = false,setLastSceneName: string = null): void {
            //判断不是同一场景
            if(this.currentSceneName != name) {
                //定义变量
                var effect;
                var scene2;
                
                //判断场景是否存在
                if(this.mapScene.containsKey(name)) {
                    //场景赋值
                    scene2 = this.mapScene.get(name);
                } 
                else {
                    //定义变量
                    var sceneConfig: SceneConfig = this.mapSceneDef.get(name);
                    var scene2Def: any = sceneConfig.sceneDef;
                    
                    //场景赋值
                    scene2 = new scene2Def();
                    this.mapScene.put(name,scene2);
                }
                
                //显示方式赋值
                if(!effect && this.currentSceneName) {
                    //判断赋值
                    if(!effectDef) {
                        effect = new sceneEffect.None();
                    } 
                    else {
                        effect = new effectDef();
                    }
                    
                    //隐藏前消除
                    this.currentScene._beforeHide(params);
                } 
                else {
                    effect = new sceneEffect.FadeBlack();
                }
                
                //定义下一界面Touch值
                scene2.touchChildren = false;
                
                //显示场景
                effect.handover(this.currentScene,scene2,this.middleLayer,function(scene1: SceneBase,scene2: SceneBase): void {
                    //判断隐藏时调用
                    if(scene1) {
                        scene1._onHide(params);
                    }
                    
                    //定义下一界面Touch值
                    scene2.touchChildren = true;
                    
                    //显示时调用
                    scene2._onShow(params);
                    
                    //显示回调函数
                    if(callback) {
                        callback();
                    }
                }.bind(this,this.currentScene,scene2));
                
                //数据赋值
                this.currentScene = scene2;
                this.currentSceneName = name;
                
                //判断是否返回
                if(back) {
                    this.lastSceneName = name;
                } 
                else{
                    this.currentScene.lastSceneName = setLastSceneName != null ? setLastSceneName : this.lastSceneName;
                    this.lastSceneName = name;
                }
                
                //显示前调用
                this.currentScene._beforeShow(params);
            }
        }
        
        //返回界面
        back(params: any = null,effectDef: any = null,callback: Function = null): boolean {
            if(this.currentScene.lastSceneName && this.currentScene.lastSceneName != '') {
                this.show(this.currentScene.lastSceneName,params,effectDef,callback,true);
                return true;
            }
            return false;
        }
    }
    
    //场景数据
    export class SceneConfig {
        //定义变量
        sceneDef: any;
        resPack: string;
        
        //初始化
        constructor(scene: any,resPack: string = null) {
            this.sceneDef = scene;
            this.resPack = resPack;
        }
    }
    
    //显示容器
    export class ShowEntity {
        //定义变量
        name: string;
        params: any = null;
        effectDef: any = null;
        callback: Function = null;
        back: boolean = null;
        
        //初始化界面
        constructor(name: string,params: any = null,effectDef: any = null,callback: Function = null,back: boolean = false) {
            this.name = name;
            this.params = params;
            this.effectDef = effectDef;
            this.callback = callback;
            this.back = back;
        }
    }
}