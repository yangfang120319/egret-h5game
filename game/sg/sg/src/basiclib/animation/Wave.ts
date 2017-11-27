/**
 * Created by admin on 2014/12/9.
 */

module basic {
	export class Wave implements IAnimation {
		static round:Function = function (t:number):any {
			return {x: Math.cos(t), y: Math.sin(t)};
		};
		static cos:Function = function (t:number):any {
			return {x: Math.cos(t), y: 0};
		};
		static sin:Function = function (h:number, t:number):any {
			h = h || 1;
			return {x: 0, y: Math.sin(t) * h};
		};
		static rotate:Function = function (t:number):any {
			return {r: 360 * t / Math.PI / 2};
		};
		static shake:Function = function(angle:number, t:number):any{
			angle = angle || 10;
			return { r: Math.sin(t * 2) * angle };
		};
		static breath:Function = function(scale:number, t:number):any{
			return {sx: Math.sin(t) * scale + 1, sy: -Math.sin(t + Math.PI / 4) * scale + 1};
		};

		_tween:egret.Tween;

		target:any;
		duration:number;
		delay:number;
		loop:number;
		reverse:boolean;
		private _calPos;
		private _oldProperties:any = {};
		_count;

		constructor(target:any, duration:number, calPos:Function = null, loop:number = 0, autoPlay:boolean = true, reverse:boolean = false, delay:number = 0) {
			this.target = target;
			this._calPos = calPos ? calPos : Wave.round;
			this.duration = duration;
			this.loop = loop;
			this.reverse = reverse;
			this.delay = delay;

			this.updateRegisterPos();

			if (autoPlay) {
				this.play();
			}
		}

		updateRegisterPos():void{
			this._oldProperties.x = this.target.x;
			this._oldProperties.y = this.target.y;
			this._oldProperties.scaleX = this.target.scaleX;
			this._oldProperties.scaleY = this.target.scaleY;
			this._oldProperties.skewX = this.target.skewX;
			this._oldProperties.skewY = this.target.skewY;
			this._oldProperties.rotation = this.target.rotation;
		}

		play():void {
			if(this._tween){
				return;
			}

			this._count = 0;
			this._playStep();
		}

		_playStep():void{
			if(this.loop > 0 && this._count >= this.loop){
				this.stop();

				return;
			}
			this._count ++;

			this.t = this.reverse ? Math.PI * 2 : 0;

			this._tween = egret.Tween.get(this);
			this._tween.wait(this.delay).to({t: this.reverse ? 0 : Math.PI * 2}, this.duration).call(this._playStep, this);
		}

		private _t:number = 0;
		private get t():number {
			return this._t;
		}

		private set t(value:number) {
			if(!this.target.stage){
				return;
			}
			this._t = value;
			var pos:any = this._calPos.call(this, this._t);
			this.target.x = (pos.hasOwnProperty('x') ? pos.x : 0) + this._oldProperties.x;
			this.target.y = (pos.hasOwnProperty('y') ? pos.y : 0) + this._oldProperties.y;
			if(pos.hasOwnProperty('sx')){
				this.target.scaleX = pos.sx;
			}
			if(pos.hasOwnProperty('sy')){
				this.target.scaleY = pos.sy;
			}
			if(pos.hasOwnProperty('skewX')){
				this.target.skewX = pos.skewX;
			}
			if(pos.hasOwnProperty('skewY')){
				this.target.skewY = pos.skewY;
			}
			if(pos.hasOwnProperty('r')){
				this.target.rotation = pos.r;
			}
		}

		stop(recovery:boolean = false, animation:boolean = false, duration:number = 1000):void {
			egret.Tween.removeTweens(this);
			this._tween = null;

			if(recovery){
				egret.Tween.get(this.target).to(this._oldProperties, duration);
			}
		}

		get playing():boolean{
			return this._tween != null;
		}
	}
}