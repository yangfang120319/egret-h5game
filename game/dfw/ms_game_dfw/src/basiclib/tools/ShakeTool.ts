/**
 * 
 * 摇一摇工具类
 * 
 */
module basic {
    export class ShakeTool extends egret.EventDispatcher {
        //定义变量
        private orientation: egret.DeviceOrientation = null; //设备方向变化
        private xAngle: number = 0;     //设备绕x角度
        private yAngle: number = 0;     //设备绕y角度
        private zAngle: number = 0;     //设备绕z角度
        private last_x: number = 0;     //上一次绕x角度
        private last_y: number = 0;     //上一次绕y角度
        private last_z: number = 0;     //上一次绕z角度
        private shakeCount: number = 0; //摇动次数
        private lastTime: number = 0;    //上一次更新时间
        private lastTime_check: number = 0;    //上一次更新时间
        private shakeAngle: number = 45; //当晃动角度大于一定角度时，算摇动一次
    
        //初始化
        public constructor() {
            super();
        }
    
        /**开始 */
        public start() {
            //重置数据
            this.last_x = 0;
            this.last_y = 0;
            this.last_z = 0;
            this.lastTime = 0;
            this.shakeCount = 0;
            this.lastTime_check = 0;

            //停止监听
            this.stop();
    
            //开始监听
            this.orientation || (this.orientation = new egret.DeviceOrientation());
            this.orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
            this.orientation.start();
        }
    
        /**停止 */
        public stop() {
            //判断停止
            if(this.orientation) {
                this.orientation.stop();
                this.orientation.removeEventListener(egret.Event.CHANGE,this.onOrientation,this);
                this.orientation = null;
            }
        }
        
        //角度改变事件
        private onOrientation(e: egret.OrientationEvent) {
            //定义当前时间
            var curTime: number = egret.getTimer();
    
            //每100ms判断一次
            if(curTime - this.lastTime > 100) {
                //数据赋值
                this.lastTime = curTime;
                this.xAngle = e.beta;   //x轴
                this.yAngle = e.gamma;  //y轴
                this.zAngle = e.alpha; //z轴
    
                //旋转超过一定角度，则算摇动一次
                if(Math.abs(this.last_x - this.xAngle) > this.shakeAngle ||
                    Math.abs(this.last_y - this.yAngle) > this.shakeAngle ||
                    Math.abs(this.last_z - this.zAngle) > this.shakeAngle) {
                    this.shakeCount++;
                }
                this.last_x = this.xAngle;
                this.last_y = this.yAngle;
                this.last_z = this.zAngle;
                
                //判断赋值
                if(this.shakeCount == 1) {
                    this.lastTime_check = egret.getTimer();
                }
            }
            
            //每300ms发送一次
            if(this.lastTime_check != 0 && curTime - this.lastTime_check > 400) {
                //派发事件(应该在shakeCount++时派发一次，写在这里只是为了方便显示测试数据...)
                this.dispatchEventWith(egret.Event.CHANGE,false,{ 
                    x: this.xAngle,
                    y: this.yAngle,
                    z: this.zAngle,
                    shakeCount: this.shakeCount 
                });
                
                //重置数据
                this.last_x = 0;
                this.last_y = 0;
                this.last_z = 0;
                this.lastTime = 0;
                this.shakeCount = 0;
                this.lastTime_check = 0;
            }
        }
    }
}
