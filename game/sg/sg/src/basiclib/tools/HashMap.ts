/**
 * Created by jq on 2016/2/6.
 */

module basic {
    export class HashMap {
        //定义变量
        private obj: any;
        private _length: number;
        
        //初始化
        constructor() {
            this.clear();
        }
        
        //判断是Key否存在
        containsKey(key: any): boolean {
            return key in this.obj;
        }
        
        //判断对象是否存在
        containsValue(value: any): boolean {
            for(var key in this.obj) {
                if(this.obj[key] == value) {
                    return true;
                }
            }
            return false;
        }
        
        //加入对象
        put(key: any,value: any): void {
            if(!this.containsKey(key)) {
                this.obj[key] = value;
                this._length++;
            }
        }
        
        //获取对象
        get(key: any): any {
            return this.containsKey(key) ? this.obj[key] : null;
        }
        
        //移除对象
        remove(key: any): any {
            if(this.containsKey(key)) {
                var value = this.obj;
                delete this.obj[key];
                this._length--;

                return value;
            }
            return null;
        }
        
        
        foreach(callback: Function,thisOjb: any): void {
            for(var key in this.obj) {
                if(!callback.call(thisOjb,key,this.obj[key])) {
                    break;
                }
            }
        }
        
        //随机获取一个对象
        randomGet(): any {
            var values = this.valueSet;
            return values[Math.floor(Math.random() * values.length)];
        }
        
        //获取所有Key
        get keySet(): any {
            var keys = [];
            for(var key in this.obj) {
                keys.push(key);
            }

            return keys;
        }
        
        //获取所有对象
        get valueSet(): any {
            var values = [];
            for(var key in this.obj) {
                values.push(this.obj[key]);
            }

            return values;
        }
        
        //获取长度
        get size(): number {
            return this._length;
        }
        
        //清除
        clear(): void {
            this._length = 0;
            this.obj = {};
        }
    }
}