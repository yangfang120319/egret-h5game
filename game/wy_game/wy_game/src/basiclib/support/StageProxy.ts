/**
 *Created by jq on 2016/1/24
 * @Stage容器
 *
 */
module basic {
    export class StageProxy {
        //定义变量
        static stage: egret.Stage;
        static root: egret.DisplayObjectContainer;
        
        //初始化
        static init(stage: egret.Stage,root: egret.DisplayObjectContainer): void {
            this.stage = stage;
            this.root = root;
        }
        
        //获取宽度
        static get width(): number {
            return this.stage.stageWidth;
        }
        
        //获取高度
        static get height(): number {
            return this.stage.stageHeight;
        }
    }
}
